import React from 'react';
import morseChart from './morseChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      end_time: 0,
      dot: false, //<300 millis
      dash: false  //>300 millis
      
    }
  }
  
  handleMorseEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
        start_time: Date.now()
      });
    }
    else {
      let local_end_time = Date.now()
      this.setState({
        end_time: local_end_time
      });
      
      let time = local_end_time - this.state.start_time
      if(time < 300) {
        this.setState({
          dot: true,
          dash: false
        })
      }
      else{
        this.setState({
          dash: true,
          dot: false
        })
      }
    }
  }

  render() {
    return (
      <div>
        <button id="morse-btn" onMouseDown={this.handleMorseEvent} onMouseUp={this.handleMorseEvent}> CLICK </button>
        {this.state.end_time - this.state.start_time}
        <button id="end-word-btn" onMouseDown={this.handleEndWordEvent}> End word </button>
        <br/>
        Dot:{this.state.dot.toString()}
        <br/>
        Dash:{this.state.dash.toString()}
      </div>
      
      
    );
  }

}

export default App;