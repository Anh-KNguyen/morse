import React from 'react';
import {data} from './morseChart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      end_time: 0,
      dot: false,   // <300 millis
      dash: false,  // >300 millis
      sequence: "", // dot and dash sequence
      letter: "",   // concatenation of letters
      word: ""      // a whole word
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
            sequence: state.sequence + '.'
          }
        })
      }
      else{ //dash
        this.setState((state) => {
          return {
            dot: false,
            dash: true,
            sequence: state.sequence + '-'
          }
        })
        
      }
    }
  }

  handleEndLetterEvent = (event) => {
    if(event.type === "mousedown") {
      if (this.state.sequence in data) {
        this.setState((state) => {
          return {
            letter: state.letter + data[this.state.sequence], // concatenation of letters
            sequence: ""
            
          }
        })
      }
      else {
        console.log("incorrect letter")
        this.setState((state) => {
          return {
            sequence: ""
          }
        })
      }
    }
  }

  handleEndWordEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState((state) => {
        return {
          word: state.word + " " + state.letter,
          letter: ""
        }
      })
    }
  }


  render() {
    return (
      <div>
        <button id="morse-btn" onMouseDown={this.handleMorseEvent} onMouseUp={this.handleMorseEvent}>CLICK</button>
        {this.state.end_time - this.state.start_time}
        <button id="end-letter-btn" onMouseDown={this.handleEndLetterEvent}>End letter</button>
        <button id="end-word-btn" onMouseDown={this.handleEndWordEvent}>End Word</button>
        <br/>
        Dot:{this.state.dot.toString()}
        <br/>
        Dash:{this.state.dash.toString()}
        <br/>
        {this.state.sequence}
        <br/>
        {this.state.letter}
        <br/>
        {this.state.word}
      </div>
    ); 
  }

}

export default App;