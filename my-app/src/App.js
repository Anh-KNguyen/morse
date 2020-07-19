import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import {data, alphabet, numbers, symbols} from './morseChart.js';
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

  handleEndSeqEvent = (event) => {
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

  handleClearSeqEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
          sequence: ""
      })
    }
  }

  handleClearLetterEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
          letter: ""
      })
    }
  }

  handleClearWordEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({
          word: ""
      })
    }
  }


  render() {
    return (
      <>
        <div className="row button-container">
          <div className="col-auto">
            <div>
              <div className={(this.state.islightOn ? "light-on" : "light-off")} style={{marginLeft: "auto", marginRight: "auto", marginTop: "100px", marginBottom: " 50px"}}/>
              <button className={"dot-button " + (this.state.isButtonPushed ? "dot-button-grey" : null)} onMouseDown={this.handleMorseEvent} onMouseUp={this.handleMorseEvent}></button>
            </div>
            <br/>
          </div>
          <div className="col-auto" style={{marginTop: "200px", marginLeft: "10px"}}>
            <InputGroup>
              <FormControl
                readOnly
                type="text"
                placeholder="Morse code"
                value={this.state.sequence}          
              />
              <InputGroup.Append>
                <Button variant="success" onMouseDown={this.handleEndSeqEvent}>End Code</Button>  {/* end code sequence */}
                <Button variant="danger" onMouseDown={this.handleClearSeqEvent}>Clear</Button>    {/* clear code sequence */}    
              </InputGroup.Append>
            </InputGroup>
            <br/>
            <InputGroup>
              <FormControl
                readOnly
                type="text"
                placeholder="Letter(s)"
                value={this.state.letter}          
              />
              <InputGroup.Append>
                <Button variant="success" onMouseDown={this.handleEndWordEvent}>End Word</Button>   {/* becomes a word */}
                <Button variant="danger" onMouseDown={this.handleClearLetterEvent}>Clear</Button>   {/* clear letter(s) */}
              </InputGroup.Append>
            </InputGroup>
            <br/>
            <InputGroup>
              <FormControl
                readOnly
                type="text"
                placeholder="Word(s)"
                value={this.state.word}          
              />
              <InputGroup.Append>
                <Button variant="danger" onMouseDown={this.handleClearWordEvent}>Clear</Button>  {/* clear words(s) */}
              </InputGroup.Append>
            </InputGroup>
          </div>   
        </div>

        <div>
          {/* {this.state.end_time - this.state.start_time} */}   
          <br/>
          <div className="container" style={{marginTop: "40px"}}>
            <div className="row">
              <div className="col-6 split">
                {Object.keys(alphabet).map((key) =>(
                  <div className="col-auto">
                    <p className="codefont-style">{alphabet[key]} {key}</p>
                  </div>
                ))}
              </div>
              <div className="col-3">
                {Object.keys(numbers).map((key) =>(
                  <div className="col-auto">
                    <p className="codefont-style">{numbers[key]} {key}</p>
                  </div>
                ))}
              </div>
              <div className="col-3">
                {Object.keys(symbols).map((key) =>(
                  <div className="col-auto">
                    <p className="codefont-style">{symbols[key]} {key}</p>
                  </div>
                ))}
              </div>
            </div>     
          </div>
               
        </div>
      </>
    ); 
  }

}

export default App;