import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {data} from './morseChart.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonPushed: false,
      islightOn: false,
      start_time: 0,
      end_time: 0,
      dot: false,   // <300 millis
      dash: false,  // >300 millis
      sequence: "", // dot and dash sequence
      letter: "",   // concatenation of letters
      word: ""      // a whole word
    }
  }



  setBeep() {
    if(this.audioCtx == null) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)()
      this.oscillator = this.audioCtx.createOscillator()
      this.gainNode = this.audioCtx.createGain()

      
      this.gainNode.connect(this.audioCtx.destination)

      this.gainNode.gain.value = 0.5 /100
      this.oscillator.frequency.setValueAtTime(591,0)
      this.oscillator.type = 'sine'
      this.oscillator.start()
    }
  }

  handleMorseEvent = (event) => {
    if(event.type === "mousedown") {
      this.setBeep()
      this.oscillator.connect(this.gainNode)
      this.setState({
        isButtonPushed: true,
        islightOn: true,
        start_time: Date.now()  
      });
    }
    else { //mouse up
      let local_end_time = Date.now()
      this.oscillator.disconnect(this.gainNode)
      this.setState({
        isButtonPushed: false,
        islightOn: false,
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
        <div className={(this.state.islightOn ? "light-on" : "light-off")}/>
        <div className="row buttonContainer">
          <div className="col-auto">
            <button className={"dot-button " + (this.state.isButtonPushed ? "dot-button-grey" : null)} onMouseDown={this.handleMorseEvent} onMouseUp={this.handleMorseEvent}></button>
          </div>
          <div className="col-auto">
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
          <br/>
          <div class="container">
            <div className="row">
              {Object.keys(data).map((key) =>(
                <div className="col-auto">
                  <p>{data[key]} {key}</p>
                </div>
              ))}
            </div>     
          </div>
               
        </div>
      </>
    ); 
  }

}

export default App;