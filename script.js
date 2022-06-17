// erstellen von variablen für die im html verwendeten Elemente
// querySelectorAll für number und operation, weil diese in mehrerer div-tags vorkommen

const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const zwischenergebnis = document.querySelector(".zwischenergebnis");
const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".clear");
const clearLast = document.querySelector(".clear_last");

// erstellen von variablen zum speichern von Zahlen und Ergebnissen
let display1Number = "";
let display2Number = "";
let result = null;
let currentOperation = "";
// status, ob ein Punkt gesetzt werden darf oder nicht
let haveDot = false;

// bei dieser Funktion erlauben wir es auch, dass nun mit der Maus man Zahlen auswählen kann, dabei iterieren wir erneut durch numbers und je nach Wahl wird dann mit event.target die jeweilige Zahl ausgewählt.
// Zusätzlich überprüfen wir, ob wir schon ein Komma haben, wenn wir havedot false ist, dann dürfen wir ein komma setzen, und havedot wird dann in true umgewandelt
// andernfalls wird die Funktion abgebrochen und wir können keine weiteren Komma mehr setzen
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    // hier werden dann die Zahlen in einem String zusammengefasst und im Browser angezeigt
    display2Number += e.target.innerText;
    display2.innerText = display2Number;
  });
});

// hierbei gehen wird durch operation mit einer forEach schleife durch
operation.forEach((operationButton) => {
  operationButton.addEventListener("click", (e) => {
    // wenn displayNumber leer ist -> also false, dann wird die Funktion abgebrochen, weil wir ohne Zahl keine Operation durchführen dürfen
    if (!display2Number) return;
    // andernfalls wird havedot bei jeder neuen Zahl auf false gesetzt, damit man ein KOmma setzen darf
    haveDot = false;
    // unsere operation speichern wir in einer extra variabla ab
    const operationIcon = e.target.innerText;
    // hier überprüfen wir, ob wir zwei zahlen haben und eine Operation, wenn ja dann wird die Funktion mathOperation aufgerufen, damit die Rechnung erstellt werden kann
    if (display1Number && display2Number && currentOperation) {
      matheOperation();
    } else {
      // falls wir nur eine Zahl haben, dann ist das unser jetziges Ergebnis und wird dem Taschenrechner hinzugefügt
      result = parseFloat(display2Number);
    }
    // aufruf einer weiteren Hilfsfunktion
    createOp(operationIcon);
    // unser currentOperation, welcher überall benötigt wird auf die Operation gesetzt, welche wir ausgewählt haben
    currentOperation = operationIcon;
  });
});

// diese Funktion rechnet das Ergebnis aus und ruft zwei weitere Hilfsfunktionen auf
equal.addEventListener("click", () => {
  // falls keine Zahlen eingetragen sind, dann wird die Funktion abgebrochen
  if (!display1Number || !display2Number) return;

  haveDot = false;
  matheOperation();
  createOp();
  // das Ergebnis wird dann im display2 und zwischenergebnis bereich angezeigt
  display2.innerText = result;
  zwischenergebnis.innerText = "Ergebnis: " + result;
  display2Number = result;
  display1Number = "";
});

// mit createOp wird die Rechnung angezeigt bzw. welche Operationen bereits durchgeführt worden sind (Rechenweg)
function createOp(operationName = "") {
  display1Number += display2Number + " " + operationName + " ";
  display1.innerText = display1Number;
  // dadurch wird der Bereich für die neue Zahl automatisch zurückgesetzt, damit man es nicht manuell löschen muss
  display2.innerText = "";
  display2Number = "";
  zwischenergebnis.innerText = result;
}
// hier wird alles gelöscht und auf 0 zurückgesetzt
clearAll.addEventListener("click", () => {
  display1Number = "";
  display2Number = "";
  display1.innerHTML = "0";
  display2.innerHTML = "0";
  zwischenergebnis.innerHTML = "0";
  result = "";
  currentOperation = "";
});

// hierbei wird die letzte Eingabe komplett gelöscht
clearLast.addEventListener("click", () => {
  display2.innerText = "";
  display2Number = "";
});

// bei dieser Funktion werden die Operationen durchgeführt. Dabei nimmt man das Ergebnis von der Rechnung zuvor und rechnet es mit der Zahl die man selbst einträgt -> davor muss man alles parsen, damit aus den Strings Numbers werden
function matheOperation() {
  if (currentOperation === "x") {
    result = parseFloat(result) * parseFloat(display2Number);
  } else if (currentOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Number);
  } else if (currentOperation === "/") {
    result = parseFloat(result) / parseFloat(display2Number);
  } else if (currentOperation === "%") {
    result = parseFloat(result) % parseFloat(display2Number);
  } else if (currentOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Number);
  }
}

// diese Funktion ermöglicht es uns durch den eventListener = "keydown" mit unserer Tastatur auch arbeiten zu können, -> event.key
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
    //aufruf der Funktion clickButton, welcher event.key (also die Taste auf die wir geklickt haben) als Parameter hat
    clickButton(event.key);

    // das selbe wird wiederholt für die Operationen und für Equal, welcher das Ergebnis berechnen soll
  } else if (
    event.key === "+" ||
    event.key === "/" ||
    event.key === "-" ||
    event.key === "%" ||
    event.key === "x"
  ) {
    clickOperation(event.key);
  } else if (event.key === "*") {
    clickOperation("x");
  } else if (event.key === "=" || event.key == "Enter") {
    clickEqual();
  }
});

// hilfsfunktionen, damit das klicken funktioniert und der richtige Wert übergeben wird
function clickButton(key) {
  // man iteriert durch numbers (durch alle div tags im html) und je nach Tastatureingabe wird ein bestimmter Wert übergeben
  numbers.forEach((buttonNumber) => {
    if (buttonNumber.innerText == key) {
      buttonNumber.click();
      console.log(buttonNumber.innerHTML);
      console.log(buttonNumber);
    }
  });
}
// man iteriert durch operation (durch alle div tags im html) und je nach Tastatureingabe wird eine bestimmte Operation (+,-,/,%,*) übergeben
function clickOperation(key) {
  operation.forEach((buttonOperation) => {
    if (buttonOperation.innerText == key) {
      buttonOperation.click();
      console.log(buttonOperation);
    }
  });
}
// durch Enter oder "=" wird die Funktion dann aufgerufen
function clickEqual() {
  equal.click();
  console.log(equal);
}
