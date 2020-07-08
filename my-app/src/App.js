import React from 'react';
import morseChart from './morseChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      end_time: 0,
      dot: false, //<300 millis
      dash: true  //>300 millis
      
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
        console.log({this.state.end_time - this.state.start_time})
      </div>
      
    );
  }

}

export default App;