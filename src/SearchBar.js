import React from 'react';
import './App.css';

class SearchBar extends React.Component {

    state = {
      title: '',
    }
  
    _handleOnChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }
  
    _handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('Enter has been pressed');
        this.props.onClick(this.state.title);
      }
    }
  
    render() {
      //const { title, animes, error } = this.state;
      return (
        <div className="SearchBar">
            Title: <input type='text'
              name='title'
              value={this.state.title}
              onChange={this._handleOnChange}
              onKeyDown={this._handleKeyDown}
            />
            <br></br>
          <input type="submit" value="Search" onClick={() => this.props.onClick(this.state.title)} />
        </div>
      );
    }
  }

  export default SearchBar;