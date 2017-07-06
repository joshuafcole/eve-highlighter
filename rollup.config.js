import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: "./build/highlighter.js",
  format: "iife",
  intro: "function require(name) { if(name === 'codemirror') return window.CodeMirror; }",
  plugins: [resolve()],
  moduleName: "eve-highlighter",
  dest: "./build/highlighter-bundle.js"
}
