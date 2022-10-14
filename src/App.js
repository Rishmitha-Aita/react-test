import React, { Component } from 'react';
import axios from 'axios';

export const doIncrement = prevState => ({
  counter: prevState.counter + 1,
});

export const doDecrement = prevState => ({
  counter: prevState.counter - 1,
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      asyncCounters: null,
      input: '',
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://mydomain/counter')
      .then(counter => this.setState({ asyncCounters: counter }))
      .catch(error => console.log(error));
  }

  onIncrement() {
    this.setState(doIncrement);
  }

  onDecrement() {
    this.setState(doDecrement);
  }

  inputOnChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h1>My Counter</h1>
        <Counter counter={counter} />

        <button type="button" onClick={this.onIncrement}>
          Increment
        </button>

        <button type="button" onClick={this.onDecrement}>
          Decrement
        </button>
        <div>
          <input
            onChange={(event) => {
              this.inputOnChange(event)
            }}
            type="text" />
        </div>
      </div>

    );
  }
}

export const Counter = ({ counter }) => <p>{counter}</p>;

export default App;
