"use strict";

function getAllAttr(elem) {
  if (elem.attributes.length > 0) {
    for (let i = 0; i < elem.attributes.length; i++) {
      /////// element.attribute returns a map, not an array, can't use arr.forEach
      /////// console.log(typeof doc.attributes[i]); // returns object, can't get value with just index number, need to use key to acess value
      htmlString += `
${indent.repeat(levelCount)}<${elem.tagName.toLowerCase()} ${
        elem.attributes[0].nodeName
      }="${elem.attributes[0].nodeValue}">`;
    }
  } else {
    htmlString += `
${indent.repeat(levelCount)}<${elem.tagName.toLowerCase()}>`;
  }
}

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
    if (!noClosingTagsArray.includes(`${parent.tagName.toLowerCase()}`))
      htmlString += `
${indent.repeat(levelCount)}</${parent.tagName.toLowerCase()}>`;
  } else {
    if (!noClosingTagsArray.includes(`${parent.tagName.toLowerCase()}`))
      htmlString += `</${parent.tagName.toLowerCase()}>`;
  }
}

// starts from here
let levelCount = 0;
let indent = "  ";
let htmlString = "";
let noClosingTagsArray = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
window.addEventListener("DOMContentLoaded", init);
function init() {
  const baseHTML = document.documentElement;
  traverse(baseHTML);
  console.log(htmlString);
}
