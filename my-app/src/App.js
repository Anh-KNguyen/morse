import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {data} from './morseChart.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "black",
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
        buttonColor: "#4c4c4c",
        start_time: Date.now()  
      });
    }
    else { //mouse up
      let local_end_time = Date.now()
      this.setState({
        buttonColor: "black",
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
      <>
        <div class="row">
          <div class="col-md-auto">
            <button class="dot-button" style={{backgroundColor: this.state.buttonColor}} onMouseDown={this.handleMorseEvent} onMouseUp={this.handleMorseEvent}></button>
          </div>
          <div class="col-md-auto align-self-center">
            <div>
              <button onMouseDown={this.handleEndLetterEvent}>End letter</button>
            </div>
            <div>
              <button onMouseDown={this.handleEndWordEvent}>End Word</button>
            </div>
          </div>   
        </div>
        
        <div>
          {/* {this.state.end_time - this.state.start_time} */}
          
          <br/>
          {this.state.sequence}
          <br/>
          {this.state.letter}
          <br/>
          {this.state.word}
        </div>
      </>
    ); 
  }

}

export default App;