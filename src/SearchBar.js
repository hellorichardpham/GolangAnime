import React from 'react';
import './App.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    }
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);

  }

  _handleOnChange = (event) => {
    this.setState({ 'title': event.target.value })
  }

  _handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter has been pressed');
      this.props.onClick(this.state.title);
    }
  }

  render() {
    return (
      <div className="wrap">
        <div className="search">
          <input type="text" className="searchTerm" placeholder="Search for an anime title" onChange={this._handleOnChange} onKeyDown={this._handleKeyDown}/>
          <button type="submit" className="searchButton" onClick={() => this.props.onClick(this.state.title)} >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;

