import React from "react";
import classNames from "classnames";

const isPrime = num => {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num !== 1 && num !== 0;
};

class Square extends React.Component {

    constructor(props) {
        super(props);

        let squareWidth = 21;
        let baseLeft = this.props.boardWidth / 2;
        let baseTop = this.props.boardHeight / 2;

        let gridCoordinates = this.calculateGridCoordinates();

        this.state = {
            left: baseLeft + (gridCoordinates[0] * squareWidth),
            top: baseTop - (gridCoordinates[1] * squareWidth)
        }
    }

    calculateGridCoordinates() {
        let stepsBeforeDirectionChange;
        let anchor = 0;
        let anchorIndex = 0;
        let spiralPosition = this.props.value - this.props.startingFrom + 1;

        for (let i = 0; anchor === 0; i++) {
            if (spiralPosition <= this.props.corners[i]) {
                anchor = this.props.corners[i];
                anchorIndex = i;
            }
        }

        if (anchor === 1) {
            stepsBeforeDirectionChange = 0;
        } else {
            stepsBeforeDirectionChange = (anchor - this.props.corners[anchorIndex-1]) / 4;
        }

        let startEast = 0;
        let startNorth = 0;

        let anchorSquareRoot = Math.sqrt(anchor);
        let diagonalMovement = (anchorSquareRoot - 1) / 2;

        startEast += diagonalMovement;
        startNorth -= diagonalMovement;

        let stepsMoved = spiralPosition - this.props.corners[anchorIndex-1];

        if (stepsMoved < stepsBeforeDirectionChange) {
            startNorth += stepsMoved;
        } else if (stepsMoved < stepsBeforeDirectionChange * 2) {
            startNorth += stepsBeforeDirectionChange;
            startEast -= stepsMoved - stepsBeforeDirectionChange;
        } else if (stepsMoved < stepsBeforeDirectionChange * 3) {
            startNorth += stepsBeforeDirectionChange;
            startEast -= stepsBeforeDirectionChange;
            startNorth -= stepsMoved - stepsBeforeDirectionChange*2;
        } else if (stepsMoved < stepsBeforeDirectionChange * 4) {
            startEast -= stepsBeforeDirectionChange;
            startEast += stepsMoved - stepsBeforeDirectionChange*3;
        }

        return [startEast, startNorth];
    }

    render() {

        let btnClass = classNames({
            'square': true,
            'negative': this.props.value < 0,
            'prime': isPrime(this.props.value),
        });

        return (
            <div className={btnClass} style={{ position: 'absolute', left: this.state.left, top: this.state.top }}>
                {this.props.value}
            </div>
        );
    }
}

export default Square;