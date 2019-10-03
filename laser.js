class Laser {
    constructor(x, y, s, rot, id) {
        this.id = id;
        this.rotation = rot
        this.size = s;
        this.r = this.size / 2;
        this.position = {
            x: x + Math.cos((this.rotation - 90) * (Math.PI / 180)) * ship.r,
            y: y + Math.sin((this.rotation - 90) * (Math.PI / 180)) * ship.r
        }
        this.age = 0;
        this.maxAge = 80//Math.random() * 60 + 40
        this.speed = 50;
    }
    checkVelocity() {
        this.velocity = {
            x: this.speed * 0.2 * Math.cos((this.rotation - 90) * (Math.PI / 180)),
            y: this.speed * 0.2 * Math.sin((this.rotation - 90) * (Math.PI / 180))
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    draw() {
        ctx.lineWidth = this.r / 10;
        ctx.strokeStyle = 'white';
        var laser =
            [
                0, this.r,
                -this.r / 2, this.r,
                -this.r / 2, -this.r,
                this.r / 2, -this.r,
                this.r / 2, this.r
            ]
        drawShape(laser, true, this.position.x, this.position.y, 1, (Math.PI / 180) * this.rotation);
    }
    destroy() {
        laserIDs.push(this.id);
        var id = lasers.findIndex(e => (e.id == this.id))
        lasers.splice(id, 1);
    }
    async update() {
        this.checkVelocity();
        this.draw();
        //if (offScreen(this)) warp(this);
        if (offScreen(this)) this.destroy();
        if(++this.age == this.maxAge) this.destroy();
    }
};