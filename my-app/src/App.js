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
  
  handleEvent = (event) => {
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
        <button id="btn" onMouseDown={this.handleEvent} onMouseUp={this.handleEvent}> CLICK </button>
        {this.state.end_time - this.state.start_time}
        <br></br>
        Dot:{this.state.dot.toString()}
        <br></br>
        Dash:{this.state.dash.toString()}
      </div>
      
    );
  }

}

export default App;