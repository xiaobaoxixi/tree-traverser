"use strict";

function getData(elem) {
  if (elem.childNodes[0]) {
    textLevel = 0;
    //    console.log("<" + elem.localName + ">");
    htmlString += `
${indent.repeat(indentLevelCount)}<${elem.localName}>`;
    for (let ii = 0; ii < elem.childNodes.length; ii = ii + 2) {
      if (
        elem.childNodes[ii].nodeValue &&
        elem.childNodes[ii].nodeValue.replace(/\s+/g, "").length > 0
      ) {
        // only for those that have sub-text and sub-text is not ''
        let textPiece = elem.childNodes[ii].nodeValue
          .replace(/\s+/g, " ")
          .trim();

        if (
          elem.childNodes[ii].nodeValue[
            elem.childNodes[ii].nodeValue.length - 1
          ] === " " // the case of a new line doesn't mean a gap, need to exclude this case
        ) {
          textLevel++;
          gapCount++;
        }
        //        console.log(`${textPiece}`);
        htmlString += `${textPiece}
`;

        let textPieceData = [textPiece, textLevel, ii, gapCount];

        textPieceArray.push(textPieceData);
        // check if gap count increase
        // if (
        //   textPieceArray.length > 1 &&
        //   textPieceArray[textPieceArray.length - 1][3] >
        //     textPieceArray[textPieceArray.length - 2][3]
        // ) {
        //console.table(textPieceArray);
        // }
      }
    }
  }
}

function traverseNode(parent) {
  getData(parent);
  if (parent.childNodes.length > 1) {
    indentLevelCount++;
    for (let i = 1; i < parent.childNodes.length; i = i + 2) {
      traverseNode(parent.childNodes[i]);
    }
    if (indentLevelCount >= 1) {
      indentLevelCount--;
    }
  }
  //  console.log(`</${parent.localName}>`);
  htmlString += `${indent.repeat(indentLevelCount)}</${parent.localName}>
`;
}
let fillCount = 0;
let fromIndex = 1;
function reorder() {
  let gapIndexArray = [];
  textPieceArray.forEach(checkIfGap);

  function checkIfGap(entry, gapIndex) {
    if (
      gapIndex > 1 &&
      entry[3] > textPieceArray[gapIndex - 1][3] &&
      entry[2] < textPieceArray[gapIndex + 1][2]
    ) {
      gapIndexArray.push(gapIndex);
    }
  }
  console.table(textPieceArray);

  gapIndexArray.forEach(getEachIndex);
  function getEachIndex(a, indexI) {
    fillGap(a + fillCount, indexI);
  }
  function fillGap(g, indexI) {
    findOne: for (let i = g + 1; i < g + 30; i++) {
      // from the index of the gap and look forward
      // cheat, should not restrict to 30, rather til the end of the array
      if (
        textPieceArray[i] &&
        textPieceArray[i][1] === 0 &&
        textPieceArray[i][2] === 0 &&
        i > fromIndex
      ) {
        // the to-be-filled texts all have [0,0,*]
        textPieceArray.splice(g + 1, 0, ["", textPieceArray[i][0], "", ""]); // insert the gap text to place
        //textPieceArray[i + 1][4] = true;
        fillCount++;
        fromIndex = i + 1;
        break findOne;
      }
    }
  }
  //  console.table(textPieceArray);
  console.table(
    textPieceArray
      .filter(item => {
        if (item[4] !== true) return true;
      })
      .map(
        item =>
          (item = [
            item[0].length > 1 ? item[0] : null,
            typeof item[1] !== "number" && item[1].length > 1 ? item[1] : null
          ])
      )
  );
}

// starts from here
let indentLevelCount = 0;
let indent = "  ";
let gapCount = 0;
let textLevel = 0;
let textPieceArray = [];
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
  reorder();
}
