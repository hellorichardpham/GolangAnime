import React from 'react';
import SearchBar from './SearchBar'
import { Flex } from './Flex'
import './App.css';



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [{ "mal_id": 5081, "url": "https://myanimelist.net/anime/5081/Bakemonogatari", "image_url": "https://cdn.myanimelist.net/images/anime/11/75274.jpg?s=3bb5c42c0803621dde09c52f5c4d4249", "title": "Bakemonogatari" }, { "mal_id": 6948, "url": "https://myanimelist.net/anime/6948/Bakemonogatari_Recap", "image_url": "https://cdn.myanimelist.net/images/anime/11/65863.jpg?s=23a1f14ccbe2e81d6fe925cdf0a920e3", "title": "Bakemonogatari Recap" }, { "mal_id": 11597, "url": "https://myanimelist.net/anime/11597/Nisemonogatari", "image_url": "https://cdn.myanimelist.net/images/anime/1044/103654.jpg?s=9fb0dbe56bcab572f3b019e51a2f3c60", "title": "Nisemonogatari" }, { "mal_id": 15689, "url": "https://myanimelist.net/anime/15689/Nekomonogatari__Kuro", "image_url": "https://cdn.myanimelist.net/images/anime/4/84001.jpg?s=c2eabecc1c4ad77eb521115982c93d85", "title": "Nekomonogatari: Kuro" }, { "mal_id": 21855, "url": "https://myanimelist.net/anime/21855/Hanamonogatari", "image_url": "https://cdn.myanimelist.net/images/anime/13/65755.jpg?s=7db9f22eac99f1e78fe9ff954abd2fad", "title": "Hanamonogatari" }],
      selectedAnimes: [],
      mainCharacters: [],
      persons: [],
      error: false
    }
  }

  handleSearchAction = (title) => {
    fetch("http://localhost:10000/search?limit=5&title=" + encodeURI(title))
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

    fetch("http://localhost:10000/anime/" + malId + "/mainCharacters")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("mainCharacters: " + JSON.stringify(result))
          this.setState(prevState => ({
            mainCharacters: [...prevState.mainCharacters, result]
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
  }

  handleComparison = () => {
    if (this.state.mainCharacters.length > 0) {
      var urls = [];
      let delay = 2000;
      this.state.mainCharacters[0].forEach(function (character) {

        var characterVoiceActors = character.voice_actors[0];
        var url = 'http://localhost:10000/person/' + characterVoiceActors.mal_id;
        urls.push(url);
      })
      console.log('i am here')
      var response = this.requestAllWithDelay(urls, 10).then(
        (response) => {
          this.setState(prevState => ({
            persons: [...prevState.persons, response]
          }))
        }
      )     
    } else {
      console.log('else');
    }
  }

  requestAllWithDelay = async(urls, delay) => {
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

  getHTML = (mainCharacters, persons) => {
    let content = [];
    if (mainCharacters.length > 0 && persons.length > 0) {
      console.log('persons: ' + JSON.stringify(persons));
      var i, j;
      //mainCharacters is an array of arrays. For now just grab the first
      for (i = 0; i < mainCharacters.length; i++) {
        for (j = 0; j < mainCharacters[i].length; j++) {
          let character = mainCharacters[i][j];
          console.log('persons[i]: ' + JSON.stringify(persons[i]));
          let person = persons[i][j];
          console.log('person: ' + JSON.stringify(person));
          content.push(
            <Flex container margin="10px auto" flexWrap="wrap">
              <MainCharacter
                malID={character.mal_id}
                name={character.name}
                url={character.url}
                imageUrl={character.image_url}
                voiceActors={character.voice_actors}
              />
              <Person
                person={person}
              />
            </Flex>
          );
        }
      }  
    }
    return content;
  }

  render() {
    const { animes, selectedAnimes, mainCharacters, persons, error } = this.state;
    // console.log('I am rendering with the state animes: ' + this.state.animes);
    // console.log('I am rendering with the state selectedAnime: ' + this.state.selectedAnime.title_english);
    console.log('I am rendering with the state persons.length: ' + this.state.persons.length);

    if (error) {
      return (
        <div>There was an error.</div>
      )
    } else {
      return (
        <div>
          <input type="submit" value="comparison" onClick={this.handleComparison} />
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
          <Flex container alignItems="flex-start" justifyContent="space-around" alignItems="center">
            {selectedAnimes.map(anime => (
              <AnimeResult
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

          {/* <Flex container flexDirection="column" margin="10px auto" flexWrap="wrap"> */}
            <Flex container flexDirection="column" margin="10px auto" flexWrap="wrap">
              {this.getHTML(mainCharacters, persons)}
            </Flex>
          {/* </Flex> */}
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
        <p className="TestP">{props.title}</p>
      </div>
    </div>
  )
}

function AnimeResult(props) {
  console.log('props.malId: ' + props.malId);
  if (props.malId !== undefined) {
    return (
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center">
        <h1>{props.title}</h1>
        <img className="TestImg" src={props.imageUrl} alt=""></img>
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

function MainCharacter(props) {
  return (
    <Flex container margin="10px auto" justifyContent="space-around" flexWrap="wrap">
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center" padding="25px">
        <h2>{props.name}</h2>
        <a href={props.url} target="_blank" rel="noopener noreferrer"><img src={props.imageUrl} alt=""></img></a>
      </Flex>
    </Flex>
  )
}

function Person(props) {
  console.log('props.person: ' + props.person);
  return (
    <Flex container margin="10px auto" justifyContent="space-around" flexWrap="wrap">
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center" padding="25px">
        <h2>{props.person.name}</h2>
        <a href={props.person.url} target="_blank" rel="noopener noreferrer"><img src={props.person.image_url} alt=""></img></a>
        <h2>Favorites: {props.person.member_favorites.toLocaleString()}</h2>
      </Flex>
    </Flex>
  )
}

export default Search;