import React from 'react';
import SearchBar from './SearchBar'
import './App.css';



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [],
      selectedAnime: {},
      error: false
    }
  }

  handleSearchAction = (title) => {
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

  handleAnimeSelected = (malId) => {
    console.log('I am starting handleAnimeSelected with malId: ' + malId);
    fetch("http://localhost:10000/anime/" + malId)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result: " + JSON.stringify(result))
          this.setState({
            selectedAnime: result
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
    const { animes, selectedAnime, error } = this.state;
    console.log('I am rendering with the state animes: ' + this.state.animes);
    console.log('I am rendering with the state selectedAnime: ' + this.state.selectedAnime.title_english);
    if (error) {
      return (
        <div>There was an error.</div>
      )
    } else {
      return (
        <div className="parent">
          <SearchBar
            onClick={title => this.handleSearchAction(title)}
          />
          <div className="searchResultsContainer">
          <ul className="no-bullets">
            {animes.map(anime => (
              <li key={anime.mal_id}>
                <SearchResult malId={anime.mal_id}
                  title={anime.title}
                  url={anime.url}
                  imageUrl={anime.image_url}
                  onClick={malId => this.handleAnimeSelected(malId)} />
              </li>
            ))}
          </ul>
          </div>
          <AnimeResult
            malId={selectedAnime.mal_id} 
            imageUrl={selectedAnime.image_url}
            title={selectedAnime.title}
            titleEnglish={selectedAnime.title_english}
            score={selectedAnime.score}
            scoredBy={selectedAnime.scored_by}
            rank={selectedAnime.rank}
            popularity={selectedAnime.popularity}
          />
        </div>
      );
    }
  }
}

function SearchResultContainer(props) {
  
}

function SearchResult(props) {
  return (
    <div className="SearchResult">
      <img src={props.imageUrl} alt="" onClick={() => props.onClick(props.malId)}></img>
      <br></br>
      {props.title}
    </div>
  )
}

function AnimeResult(props) {
  console.log('props.malId: ' + props.malId);
  if (props.malId !== undefined) {
    return (
      <div className="AnimeResult">
        Selected Anime: {props.title}
        <br></br>
        <img src={props.imageUrl} alt=""></img>
        Score: {props.score}
        <br></br>
        ScoredBy: {props.scoredBy}
        <br></br>
        Rank: {props.rank}
        <br></br>
        Popularity: {props.popularity}
      </div>
    )
  } else {
    return null;
  }
  
}

export default Search;