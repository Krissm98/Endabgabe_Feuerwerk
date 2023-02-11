"use strict";
var Firework;
(function (Firework) {
    class Emitter {
        mouseX;
        mouseY;
        lifeParticleSize = Math.random() * 2 + 7;
        color;
        radius;
        shape;
        turbulenceX = [];
        turbulenceY = [];
        forceX = [];
        forceY = [];
        random = 5;
        radius2;
        particleMax = 40;
        constructor(_mouseX, _mouseY, _color, _radius, _shape) {
            this.mouseX = _mouseX;
            this.mouseY = _mouseY;
            this.radius = _radius;
            this.color = _color;
            this.shape = _shape;
            this.randomEffekt();
        }
        life() {
            if (this.lifeParticleSize > 0) {
                this.radius2 = this.radius;
                this.radius2 *= this.lifeParticleSize;
                this.lifeParticleSize -= 0.3;
                this.draw();
                this.forceEffekt();
            }
        }
        randomEffekt() {
            for (let i = 0; i < this.particleMax; i++) {
                this.forceX.push(this.lifeParticleSize / 6);
                this.forceY.push(this.lifeParticleSize / 6);
                this.forceX[i] += (Math.random()) * this.random * (this.lifeParticleSize / 6);
                this.forceY[i] += (Math.random()) * this.random * (this.lifeParticleSize / 6);
                this.turbulenceX.push(this.forceX[i]);
                this.turbulenceY.push(this.forceY[i]);
            }
        }
        forceEffekt() {
            for (let i = 0; i < this.particleMax; i++) {
                this.turbulenceX[i] += this.forceX[i];
                this.turbulenceY[i] += this.forceY[i];
            }
        }
        drawStar(x, y, radius) {
            Firework.crc2.beginPath();
            for (let i = 0; i < 5; i++) {
                const xCoordinate = x + radius * Math.cos(((18 + i * 72) / 180) * Math.PI);
                const yCoordinate = y + radius * Math.sin(((18 + i * 72) / 180) * Math.PI);
                Firework.crc2.lineTo(xCoordinate, yCoordinate);
            }
            Firework.crc2.closePath();
            Firework.crc2.fill();
        }
        draw() {
            for (let i = 0; i < this.particleMax; i += 4) {
                if (this.shape == "circle") {
                    Firework.crc2.beginPath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.arc(this.mouseX + this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2, 0, Math.PI * 2);
                    Firework.crc2.fill();
                    Firework.crc2.closePath();
                    //console.log(this.turbulenceX);
                    Firework.crc2.beginPath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.arc(this.mouseX - this.turbulenceX[i + 1], this.mouseY + this.turbulenceY[1 + i], this.radius2, 0, Math.PI * 2);
                    Firework.crc2.fill();
                    Firework.crc2.closePath();
                    Firework.crc2.beginPath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.arc(this.mouseX + this.turbulenceX[i + 2], this.mouseY - this.turbulenceY[2 + i], this.radius2, 0, Math.PI * 2);
                    Firework.crc2.fill();
                    Firework.crc2.closePath();
                    Firework.crc2.beginPath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.arc(this.mouseX - this.turbulenceX[i + 3], this.mouseY - this.turbulenceY[3 + i], this.radius2, 0, Math.PI * 2);
                    Firework.crc2.fill();
                    Firework.crc2.closePath();
                }
                if (this.shape == "rect") {
                    Firework.crc2.beginPath();
                    Firework.crc2.fillStyle = this.color;
                    console.log(this.color);
                    Firework.crc2.fillRect(this.mouseX + this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2, this.radius2);
                    Firework.crc2.closePath();
                    Firework.crc2.fillStyle = "white";
                    Firework.crc2.beginPath;
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.fillRect(this.mouseX - this.turbulenceX[i + 1], this.mouseY + this.turbulenceY[1 + i], this.radius2, this.radius2);
                    Firework.crc2.closePath();
                    Firework.crc2.beginPath;
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.fillRect(this.mouseX + this.turbulenceX[i + 2], this.mouseY - this.turbulenceY[2 + i], this.radius2, this.radius2);
                    Firework.crc2.fill();
                    Firework.crc2.closePath();
                    Firework.crc2.beginPath;
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.fillRect(this.mouseX - this.turbulenceX[i + 3], this.mouseY - this.turbulenceY[3 + i], this.radius2, this.radius2);
                    Firework.crc2.fill();
                    Firework.crc2.closePath();
                }
                if (this.shape == "star") {
                    Firework.crc2.fillStyle = this.color;
                    this.drawStar(this.mouseX + this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2);
                    this.drawStar(this.mouseX - this.turbulenceX[i + 0], this.mouseY + this.turbulenceY[0 + i], this.radius2);
                    this.drawStar(this.mouseX + this.turbulenceX[i + 0], this.mouseY - this.turbulenceY[0 + i], this.radius2);
                    this.drawStar(this.mouseX - this.turbulenceX[i + 0], this.mouseY - this.turbulenceY[0 + i], this.radius2);
                }
            }
        }
    }
    Firework.Emitter = Emitter;
})(Firework || (Firework = {}));
//# sourceMappingURL=emitter.js.map