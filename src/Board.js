import React from "react";
import Square from "./Square.js";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    render() {

        let startingFrom = this.props.start;
        if (!startingFrom) {
            startingFrom = 1;
        }
        let limit = this.props.limit;
        if (!limit) {
            limit = 1000;
        }

        let highestAnchor = 1;
        let j = 1;
        let corners = [1];
        while (highestAnchor < startingFrom + limit) {
            j += 2;
            let jSq = j * j;
            corners.push(jSq);
            highestAnchor = jSq;
        }

        let boardWidth = this.state.width;
        let boardHeight = this.state.height;

        const integers = Array.from(new Array(limit), (x,i) => i + startingFrom);
        const squares = integers.map(function(integer){
            return <Square value={integer} boardWidth={boardWidth} boardHeight={boardHeight} corners={corners} startingFrom={startingFrom} />;
        });

        return (
            <div>
                {squares}
            </div>
        );
    }
}

export default Board;