# Blog Plot Plugin Implementation Plan

## Overview
Add a `vegalite` fenced code block plugin to the blog's frontend markdown pipeline using marked.js. Blocks render as interactive Vega-Lite charts. Other markdown renderers that don't support this extension will display the content as a plain code block.

## Stack
- **marked** — markdown parser (already in use)
- **js-yaml** — parse block content (handles both JSON and YAML transparently)
- **vega**, **vega-lite**, **vega-embed** — chart rendering

## Conditional Loading

The vega stack (~1.4MB) is **not** included in the HTML head. Instead, before markdown parsing, the raw content is checked for `` ```vegalite `` blocks. If found, the scripts are loaded dynamically via `loadScript()` and the marked extension is registered. Posts without vegalite blocks pay zero cost.

```js
// In post.js, before marked.parse():
if (content.includes('```vegalite')) {
    await enableVegalite();
}
```

`enableVegalite()` loads the CDN scripts sequentially (vega → vega-lite → vega-embed) then registers the marked extension.

## marked Plugin

Register a custom marked extension that intercepts `vegalite` fenced code blocks. A `MutationObserver` is used to defer `vegaEmbed` until the container div is present in the DOM, which is correct regardless of device speed.
```js
marked.use({
  extensions: [{
    name: 'vegalite',
    level: 'block',
    start(src) { return src.indexOf('```vegalite') },
    tokenizer(src) {
      const match = src.match(/^```vegalite\n([\s\S]*?)```/)
      if (!match) return
      return { type: 'vegalite', raw: match[0], text: match[1] }
    },
    renderer(token) {
      const id = `vegalite-${Math.random().toString(36).slice(2)}`

      const observer = new MutationObserver(() => {
        const el = document.getElementById(id)
        if (el) {
          observer.disconnect()
          vegaEmbed(el, jsyaml.load(token.text))
        }
      })

      observer.observe(document.body, { childList: true, subtree: true })
      return `<div id="${id}"></div>`
    }
  }]
})
```

## Block Syntax

Blocks are written as standard fenced code blocks with the `vegalite` language tag. Content can be either JSON or YAML — js-yaml handles both since JSON is a valid subset of YAML.

YAML example:

~~~markdown
```vegalite
mark: line
data:
  sequence:
    start: -10
    stop: 10
    step: 0.1
    as: x
transform:
  - calculate: "sin(datum.x)"
    as: y
encoding:
  x:
    field: x
    type: quantitative
  y:
    field: y
    type: quantitative
```
~~~

JSON example:

~~~markdown
```vegalite
{
  "mark": "line",
  "data": {
    "sequence": {"start": -10, "stop": 10, "step": 0.1, "as": "x"}
  },
  "transform": [
    {"calculate": "sin(datum.x)", "as": "y"}
  ],
  "encoding": {
    "x": {"field": "x", "type": "quantitative"},
    "y": {"field": "y", "type": "quantitative"}
  }
}
```
~~~

## Notes
- Each block gets a unique random id to support multiple plots per page
- The plugin should be registered before any markdown is processed
- js-yaml's `load` is used (not `loadAll`) since each block is a single spec
- No custom DSL, no expression evaluator — Vega-Lite's own grammar handles ranges, transforms, and multi-series via the `sequence` data source and `calculate` transform
- `MutationObserver` watches `document.body` with `subtree: true` to catch the div regardless of where in the DOM the rendered markdown is inserted
