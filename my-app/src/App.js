import React from 'react';
import morseChart from './morseChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      end_time: 0,
      dot: false, //<300 millis
      dash: false,  //>300 millis
      sequenceLetter: ""
    }
  }
  
  handleMorseEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
        start_time: Date.now()  
      });
    }
    else { //mouse up
      let local_end_time = Date.now()
      this.setState({
        end_time: local_end_time
      });

      // form sequence of letter
      let time = local_end_time - this.state.start_time
      if(time < 300) { //dot
        this.setState((state) => {
          return {
            dot: true,
            dash: false,
            sequenceLetter: state.sequenceLetter + '.'
          }
        })
      }
      else{ //dash
        this.setState((state) => {
          return {
            dot: false,
            dash: true,
            sequenceLetter: state.sequenceLetter + '-'
          }
        })
        
      }
    }
  }

  handleEndLetterEvent = (event) => {
    
  }

  render() {
    return (
      <div>
        <button id="morse-btn" onMouseDown={this.handleMorseEvent} onMouseUp={this.handleMorseEvent}> CLICK </button>
        {this.state.end_time - this.state.start_time}
        <button id="end-word-btn" onMouseDown={this.handleEndLetterEvent}> End letter </button>
        <br/>
        Dot:{this.state.dot.toString()}
        <br/>
        Dash:{this.state.dash.toString()}
        <br/>
        {this.state.sequenceLetter}
      </div>
    );
  }

}

export default App;