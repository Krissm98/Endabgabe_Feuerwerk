"use strict";
/**
 * MingiDB Test-Client
 * An example client to help get acquainted with MingiDB.
 *
 * @author Jirka Dell'Oro-Friedl, HFU, 2022
 * @see www.github.com/JirkaDellOro/MingiDB
 * @license MIT License
 */
var testMingiDB;
(function (testMingiDB) {
    window.addEventListener("load", start);
    let database = "https://webuser.hs-furtwangen.de/~muelle1k/Database/";
    console.log(database);
    // check if a MingiDB installation is referred to as the parameter for the client
    async function start(_event) {
        try {
            await send("?", null);
        }
        catch (_e) {
            let output = `Add the correct address of your database as get-parameter in the url.\n`;
            output += `https://webuser.hs-furtwangen.de/~muelle1k/Database/\n\n`;
            output += _e;
            output += `\n\nSee more information in the console.`;
            alert(output);
        }
        document.forms[0].addEventListener("click", hndButton);
    }
    // send a query together with the data if applicable
    async function send(_query, _data) {
        let query = _query + (_data ? "&data=" + JSON.stringify(_data) : "");
        document.querySelector("input#query").value = query;
        let response = await fetch(database + query);
        output(await response.json());
        return true;
    }
    // show MingiDB's response in the textarea
    function output(_response) {
        document.querySelector("textarea").value = JSON.stringify(_response, null, 2);
    }
    // react to the buttons, build the query and the data accordingly and call send
    function hndButton(_event) {
        if (_event.target instanceof HTMLAnchorElement)
            return hndAnchor(_event);
        if (!(_event.target instanceof HTMLButtonElement))
            return;
        let command = _event.target.textContent;
        let formdata = new FormData(document.forms[0]);
        let collection = formdata.get("collection");
        let id = formdata.get("id");
        let query = `?command=${command}&collection=${collection}`;
        let data = {};
        ["color", "radius", "shape"].forEach((_color) => { if (formdata.get(_color))
            data[_color] = formdata.get(_color); });
        switch (command) {
            case "delete":
                if (!id)
                    return alert("To delete a document, pass the id");
                data = {};
                query += `&id=${id}`;
                break;
            case "find":
                if (!id)
                    break;
                data = null;
                query += `&id=${id}`;
                break;
            case "update":
                if (!id)
                    return alert("To update a document, pass the id");
                query += `&id=${id}`;
                break;
        }
        send(query, data);
    }
    // for convenience, clear or randomly fill the fields of the document-fieldset when clicking on the anchors
    function hndAnchor(_event) {
        let command = _event.target.textContent;
        let fields = ["color", "radius", "shape"];
        console.log(command);
        switch (command) {
            case "Clear":
                fields.forEach((_color) => document.querySelector(`[color=${_color}]`).value = "");
                break;
            case "Fill":
                fields.forEach((_color) => {
                    let element = document.querySelector(`[color=${_color}]`);
                    switch (_color) {
                        case "color":
                            element.value = Math.random() < 0.5 ? "green" : "red";
                            break;
                        case "radius":
                            element.value = "10";
                            break;
                        case "shape":
                            element.value = Math.random() < 0.5 ? "rect" : "kreis";
                            break;
                    }
                });
                break;
        }
    }
})(testMingiDB || (testMingiDB = {}));
//# sourceMappingURL=Client.js.map