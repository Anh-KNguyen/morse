import React from 'react';
import morseChart from './morseChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  handleEvent = (event) => {
    if(event.type === "mousedown") {
      this.setState({})
    }
    else {
      this.setState({})
    }
  }

  render() {
    return (
      <div>

      </div>
    );
  }

}

export default App;