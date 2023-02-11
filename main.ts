namespace Firework {

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

    export let crc2: CanvasRenderingContext2D;
    export let emitters: Emitter[] = [];


    let selected: number = 0;
    
    let img: any;

    interface Firework {
        [key: string]: string;

    }
    interface Collection {
        fireworkdata: Firework;
    }
    let responsedata: any[];
    let responseArray: Collection[];

    async function send(_query: string): Promise<boolean> {



        let response: Response = await fetch(_query);
        let collectionData: string = await response.text();
        console.log(collectionData);

        responsedata = <Firework[]>JSON.parse(collectionData);
        responseArray = <Firework[]>responsedata.data;
        //console.log((responseArray['0'].radius).toString());
        for (let i: number = responseArray.length - 1; i > responseArray.length - 5; i--) {

            //console.log(responseArray['' + i].radius);
            let choiceDiv: any = document.getElementsByClassName("rockets")[responseArray.length - i - 1];
            choiceDiv.setAttribute("id", "" + i);
            choiceDiv.addEventListener("click", changeChoice);
        }

        return true;
    }

    // show MingiDB's response in the textarea




    

    function changeChoice(_choiceClick: Event): void {
        selected = Number(_choiceClick.target.id);
    }

    function handleLoad(_event: Event): void {
        send("https://webuser.hs-furtwangen.de/~muelle1k/Database/?command=find&collection=Fireworks");
        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        img = document.getElementById("bg");

        if (!canvas) return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", clickFunction);
           
        window.setInterval(update, 50);

    }

    function clickFunction (_clickEvent: MouseEvent): void {
        const mouseX: number = _clickEvent.clientX;
        const mouseY: number = _clickEvent.clientY;
        createBoom(mouseX, mouseY, selected);
    }
    function update(): void {

        crc2.beginPath();
        crc2.globalAlpha = 0.3;
        crc2.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
        crc2.closePath();
        for (let i: number = 0; i < emitters.length; i++) {

            emitters[i].life();

        }



    }

    function createBoom(_mouseX: number, _mouseY: number, _selected: number): void {


        console.log(responseArray['' + _selected].radius);
        let emitter: Emitter = new Emitter(_mouseX, _mouseY, responseArray['' + _selected].color, responseArray['' + _selected].radius, responseArray['' + _selected].shape);
        emitters.push(emitter);



    }
}