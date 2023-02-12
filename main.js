"use strict";
var Firework;
(function (Firework) {
    /*Aufgabe: Endabgabe
      Name: Liz Hengsteler
      Matrikel: 268424
      Datum: 12.02.2023
      Zusammenarbeit: Kristoffer Müller und Theo Züffle
      Quellen: Inverted Classroom, Jirka Videos + Code
      W3Schools
      Stackoverflow
      ChatGPT
      */
    window.addEventListener("load", handleLoad);
    Firework.emitters = [];
    let selected = 0;
    let img;
    let responsedata;
    let responseArray;
    async function send(_query) {
        let response = await fetch(_query);
        let collectionData = await response.text();
        //console.log(collectionData);
        responsedata = JSON.parse(collectionData);
        responseArray = responsedata.data;
        console.log(responseArray);
        //immer nur die neuesten 5 aus responseArray und nicht die selben 5
        for (let i = responseArray.length - 1; i > responseArray.length - 5; i--) {
            //console.log(responseArray['' + i].radius);
            let choiceDiv = document.getElementsByClassName("rockets")[responseArray.length - i - 1]; //"rocket array"
            choiceDiv.setAttribute("id", "" + i);
            choiceDiv.addEventListener("click", changeChoice);
            console.log(choiceDiv);
        }
        return true;
    }
    // show MingiDB's response in the textarea
    function changeChoice(_choiceClick) {
        selected = Number(_choiceClick.target.id); //wandelt id in eine number um
    }
    function handleLoad(_event) {
        send("https://webuser.hs-furtwangen.de/~muelle1k/Database/?command=find&collection=Fireworks");
        let canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        img = document.getElementById("bg");
        if (!canvas)
            return;
        Firework.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", clickFunction);
        window.setInterval(update, 50);
    }
    function clickFunction(_clickEvent) {
        const mouseX = _clickEvent.clientX;
        const mouseY = _clickEvent.clientY;
        createBoom(mouseX, mouseY, selected);
    }
    function update() {
        Firework.crc2.beginPath();
        Firework.crc2.globalAlpha = 0.3;
        Firework.crc2.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
        Firework.crc2.closePath();
        for (let i = 0; i < Firework.emitters.length; i++) {
            Firework.emitters[i].life();
        }
    }
    function createBoom(_mouseX, _mouseY, _selected) {
        console.log(responseArray['' + _selected].radius);
        let emitter = new Firework.Emitter(_mouseX, _mouseY, responseArray['' + _selected].color, responseArray['' + _selected].radius, responseArray['' + _selected].shape);
        Firework.emitters.push(emitter);
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map