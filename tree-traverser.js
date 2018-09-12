"use strict";

function getTag(elem) {
  if (elem.attributes.length > 0) {
    htmlString += `
${indent.repeat(indentLevelCount)}<${elem.tagName.toLowerCase()}`;

    for (let i = 0; i < elem.attributes.length; i++) {
      /////// element.attribute returns a map, not an array, can't use arr.forEach
      /////// console.log(typeof doc.attributes[i]); // returns object, can't get value with just index number, need to use key to acess value
      htmlString += ` ${elem.attributes[i].nodeName}="${
        elem.attributes[i].nodeValue
      }"`;
    }

    htmlString += `>`;
  } else {
    htmlString += `
${indent.repeat(indentLevelCount)}<${elem.tagName.toLowerCase()}>`;
  }
}

function traverseNode(parent) {
  getTag(parent);
  if (parent.children.length > 0) {
    indentLevelCount++;
    for (let i = 0; i < parent.children.length; i++) {
      traverseNode(parent.children[i]);
    }
    if (indentLevelCount >= 1) {
      indentLevelCount--;
    }
    if (!noClosingTagsArray.includes(`${parent.tagName.toLowerCase()}`))
      htmlString += `
${indent.repeat(indentLevelCount)}</${parent.tagName.toLowerCase()}>`;
  } else {
    if (!noClosingTagsArray.includes(`${parent.tagName.toLowerCase()}`))
      htmlString += `</${parent.tagName.toLowerCase()}>`;
  }
}

// starts from here
let indentLevelCount = 0;
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
const baseHTML = document.documentElement;
window.addEventListener("DOMContentLoaded", init);
function init() {
  traverseNode(baseHTML);
  console.log(htmlString);
}
