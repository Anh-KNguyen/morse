import React from 'react';
import morseChart from './morseChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Mouse Event"
    }
  }
  
  handleEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
        message: "Mouse Down"
      });
    }
    else {
      this.setState({
        message: "Mouse Up"
      });
    }
  }

  render() {
    return (
      <div>
        <button id="btn" onMouseDown={this.handleEvent} onMouseUp={this.handleEvent}> CLICK </button>
      </div>
      
    );
  }

}

export default App;