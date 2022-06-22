

class Point {

    constructor(x,y,z) {
        super(x,y,z);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
    
    getZ() {
        return this.z;
    }

    setX(newX) {
        this.x = newX;
    }
    
    setY(newY) {
        this.y = newY;
    }

    setZ(newZ) {
        this.z = newZ;
    }
    
    
}

export default Point;