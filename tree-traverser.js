"use strict";

// Version 1 just writes the name and attributes of each HTML-element. The output looks somewhat like this:
function getAllAttr(elem) {
  if (elem.attributes.length > 0) {
    for (let i = 0; i < elem.attributes.length; i++) {
      /////// element.attribute returns a map, not an array, can't use arr.forEach
      /////// console.log(typeof doc.attributes[i]); // returns object, can't get value with just [], need to use key to acess value

      console.log(
        `${elem.tagName.toLowerCase()}: ${elem.attributes[0].nodeName}="${
          elem.attributes[0].nodeValue
        }"`
      );
      //    console.log(doc.attributes);
    }
  } else {
    console.log(`${elem.tagName.toLowerCase()}`);
  }
}

function traverse(parent) {
  getAllAttr(parent);
  if (parent.children.length > 0) {
    for (let i = 0; i < parent.children.length; i++) {
      traverse(parent.children[i]);
    }
  }
}

window.addEventListener("DOMContentLoaded", init);
function init() {
  const baseHTML = document.documentElement;
  traverse(baseHTML);
}

// version 2
