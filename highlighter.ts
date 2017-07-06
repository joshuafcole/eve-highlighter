import "codemirror/addon/runmode/runmode-standalone.js";
import "codemirror/addon/mode/simple.js";
import "codemirror/addon/mode/overlay.js";
import "codemirror/addon/mode/multiplex.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/gfm/gfm.js";
import "codemirror-mode-eve/src/eve-mode";
//import "../eve-mode.js";


let mode = {name: "gfm", fencedCodeBlocks: true, taskLists: true};
let CodeMirror = (window as any).CodeMirror;
CodeMirror.defineMIME("", {name: "eve"});
CodeMirror.defineMIME("text/html", {name: "htmlmixed"});

function nodeListToArray<T extends Node>(list:NodeListOf<T>):T[] {
  return [].slice.call(list);
}

function typeToClass(type:string) {
  if(!type) return "";
  return "cm-" + type.split(" ").join(" cm-");
}

function injectHighlighted(container:HTMLElement) {
  let prev;
  return function(token, type) {
    var klass = typeToClass(type);
    if(!prev || prev.className !== klass) {
      prev = document.createElement("span");
      prev.className = klass;
      container.appendChild(prev);
    }
    prev.textContent += token;

  }
}

export function highlight(container:HTMLElement) {
  console.log("Container", container);
  if(container) {
    container.classList.add("CodeMirror");
    container.classList.add("cm-s-default");
    console.log("  - content:", container.textContent);
    var content = container.textContent;
    container.innerHTML = "";
    CodeMirror.runMode(content, mode, injectHighlighted(container));
  }
}

export function highlightAll(containers = document.querySelectorAll("code")) {
  for(let container of nodeListToArray(containers)) {
    if(container.classList.contains("language-eve") ||
       container.classList.contains("language-eve-disabled") ||
       container.className.indexOf("language-") === -1) {
      highlight(container);
    }
  }
}
