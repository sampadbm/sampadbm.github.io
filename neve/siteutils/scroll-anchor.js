/**
 * Scroll position preservation across in-place DOM re-renders.
 *
 * captureScrollAnchor finds the element nearest the top of the viewport
 * (within `selector`) and records its id and offset. restoreScrollAnchor
 * later finds that same id and scrolls it back to the same offset, so a
 * re-render doesn't jump the page even if content changed elsewhere in
 * the document.
 *
 * Knows nothing about fetch/polling/markdown — reusable for any in-place
 * re-render (blog live-reload, digest filter re-render, etc).
 */

function captureScrollAnchor(selector) {
    let anchor = null;
    for (const el of document.querySelectorAll(selector)) {
        if (!el.id) continue;
        anchor = el;
        if (el.getBoundingClientRect().top >= 0) break;
    }
    if (anchor) {
        return { id: anchor.id, offset: anchor.getBoundingClientRect().top };
    }
    return { scrollY: window.scrollY };
}

/**
 * Restores the scroll position for `anchor`. Returns a `reapply` function —
 * call it again after any async content (images, embedded charts) finishes
 * changing the layout, since that can shift the anchor after the initial
 * restore.
 */
function restoreScrollAnchor(anchor) {
    const apply = () => {
        if (anchor.id) {
            const el = document.getElementById(anchor.id);
            if (!el) return;
            const delta = el.getBoundingClientRect().top - anchor.offset;
            if (delta) window.scrollBy(0, delta);
        } else {
            window.scrollTo(0, anchor.scrollY);
        }
    };

    // Wait for layout from the DOM swap to flush before measuring.
    requestAnimationFrame(() => requestAnimationFrame(apply));

    return apply;
}

/**
 * Convenience helper: re-invokes `reapply` whenever an image inside
 * `container` that wasn't already loaded finishes loading (successfully
 * or not), since images can resize after the initial restore.
 */
function onContentSettle(container, reapply) {
    container.querySelectorAll('img').forEach(img => {
        if (img.complete) return;
        img.addEventListener('load', reapply, { once: true });
        img.addEventListener('error', reapply, { once: true });
    });
}

window.captureScrollAnchor = captureScrollAnchor;
window.restoreScrollAnchor = restoreScrollAnchor;
window.onContentSettle = onContentSettle;
