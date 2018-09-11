"use strict";

// Version 1 just writes the name and attributes of each HTML-element. The output looks somewhat like this:
function getAllAttr(elem) {
  if (elem.attributes.length > 0) {
    for (let i = 0; i < elem.attributes.length; i++) {
      /////// element.attribute returns a map, not an array, can't use arr.forEach
      /////// console.log(typeof doc.attributes[i]); // returns object, can't get value with just index number, need to use key to acess value
      console.log(
        `${indent.repeat(levelCount)}<${elem.tagName.toLowerCase()} ${
          elem.attributes[0].nodeName
        }="${elem.attributes[0].nodeValue}">`
      );
    }
  } else {
    console.log(`${indent.repeat(levelCount)}<${elem.tagName.toLowerCase()}>`);
  }
}

let levelCount = 0;
let indent = "  ";
function traverse(parent) {
  getAllAttr(parent);
  if (parent.children.length > 0) {
    levelCount++;
    for (let i = 0; i < parent.children.length; i++) {
      traverse(parent.children[i]);
    }
    if (levelCount >= 1) {
      levelCount--;
    }
  }
}

// starts from here
window.addEventListener("DOMContentLoaded", init);
function init() {
  const baseHTML = document.documentElement;
  traverse(baseHTML);
}

// version 2
