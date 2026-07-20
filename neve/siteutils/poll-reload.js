/**
 * Polls a URL for changes and invokes a callback when the fetched content
 * differs from the last-seen version. Knows nothing about the DOM or
 * scrolling — just "did the text change".
 *
 * - If `initialText` is given (the content already on screen), start()
 *   immediately checks the file against it and fires onChange right away
 *   if it already differs — catching up on edits made before enabling, or
 *   made while previously disabled. Without it, start() just seeds a
 *   silent baseline, since there'd be nothing meaningful to compare
 *   against and every first tick would look like a "change".
 * - Tolerates transient fetch failures (editors that write via
 *   temp-file-then-rename can produce a momentary empty read or 404) by
 *   treating them as "no change" rather than propagating.
 * - Skips a tick if the previous one is still in flight, so a slow
 *   request can't overlap with the next interval.
 * - Discards results from fetches that resolve after stop() was called.
 */

function createPoller({ fetchText, intervalMs = 1000, onChange, initialText }) {
    const hasInitialText = initialText !== undefined;
    let timer = null;
    let generation = 0;
    let lastText = hasInitialText ? initialText : null;
    let inFlight = false;

    async function tick(myGeneration) {
        if (inFlight) return;
        inFlight = true;
        try {
            const text = await fetchText();
            if (myGeneration !== generation) return; // stopped/restarted mid-fetch
            if (text !== null && text !== undefined && text !== lastText) {
                lastText = text;
                onChange(text);
            }
        } catch (err) {
            // transient read failure — skip this tick, try again next one
        } finally {
            inFlight = false;
        }
    }

    return {
        async start() {
            if (timer) return;
            generation++;
            const myGeneration = generation;
            if (hasInitialText) {
                // Real check: fires onChange right away if the file
                // already differs from what's on screen.
                await tick(myGeneration);
            } else {
                // No known baseline — seed silently instead of firing a
                // spurious change on the very first check.
                try {
                    lastText = await fetchText();
                } catch (err) {
                    lastText = null;
                }
            }
            if (myGeneration !== generation) return; // stop() called during seed
            timer = setInterval(() => tick(myGeneration), intervalMs);
        },
        stop() {
            generation++;
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        },
        get active() {
            return timer !== null;
        },
    };
}

window.createPoller = createPoller;
