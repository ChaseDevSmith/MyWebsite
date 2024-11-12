export class Planet {
    constructor(planet, scale, position) {
        this._planet     = planet
        this.scale      = scale;
        this.position   = position;


    }

    get planet() {
        return this._planet;
    }

    get scale() {
        return this.scale;
    }

    get position() {
        return this.position;
    }

    set position(newPosition) {
      this.planet.scene.position.set(newPosition.x, newPosition.y, newPosition.z)
    }

    set scale(newScale) {
        this.planet.scene.scale.set(newScale.x, newScale.y, newScale.z)
    }


}

