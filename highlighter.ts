import "codemirror/addon/runmode/runmode-standalone";
import "codemirror/addon/mode/simple";
import "codemirror/addon/mode/overlay";
import "codemirror/addon/mode/multiplex";
import "codemirror/mode/xml/xml";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/gfm/gfm";
import "codemirror-mode-eve";
//import "../eve-mode.js";


let documentMode = {name: "gfm", fencedCodeBlocks: true, taskLists: true};
let blockMode = "eve";
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
  return (token, type) => {
    var klass = typeToClass(type);
    if(!prev || prev.className !== klass) {
      prev = document.createElement("span");
      prev.className = klass;
      container.appendChild(prev);
      console.log("MOVING TO CLASS", klass);
    }
    prev.textContent += token;
  }
}

export function highlight(container:HTMLElement, mode:any) {
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

export function highlightBlock(container:HTMLElement) {
  return highlight(container, blockMode);
}

export function highlightDocument(container:HTMLElement) {
  return highlight(container, documentMode);
}

export function highlightAll(containers = document.querySelectorAll("code")) {
  for(let container of nodeListToArray(containers)) {
    let parent = container.parentElement;
    if(parent && parent.classList.contains("highlight") && parent.parentElement.className.indexOf("language-") !== -1) continue;

    if(container.classList.contains("language-eve") || !container.className) {
      highlightBlock(container);
    } else if(container.classList.contains("language-eve-document")) {
      highlightDocument(container);
    }
  }
}
