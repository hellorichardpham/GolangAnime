import React from 'react';
import SearchBar from './SearchBar'
import { Flex } from './Flex'
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [],
      selectedAnimes: [],
      mainCharacters: [],
      persons: [],
      error: false,
      showComparison: false,
      isDoneLoading: false,
    }
    this.addVoiceActor = this.addVoiceActor.bind(this);
    // this.handleComparisonV2 = this.handleComparisonV2.bind(this);
    this.handleAnimeSelected = this.handleAnimeSelected.bind(this);
    this.getHTML = this.getHTML.bind(this);
    this.getHTML2 = this.getHTML2.bind(this);
    this.doShowComparison = this.doShowComparison.bind(this);
    this.doReset = this.doReset.bind(this);
  }

  handleSearchAction = (title) => {
    fetch("https://seiyuu-starpower-service-vkryztv2qa-uw.a.run.app/search?limit=5&title=" + encodeURI(title))
      .then(res => res.json())
      .then(
        (result) => {
          // console.log("result: " + JSON.stringify(result["results"]))
          this.setState({
            animes: result["results"]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('error: ' + error);
          this.setState({
            error: true
          });
        }
      )
  }

  handleAnimeSelected = (malId) => {
    this.setState({
      isDoneLoading: false,
      showComparison: false
    });

    this.numSelected++;
    console.log('I am starting handleAnimeSelected with malId: ' + malId);
    fetch("https://seiyuu-starpower-service-vkryztv2qa-uw.a.run.app/anime/" + malId)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('anime result: ' + JSON.stringify(result));
          this.setState(prevState => ({
            selectedAnimes: [...prevState.selectedAnimes, result]
          }))
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

    fetch("https://seiyuu-starpower-service-vkryztv2qa-uw.a.run.app/anime/" + malId + "/mainCharacters")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log("mainCharacters: " + JSON.stringify(result))
          this.setState(prevState => ({
            mainCharacters: [...prevState.mainCharacters, result]
          }))
          this.addVoiceActor(result);
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

  addVoiceActor = (mainCharacter) => {
    if (mainCharacter === undefined) {
      return;
    }
    console.log('I am in handle comparison this is where I need to be.')
    if (mainCharacter.length > 0) {
      var urls = [];
      mainCharacter.forEach(function (character) {
        var characterVoiceActors = character.voice_actors[0];
        var url = 'https://seiyuu-starpower-service-vkryztv2qa-uw.a.run.app/thisisatest/' + characterVoiceActors.mal_id;
        urls.push(url);
      })
      this.requestAllWithDelay(urls, 200).then(
        (response) => {
          console.log('I am setting the persons state')
          this.setState(prevState => ({
            persons: [...prevState.persons, response]
          }))
        }
      ).then(() => {
        this.setState({
          isDoneLoading: true
        })
        console.log('I am setting is done loading: ' + this.state.isDoneLoading);
      })
    } else {
      console.log('else');
    }
  }

  requestAllWithDelay = async (urls, delay) => {
    let responses = [];
    for (const url of urls) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data: ' + JSON.stringify(data));
        responses.push(data);
      } catch (err) {
        responses.push(null);
      }
      await this.promiseDelay(delay);
    }
    return responses;
  }

  promiseDelay = (ms) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    })
  }

  getHTML = (mainCharacters, persons, index) => {
    let content = [];
    if (mainCharacters.length === persons.length) {
      console.log('getHTML. index: ' + index)
      console.log('characters: ' + JSON.stringify(this.state.mainCharacters[index]))
      console.log('persons: ' + JSON.stringify(this.state.persons[index]))
      var i, j;
      for (i = 0; i < mainCharacters.length; i++) {
        for (j = 0; j < mainCharacters[i].length; j++) {
          let character = mainCharacters[i][j];
          let person = persons[i][j];
          content.push(
            <Flex container margin="10px auto" flexWrap="wrap">
              <NewCharacter
                character={character}
                person={person}
              />
            </Flex>
          );
        }
      }
    } else {
      console.log('main characters and persons is not the same length');
    }
    return content;
  }

  getHTML2 = (index) => {
    let content = [];
    let mainCharacters = this.state.mainCharacters[index];
    let persons = this.state.persons[index];
    let totalFavorites = 0;
    if ((mainCharacters !== undefined && persons !== undefined) && (mainCharacters.length === persons.length)) {
      console.log('getHTML2. index: ' + index)
      console.log('characters: ' + JSON.stringify(this.state.mainCharacters[index]))
      console.log('persons: ' + JSON.stringify(this.state.persons[index]))
      var i;
      for (i = 0; i < mainCharacters.length; i++) {
          var character = mainCharacters[i];
          let person = persons[i];
          totalFavorites += person.member_favorites;
          content.push(
              <NewCharacter
                character={character}
                person={person}
              />
          );
      }
      console.log('totalFavorites: ' + totalFavorites);
      console.log('Average Favorites: ' + totalFavorites/mainCharacters.length);
      content.unshift(<h1 className="headerTest">Average Favorites: {Math.floor(totalFavorites/mainCharacters.length).toLocaleString()}</h1>)
    } else {
      console.log('main characters and persons is not the same length');
    }
    return content;
  }

  doShowComparison = () => {
    if (this.state.selectedAnimes.length < 2) {
      alert("Select at least 2 animes to compare them");
      return;
    }
    if (this.state.isDoneLoading) {
      this.setState({
        showComparison: true
      });
    } else {
      alert("HOLD UP. Your boy is getting rate limited and isn't ready to compare yet.");
    }
  }

  doReset = () => {
    this.setState({
      animes: [],
      selectedAnimes: [],
      mainCharacters: [],
      persons: [],
      error: false,
      showComparison: false,
      isDoneLoading: false,
    })
  }

  render() {
    const { animes, selectedAnimes, mainCharacters, persons, error, showComparison, isDoneLoading } = this.state;
    // console.log('I am rendering with the state animes: ' + this.state.animes);
    // console.log('I am rendering with the state selectedAnime: ' + this.state.selectedAnime.title_english);
    console.log('I am rendering with the state persons.length: ' + this.state.persons.length);
    console.log('showComparison: ' + showComparison);
    if (error) {
      return (
        <div>There was an error. Whoops.</div>
      )
    } else if (!showComparison) {
      return (
        <div>
          <br></br>
          <SearchBar
            onClick={title => this.handleSearchAction(title)}
          />
          <Flex container margin="10px auto" justifyContent="space-around" flexWrap="wrap">
            {animes.map(anime => (
              <SearchResult malId={anime.mal_id}
                title={anime.title}
                url={anime.url}
                imageUrl={anime.image_url}
                onClick={malId => this.handleAnimeSelected(malId)} />
            ))}
          </Flex>
          <Flex container justifyContent="center" alignItems="center">
            <button className="pure-material-button-contained" onClick={this.doShowComparison}>Compare</button>
            <button className="pure-material-button-contained" onClick={this.doReset}>Reset</button>
          </Flex>
          <Flex container justifyContent="space-around" alignItems="center">
            {selectedAnimes.map(anime => (
              <AnimeResult
                url={anime.url}
                malId={anime.mal_id}
                imageUrl={anime.image_url}
                title={anime.title}
                titleEnglish={anime.title_english}
                score={anime.score}
                scoredBy={anime.scored_by}
                rank={anime.rank}
                popularity={anime.popularity}
              />
            ))}
          </Flex>

        </div>
      );
    } else if (showComparison && isDoneLoading) {
      return (
        <div>
          <br></br>
          <SearchBar
            onClick={title => this.handleSearchAction(title)}
          />
          <Flex container margin="10px auto" justifyContent="space-around" flexWrap="wrap">
            {animes.map(anime => (
              <SearchResult malId={anime.mal_id}
                title={anime.title}
                url={anime.url}
                imageUrl={anime.image_url}
                onClick={malId => this.handleAnimeSelected(malId)} />
            ))}
          </Flex>
          <Flex container alignItems="flex-start" justifyContent="center" alignItems="center">
            <button className="pure-material-button-contained" onClick={this.doShowComparison}>Compare</button>
            <button className="pure-material-button-contained" onClick={this.doReset}>Reset</button>
          </Flex>
          <Flex container alignItems="flex-start" justifyContent="space-around" alignItems="center">
            {selectedAnimes.map(anime => (
              <AnimeResult
                url={anime.url}
                malId={anime.mal_id}
                imageUrl={anime.image_url}
                title={anime.title}
                titleEnglish={anime.title_english}
                score={anime.score}
                scoredBy={anime.scored_by}
                rank={anime.rank}
                popularity={anime.popularity}
              />
            ))}
          </Flex>

          <Flex container flexDirection="row" margin="10px auto" flexWrap="wrap">
            {mainCharacters.map((value, index) => (
              <Flex container flexDirection="column" margin="10px auto" flexWrap="wrap">
                {this.getHTML2(index)}
              </Flex>
            ))}
          </Flex>
        </div>
      );
    }
  }
}




function SearchResult(props) {
  return (
    <div className="Polaroid">
      <img src={props.imageUrl} alt="" onClick={() => props.onClick(props.malId)}></img>
      <div className="Container">
        <p className="truncate">{props.title}</p>
      </div>
    </div>
  )
}

function AnimeResult(props) {
  console.log('props.malId: ' + props.malId);
  if (props.malId !== undefined) {
    return (
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center">
        <h2 className="truncateLong">{props.title}</h2>
        <a href={props.url} target="_blank" rel="noopener noreferrer"><img className="TestImg" src={props.imageUrl} alt=""></img></a>
        <p>Score: {props.score}</p>
        <p>Scored By: {props.scoredBy}</p>
        <p>Rank: {props.rank}</p>
        <p>Popularity: {props.popularity}</p>
      </Flex>
    )
  } else {
    return null;
  }
}

function NewCharacter(props) {
  return (
    <Flex container margin="10px auto" justifyContent="space-around" flexWrap="wrap">
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center" padding="25px">
        <h2>{props.character.name}</h2>
        <a href={props.character.url} target="_blank" rel="noopener noreferrer"><img className="TestImg" src={props.character.image_url} alt=""></img></a>
      </Flex>
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center" padding="25px">
        <h2>{props.person.name}</h2>
        <a href={props.person.url} target="_blank" rel="noopener noreferrer"><img className="TestImg" src={props.person.image_url} alt=""></img></a>
        <h2>Favorites: {props.person.member_favorites.toLocaleString()}</h2>
      </Flex>
    </Flex>
  )
}

export default Search;