import React from 'react';
import SearchBar from './SearchBar'
import { Flex } from './Flex'
import './App.css';



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [{"mal_id":38101,"url":"https://myanimelist.net/anime/38101/5-toubun_no_Hanayome","image_url":"https://cdn.myanimelist.net/images/anime/1819/97947.jpg?s=63766d471cbb06b0bc8d4c81d5fc98fe","title":"5-toubun no Hanayome"},{"mal_id":39783,"url":"https://myanimelist.net/anime/39783/5-toubun_no_Hanayome_∬","image_url":"https://cdn.myanimelist.net/images/anime/1775/109514.jpg?s=7223653b9c57b539ca603e6881f0b9af","title":"5-toubun no Hanayome ∬"},{"mal_id":39650,"url":"https://myanimelist.net/anime/39650/Essential_Free___Easy","image_url":"https://cdn.myanimelist.net/images/anime/1245/100364.jpg?s=e328d369f0f02481d5c62ddae1e2ba21","title":"Essential Free & Easy"},{"mal_id":34239,"url":"https://myanimelist.net/anime/34239/Mutsugo_to_Ouma_no_Monogatari","image_url":"https://cdn.myanimelist.net/images/anime/10/82374.jpg?s=b31e227e890c15534a05819d881426fe","title":"Mutsugo to Ouma no Monogatari"},{"mal_id":37277,"url":"https://myanimelist.net/anime/37277/Beatless_Intermission","image_url":"https://cdn.myanimelist.net/images/anime/1709/90468.jpg?s=ec76696930b074eb49a21cfaa607a2a6","title":"Beatless Intermission"},{"mal_id":5682,"url":"https://myanimelist.net/anime/5682/Phantom__Requiem_for_the_Phantom","image_url":"https://cdn.myanimelist.net/images/anime/8/22470.jpg?s=9c291938aeadd872feac14621d5b11e8","title":"Phantom: Requiem for the Phantom"},{"mal_id":3759,"url":"https://myanimelist.net/anime/3759/School_Days__Valentine_Days","image_url":"https://cdn.myanimelist.net/images/anime/4/21483.jpg?s=fc79afe3cc0e5197f467adcb420b0467","title":"School Days: Valentine Days"},{"mal_id":1143,"url":"https://myanimelist.net/anime/1143/hack__Intermezzo","image_url":"https://cdn.myanimelist.net/images/anime/12/66499.jpg?s=2ba754c2e7a617e4fc6fa5f95d7421fe","title":".hack//Intermezzo"},{"mal_id":34818,"url":"https://myanimelist.net/anime/34818/Sakura_Internet","image_url":"https://cdn.myanimelist.net/images/anime/8/84025.jpg?s=5f19024a82e502fadb589eaea1a56c02","title":"Sakura Internet"},{"mal_id":40272,"url":"https://myanimelist.net/anime/40272/A3_Season_Autumn___Winter","image_url":"https://cdn.myanimelist.net/images/anime/1049/108197.jpg?s=f74763942434d27422453beda5364c24","title":"A3! Season Autumn & Winter"}],
      selectedAnime: {"mal_id":38101,"url":"https://myanimelist.net/anime/38101/5-toubun_no_Hanayome","image_url":"https://cdn.myanimelist.net/images/anime/1819/97947.jpg","title":"5-toubun no Hanayome","title_english":"The Quintessential Quintuplets","score":7.57,"scored_by":190793,"rank":1370,"popularity":355},
      error: false
    }
  }

  handleSearchAction = (title) => {
    fetch("http://localhost:10000/search?limit=20&title=" + encodeURI(title))
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
          <Flex container margin="10px auto" justifyContent="space-around" flexWrap="wrap">
              {animes.map(anime => (
                  <SearchResult malId={anime.mal_id}
                    title={anime.title}
                    url={anime.url}
                    imageUrl={anime.image_url}
                    onClick={malId => this.handleAnimeSelected(malId)} />
              ))}
            </Flex>
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
    </div>
  )
}

function AnimeResult(props) {
  console.log('props.malId: ' + props.malId);
  if (props.malId !== undefined) {
    return (
      <Flex container flexDirection="column" alignItems="flex-start" alignItems="center">
        <h1>{props.title}</h1>
        <img src={props.imageUrl} alt=""></img>
        <p>Score: {props.score}</p>
        <p>ScoredBy: {props.scoredBy}</p>
        <p>Rank: {props.rank}</p>
        <p>Popularity: {props.popularity}</p>        
      </Flex>
    )
  } else {
    return null;
  }

}

export default Search;