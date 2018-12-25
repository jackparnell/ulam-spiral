import React, { Component } from 'react';
import Board from './Board.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startValue: 1,
      limitValue: 1000
    };
  }

  render() {
    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">Ulum Spiral Generator</span>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <input id="start" className="form-control mr-sm-2" type="number" placeholder="Start, e.g. 41" min="1"
                     max="99999" aria-label="Start" onChange={evt => this.updateStartValue(evt)}/>
              <input id="limit" className="form-control mr-sm-2" type="number" placeholder="Limit, e.g. 1000" min="1"
                     max="9999" aria-label="Limit" onChange={evt => this.updateLimitValue(evt)}/>
            </div>
          </nav>
          <div className="board">
            <div className="board-squares">
              <Board start={this.state.startValue} limit={this.state.limitValue}/>
            </div>
          </div>
        </div>
    );
  }

  updateStartValue(evt) {
    this.setState({
      startValue: parseInt(evt.target.value)
    });
  }

  updateLimitValue(evt) {
    this.setState({
      limitValue: parseInt(evt.target.value)
    });
  }
}

export default App;
