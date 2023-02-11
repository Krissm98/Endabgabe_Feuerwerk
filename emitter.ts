namespace Firework {
    export class Emitter {
        mouseX: number;
        mouseY: number;
        lifeParticleSize: number = Math.random() * 2 + 7;
        color: string;
        radius: number;
        shape: string;
        turbulenceX: number[] = [];
        turbulenceY: number[] = [];
        forceX: number[] = [];
        forceY: number[] = [];
        random: number = 5;
        radius2: number;
        particleMax: number = 40;
        constructor(_mouseX: number, _mouseY: number, _color: string, _radius: number, _shape: string) {
            this.mouseX = _mouseX;
            this.mouseY = _mouseY;
            this.radius = _radius;
            this.color = _color;
            this.shape = _shape;
            this.randomEffekt();

        }
        public life(): void {
            if (this.lifeParticleSize > 0) {
                this.radius2 = this.radius;


                this.radius2 *= this.lifeParticleSize;
                this.lifeParticleSize -= 0.3;
                this.draw();
                this.forceEffekt();

            }
        }
        public randomEffekt(): void {
            for (let i: number = 0; i < this.particleMax; i++) {
                this.forceX.push(this.lifeParticleSize / 6);
                this.forceY.push(this.lifeParticleSize / 6);
                this.forceX[i] += (Math.random()) * this.random * (this.lifeParticleSize / 6);
                this.forceY[i] += (Math.random()) * this.random * (this.lifeParticleSize / 6);
                this.turbulenceX.push(this.forceX[i]);
                this.turbulenceY.push(this.forceY[i]);
            }

        }
        public forceEffekt(): void {

            for (let i: number = 0; i < this.particleMax; i++) {
                this.turbulenceX[i] += this.forceX[i];
                this.turbulenceY[i] += this.forceY[i];
            }

        }

        public drawStar(x: number, y: number, radius: number): void {
            crc2.beginPath();
            for (let i: number = 0; i < 5; i++) {
                const xCoordinate: number = x + radius * Math.cos(((18 + i * 72) / 180) * Math.PI);
                const yCoordinate: number = y + radius * Math.sin(((18 + i * 72) / 180) * Math.PI);
                crc2.lineTo(xCoordinate, yCoordinate);
            }
            crc2.closePath();
            crc2.fill();
        }

        public draw(): void {
            for (let i: number = 0; i < this.particleMax; i += 4) {
                if (this.shape == "circle") {
                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.arc(this.mouseX + this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2, 0, Math.PI * 2);
                    crc2.fill();
                    crc2.closePath();

                    //console.log(this.turbulenceX);


                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.arc(this.mouseX - this.turbulenceX[i + 1], this.mouseY + this.turbulenceY[1 + i], this.radius2, 0, Math.PI * 2);
                    crc2.fill();
                    crc2.closePath();

                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.arc(this.mouseX + this.turbulenceX[i + 2], this.mouseY - this.turbulenceY[2 + i], this.radius2, 0, Math.PI * 2);
                    crc2.fill();
                    crc2.closePath();

                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.arc(this.mouseX - this.turbulenceX[i + 3], this.mouseY - this.turbulenceY[3 + i], this.radius2, 0, Math.PI * 2);
                    crc2.fill();
                    crc2.closePath();

                }
                if (this.shape == "rect") {
                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    console.log(this.color);
                    crc2.fillRect(this.mouseX + this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2, this.radius2);

                    crc2.closePath();
                    crc2.fillStyle = "white";

                    crc2.beginPath;
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.mouseX - this.turbulenceX[i + 1], this.mouseY + this.turbulenceY[1 + i], this.radius2, this.radius2);

                    crc2.closePath();

                    crc2.beginPath;
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.mouseX + this.turbulenceX[i + 2], this.mouseY - this.turbulenceY[2 + i], this.radius2, this.radius2);
                    crc2.fill();
                    crc2.closePath();

                    crc2.beginPath;
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.mouseX - this.turbulenceX[i + 3], this.mouseY - this.turbulenceY[3 + i], this.radius2, this.radius2);
                    crc2.fill();
                    crc2.closePath();

                }
                if (this.shape == "star") {

                    crc2.fillStyle = this.color;
                    this.drawStar(this.mouseX + this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2);
                    this.drawStar(this.mouseX - this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2);
                    this.drawStar(this.mouseX + this.turbulenceX[i + 0], this.mouseY - this.turbulenceY[0 + i], this.radius2);
                    this.drawStar(this.mouseX - this.turbulenceX[i + 0], this.mouseY - this.turbulenceY[0 + i], this.radius2);
                }
            }

        }
    }
}