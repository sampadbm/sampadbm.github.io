/**
 * A single-key on/off toggle. Ignores keystrokes while typing in a form
 * field or with a modifier held, matching the convention used by the
 * align/layout/theme style switcher (blog/assets/utils.js).
 *
 * Knows nothing about polling, fetching, or scrolling — just flips a
 * boolean and fires onEnable/onDisable. Reusable for any future one-key
 * mode, not just live-reload.
 *
 * `hintElement`, if given, is toggled with the `shortcut-hint-active`
 * class (see shortcut-toggle.css) and doubles as a click target — it's
 * expected to already carry the site's `.shortcut-hint` styling.
 */

function createShortcutToggle({ key, hintElement, onEnable, onDisable }) {
    let active = false;

    function setActive(next) {
        if (next === active) return;
        active = next;
        if (hintElement) hintElement.classList.toggle('shortcut-hint-active', active);
        if (active) {
            onEnable?.();
        } else {
            onDisable?.();
        }
    }

    document.addEventListener('keyup', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key.toLowerCase() !== key) return;
        setActive(!active);
    });

    if (hintElement) {
        hintElement.addEventListener('click', () => setActive(!active));
    }

    return {
        get active() {
            return active;
        },
        disable: () => setActive(false),
    };
}

window.createShortcutToggle = createShortcutToggle;
