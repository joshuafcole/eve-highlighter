# Eve Highlighter

## Building

``` sh
npm install
npm run build
```

## using
Include the codemirror-mode-eve/eve-mode.css and the build/highlighter-bundle.js script.
Then include the following at the bottom of the page:

``` html
<script>
  window["eve-highlighter"].highlightAll();
</script>
```
`highlightAll()` will find all `<code>` elements with:
 1. no class and no parent indicating it has already been highlighted by another highlighter (eve block highlight)
 2. the class "language-eve" (eve block highlight)
 3. the class "language-eve-document" (eve markdown document highlight)
