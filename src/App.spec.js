import React from 'react';
import axios from 'axios';
import App, { doIncrement, doDecrement, Counter } from './App';
import ListItems from './ListItems';
import SearchItem from './SearchItem';
import { filteredPersons } from './SearchList';
import { expect } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });


describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);

    expect(newState.counter).to.equal(1);
  });

  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);

    expect(newState.counter).to.equal(-1);
  });
});

describe('App Component', () => {
  const result = [3, 5, 9];
  const promise = Promise.resolve(result);

  beforeEach(() => {
    sinon.stub(axios, 'get').withArgs('http://mydomain/counter').returns(promise);
  });

  afterEach(() => {
    axios.get.restore();
  });

  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });

  it('increments the counter', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(0).simulate('click');

    expect(wrapper.state().counter).to.equal(1);
  });

  it('decrements the counter', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(1).simulate('click');

    expect(wrapper.state().counter).to.equal(-1);
  });

  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');

    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('fetches async counters', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().asyncCounters).to.equal(null);

    promise.then(() => {
      expect(wrapper.state().asyncCounters).to.equal(result);
    });
  });

  it('gives input a value', () => {
    const wrapper = shallow(<App />);
    // wrapper.find('input').simulate('onChange');
    // wrapper.setState({ input: 'Text' });
    // expect(wrapper.state().input).to.equal('Text');

    //to get full coverage using this
    wrapper.find('input').simulate('change', { target: { value: "Text" } });
    expect(wrapper.state().input).to.equal("Text");

  })

});
describe('ListItems Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ListItems list={[1, 2, 3, 4, 5]} />);
  })

  it('correctly renders the exact number of li elements given', () => {
    expect(wrapper.find('li')).to.have.lengthOf(5);
  })

  it('correctly sets values to li elements', () => {
    expect(wrapper.find('li').at(1).text()).to.eql(("2"))
  })

  it('shows no result when no elements passed', () => {
    let newWrapper = render(<ListItems list={[]} />)
    expect(newWrapper.find('ul')).to.have.length(1);
  })
})
describe('Search Component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = { searchList: ["Hari", "Segal", "Richa"], find: "richa" };
    wrapper = mount(<SearchItem default={props} />);
  });

  it('check if input is set or not', () => {
    wrapper.find('input[type="search"]').simulate('change', { target: { value: "hello" } })
    expect(wrapper.state().input).to.equal("hello");
  })

  it('getting element using className', () => {
    wrapper.find('.search').simulate('change', { target: { value: "hello" } })
    expect(wrapper.state().input).to.equal("hello");
  })

  it('search list getting set correctly by the result of input given', () => {
    wrapper.find('[type="search"]').simulate('change', { target: { value: "r" } });
    expect(wrapper.find(ListItems).find('li')).to.have.lengthOf(2);
  })

  it('mock a function findPerson() inside searchItem and see the result', () => {
    expect(wrapper.instance().findPerson()).to.equal('Richa');
  })

})
describe('searchList Component', () => {
  let searchList;
  beforeEach(() => {
    searchList = ["Hari", "Segal", "Richa"];
  })
  it('searchList is defined ', () => {
    expect(filteredPersons).to.be.not.undefined;
  })
  it('searchList should filter correctly ', () => {
    expect(filteredPersons(searchList, 'Richa')).to.have.lengthOf(1);
  })
  it('searchList should filter correctly even in insensitive case', () => {
    expect(filteredPersons(searchList, 'r')).to.have.lengthOf(2);
  })

})
