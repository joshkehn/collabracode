
var OPERATION_NONE = 0;
var OPERATION_ADD = 1;
var OPERATION_SUBTRACT = 2;
var OPERATION_MULTIPLY = 3;
var OPERATION_DIVIDE = 4;

var currentValue = 0;
var currentOperation = OPERATION_NONE;
var memoryValue = 0;
var clearOnNextEntry = true;

function getInnerText(elem) {
  if(typeof elem.innerText == "undefined") {
    return elem.textContent;
  }
  return elem.innerText;
}

function setInnerText(elem, value) {
  if(typeof elem.innerText == "undefined") {
    elem.textContent = value;
  } else {
    elem.innerText = value;
  }
}

function addEvent(obj, evType, fn) {
  // taken from http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
  if (obj.addEventListener) {
    obj.addEventListener(evType, fn, false); 
    return true; 
  } else if (obj.attachEvent) {
    var r = obj.attachEvent("on"+evType, fn); 
    return r; 
  } else {
    return false; 
  }
}

function getDisplayElem() {
  return document.getElementById("numeric-display");
}

function setDisplayAsText(value) {
  setInnerText(getDisplayElem(), value);
}

function setDisplayAsFloat(value) {
  setInnerText(getDisplayElem(), new String(value));
}

function getDisplayAsText() {
  return getInnerText(getDisplayElem());
}

function getDisplayAsFloat() {
  return parseFloat(getDisplayAsText());
}


var calculatorFunctions = {
  "MC" : memoryClear,
  "M+" : memoryAdd,
  "M-" : memorySubtract,
  "MR" : memoryRecall,
  "C" : clear,
  "+": add,
  "-" : subtract,
  "*" : multiply,
  "/" : divide,
  "+/-" : negate,
  "0" : numberPressed,
  "1" : numberPressed,
  "2" : numberPressed,
  "3" : numberPressed,
  "4" : numberPressed,
  "5" : numberPressed,
  "6" : numberPressed,
  "7" : numberPressed,
  "8" : numberPressed,
  "9" : numberPressed,
  "0" : numberPressed,
  "." : decimalPointPressed,
  "=" : equalsPressed
}

function handleCalculatorButtonPressed(evt) {
  var elem = evt.target;
  var text = getInnerText(elem);
  var f = calculatorFunctions[text];
  if(!f) {
    alert("Unexpected Button pressed for text " + text);
  } else {
    f(text);
  }
  return false;
}

function attachButtonEvents() {
  var elems = document.getElementsByClassName("button");
  for (var i=0; i<elems.length; i++) {
    var elem = elems[i];
    if(getInnerText(elem)) {
      addEvent(elem, "click", handleCalculatorButtonPressed)
    }
  }
}

addEvent(window, "load", attachButtonEvents);

