const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const zwischenergebnis = document.querySelector(".zwischenergebnis");
const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".clear");
const clearLast = document.querySelector(".clear_last");

let display1Number = "";
let display2Number = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    display2Number += e.target.innerText;
    display2.innerText = display2Number;
  });
});

clearAll.addEventListener("click", () => {
  display1Number = "";
  display2Number = "";
  display1.innerHTML = "";
  display2.innerHTML = "";
  zwischenergebnis.innerHTML = "0";
  result = null;
  lastOperation = "";
});

clearLast.addEventListener("click", () => {
  display2.innerText = "";
  display2Number = "";
});

function matheOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(display2Number);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Number);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display2Number);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(display2Number);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Number);
  }
}

window.addEventListener("keydown", (event) => {
  if (
    event.key === "0" ||
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "."
  ) {
    clickButton(event.key);
  } else if (
    event.key === "+" ||
    event.key === "/" ||
    event.key === "-" ||
    event.key === "x"
  ) {
    clickOperation(event.key);
  } else if (event.key === "*") {
  }
});

function clickButton(key) {
  numbers.forEach((buttonNumber) => {
    if (buttonNumber.innerHTML == key) {
      buttonNumber.click();
      // console.log(buttonNumber.innerHTML)
      // console.log(buttonNumber)
    }
  });
}

function clickOperation(key) {
  operation.forEach((buttonOperation) => {
    if (buttonOperation.innerText == key) {
      buttonOperation.click();
      // console.log(buttonOperation)
    }
  });
}

function clickEqual() {
  equal.click();
  //  console.log(equal)
}
