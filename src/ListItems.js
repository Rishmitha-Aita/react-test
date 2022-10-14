import React, { Component } from 'react';

class listItems extends Component {

  constructor(props) {
    super(props);
  }

  createList(number) {
    return <li key={number}>{number}</li>;
  }

  render() {

    const list = this.props.list;
    return (
      <div>
        {list && <ul>{list.map((number) => this.createList(number))}</ul>}
      </div>
    );
  }
}

export default listItems;
