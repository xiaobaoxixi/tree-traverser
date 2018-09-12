"use strict";

function getTag(elem) {
  //  console.log(elem);
  if (elem.childNodes[0]) {
    for (let ii = 0; ii < elem.childNodes.length; ii = ii + 2) {
      if (elem.childNodes[ii].nodeValue.replace(/\s+/g, "").length > 0) {
        let textPiece = elem.childNodes[ii].nodeValue
          .replace(/\s+/g, " ")
          .trim();
        console.log(`${textPiece} (text index: ${ii})`);
      }
    }
  }
  //   if (elem.attributes.length > 0) {
  //     htmlString += `
  // ${indent.repeat(levelCount)}<${elem.tagName.toLowerCase()}`;

  //     for (let i = 0; i < elem.attributes.length; i++) {
  //       /////// element.attribute returns a map, not an array, can't use arr.forEach
  //       /////// console.log(typeof doc.attributes[i]); // returns object, can't get value with just index number, need to use key to acess value
  //       htmlString += ` ${elem.attributes[i].nodeName}="${
  //         elem.attributes[i].nodeValue
  //       }"`;
  //     }

  //     htmlString += `>`;
  //   } else {
  //     htmlString += `
  // ${indent.repeat(levelCount)}<${elem.tagName.toLowerCase()}>`;
  //   }
}

function traverseNode(parent) {
  getTag(parent);
  if (parent.childNodes.length > 1) {
    levelCount++;
    for (let i = 1; i < parent.childNodes.length; i = i + 2) {
      traverseNode(parent.childNodes[i]);
    }
    //     if (levelCount >= 1) {
    //       levelCount--;
    //     }
    //     if (!noClosingTagsArray.includes(`${parent.tagName.toLowerCase()}`))
    //       htmlString += `
    // ${indent.repeat(levelCount)}</${parent.tagName.toLowerCase()}>`;
    //   } else {
    //     if (!noClosingTagsArray.includes(`${parent.tagName.toLowerCase()}`))
    //       htmlString += `</${parent.tagName.toLowerCase()}>`;
    //   }
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
const baseHTML = document.documentElement.childNodes[2];

window.addEventListener("DOMContentLoaded", init);
function init() {
  traverseNode(baseHTML);
  console.log(htmlString);
}
