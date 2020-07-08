import React from 'react';
import morseChart from './morseChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      end_time: 0
    }
  }
  
  handleEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
        start_time: Date.now()
      });
    }
    else {
      this.setState({
        end_time: Date.now()
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