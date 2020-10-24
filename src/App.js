import React from 'react';
import './App.css';



class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [],
      selectedAnime: {},
      error: false
    }
  }

  handleClick = (title) => {
    fetch("http://localhost:10000/search?title=" + encodeURI(title))
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result: " + JSON.stringify(result["results"]))
          this.setState({
            animes: result["results"]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error: true
          });
        }
      )
  }

  render() {
    const { animes, error } = this.state;
    console.log('I am rendering with the state animes: ' + this.state.animes);
    if (error) {
      return (
        <div>There was an error.</div>
      )
    } else {
      return (
        <div className="parent">
          <SearchBar
            onClick={title => this.handleClick(title)}
          />
          <ul className="no-bullets">
            {animes.map(anime => (
              <li key={anime.mal_id}>
                <SearchResult title={anime.title}
                  url={anime.url}
                  image_url={anime.image_url} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

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
        <form>
          Title: <input type='text'
            name='title'
            value={this.state.title}
            onChange={this._handleOnChange}
            onKeyDown={this._handleKeyDown}
          />
        </form>
        <input type="submit" value="submit" onClick={() => this.props.onClick(this.state.title)} />
      </div>
    );
  }
}

function SearchResult(props) {
  const imageClick = () => {
    console.log('clicked');
  }
  return (
    <div className="SearchResult">
      <img src={props.image_url} onClick={() => imageClick()}></img>
      <br></br>
      {props.title}
    </div>
  )
}

export default Parent;
