import Position from "./Position";
import {Direction} from "./Direction";


export default class ActionPopup implements Position {


    constructor(
        public width: number,
        public height: number,
        public centerRadius: number,        
        public x: number = 0,
        public y: number = 0,
    ) {
    }


    get asCenter(): Position {
        return {x: this.x - this.width / 2, y: this.y - this.height / 2};
    }

    _y(x: number) {
        return x - this.x + this.y
    }

    _x(y: number) {
        return this.y - y + this.x
    }

    compareDirectionTo(pos: Position): Direction {
        if ((this.y - this.centerRadius > pos.y) && (this.x + this.centerRadius < pos.x)) {
            const x = this._x(pos.y)
            if (pos.x >= x) {
                return 'right'
            } else {
                return 'top'
            }
        }

        if ((this.y + this.centerRadius < pos.y) && (this.x + this.centerRadius < pos.x)) {
            const x = pos.y - this.y + this.x
            if (pos.x >= x) {
                return 'right'
            } else {
                return 'bottom'
            }
        }


        if ((this.y - this.centerRadius > pos.y) && (this.x - this.centerRadius > pos.x)) {
            const y = this.y - (this.x - pos.x)
            if (pos.y >= y) {
                return 'left'
            } else {
                return 'top'
            }
        }

        if ((this.y + this.centerRadius < pos.y) && (this.x - this.centerRadius > pos.x)) {
            const y = this.y + (this.x - pos.x)
            if (pos.y <= y) {
                return 'left'
            } else {
                return 'bottom'
            }
        }


        if (this.y - this.centerRadius > pos.y) {
            return 'top'
        }

        if (this.y + this.centerRadius < pos.y) {
            return 'bottom'
        }

        if (this.x - this.centerRadius > pos.x) {
            return 'left'
        }

        if (this.x + this.centerRadius < pos.x) {
            return 'right'
        }


        return 'center'

    }

    setPositionToOut() {
        this.x = -this.width * 2
        this.y = -this.height * 2
    }
}
