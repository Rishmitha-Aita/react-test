import React, { Component } from 'react';
import { filteredPersons } from './SearchList';
import ListItems from './ListItems';

export default class SearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            searchList: this.props.default.searchList,
            find: this.props.default.find,
            result: '',
        };
    }

    findPerson() {
        return this.state.searchList.find(
            person => person.toLowerCase() === (this.state.find.toLowerCase()));
    }

    handleInputSearch(event) {
        this.setState({
            input: event.target.value
        })
    };

    render() {
        const filtered_persons_list = filteredPersons(this.state.searchList, this.state.input)
        return (
            <div>
                <input type="search" placeholder="Search Name" className='search'
                    onChange={(event) => {
                        this.handleInputSearch(event)
                    }} />
                <div className='newList'>
                    <ListItems list={filtered_persons_list} />
                </div>
                <span data-testid='span'>
                    {this.findPerson()}
                </span>
            </div>
        );
    }
}
