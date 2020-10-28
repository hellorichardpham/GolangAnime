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
      mainCharacters: [],//[[{"mal_id":22036,"url":"https://myanimelist.net/character/22036/Koyomi_Araragi","image_url":"https://cdn.myanimelist.net/images/characters/3/148437.jpg?s=a27e0ce09629b02ba805851144b293bc","name":"Araragi, Koyomi","role":"Main","voice_actors":[{"mal_id":118,"url":"https://myanimelist.net/people/118/Hiroshi_Kamiya","name":"Kamiya, Hiroshi","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/58597.jpg?s=978bccc029734beb83af898ad976a3f1","language":"Japanese"},{"mal_id":6499,"url":"https://myanimelist.net/people/6499/Yeong_Seon_Kim","name":"Kim, Yeong Seon","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/3397.jpg?s=71b6163ba268592e939307c4e235beee","language":"Korean"},{"mal_id":41199,"url":"https://myanimelist.net/people/41199/Damien_Hartmann","name":"Hartmann, Damien","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/44161.jpg?s=4482656c9c00f42afc8ad03c7aa69caa","language":"French"},{"mal_id":6105,"url":"https://myanimelist.net/people/6105/David_Turba","name":"Turba, David","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/5817.jpg?s=00ad502d58f447f8995f88014c2d43f1","language":"German"}]},{"mal_id":22052,"url":"https://myanimelist.net/character/22052/Mayoi_Hachikuji","image_url":"https://cdn.myanimelist.net/images/characters/5/222381.jpg?s=e40a519ff947d20d148eb6647784edc9","name":"Hachikuji, Mayoi","role":"Main","voice_actors":[{"mal_id":52,"url":"https://myanimelist.net/people/52/Emiri_Katou","name":"Katou, Emiri","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/12722.jpg?s=124fe003902c04dabc998315e077c57d","language":"Japanese"},{"mal_id":14929,"url":"https://myanimelist.net/people/14929/Seo_Yeong_Kim","name":"Kim, Seo Yeong","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/15629.jpg?s=8187660ee3e9437c5d4e7a34383dfbad","language":"Korean"},{"mal_id":5681,"url":"https://myanimelist.net/people/5681/Isabelle_Volpe","name":"Volpe, Isabelle","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/22469.jpg?s=230d61753ab4e2abd65285a7b6e04be5","language":"French"},{"mal_id":31345,"url":"https://myanimelist.net/people/31345/Jodie_Blank","name":"Blank, Jodie","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/32587.jpg?s=d82da64c11927e0c93e4c0495d90e0d2","language":"German"}]},{"mal_id":22055,"url":"https://myanimelist.net/character/22055/Tsubasa_Hanekawa","image_url":"https://cdn.myanimelist.net/images/characters/7/105363.jpg?s=eac5e68c03b8043cb8f4bb5d6d2a9714","name":"Hanekawa, Tsubasa","role":"Main","voice_actors":[{"mal_id":28,"url":"https://myanimelist.net/people/28/Yui_Horie","name":"Horie, Yui","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/55669.jpg?s=39478d5431fa2c866735de2586e2c6b1","language":"Japanese"},{"mal_id":15245,"url":"https://myanimelist.net/people/15245/So_Eun_Lee","name":"Lee, So Eun","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/16365.jpg?s=52c29226cd93b2844749070e6ccd7703","language":"Korean"},{"mal_id":23661,"url":"https://myanimelist.net/people/23661/Kristina_Tietz","name":"Tietz, Kristina","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/26439.jpg?s=7f94d02474a49fd8b60acdb6f83ed544","language":"German"},{"mal_id":25725,"url":"https://myanimelist.net/people/25725/Karl-Line_Heller","name":"Heller, Karl-Line","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/28017.jpg?s=5ee29d203853a2902de801403ddd77c3","language":"French"}]},{"mal_id":22054,"url":"https://myanimelist.net/character/22054/Suruga_Kanbaru","image_url":"https://cdn.myanimelist.net/images/characters/11/222449.jpg?s=fcba09cc6121ab45d1e59cf93621c569","name":"Kanbaru, Suruga","role":"Main","voice_actors":[{"mal_id":99,"url":"https://myanimelist.net/people/99/Miyuki_Sawashiro","name":"Sawashiro, Miyuki","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/54600.jpg?s=0a5cb995dd9e0413e62d82f887329c43","language":"Japanese"},{"mal_id":14921,"url":"https://myanimelist.net/people/14921/Seon_Yeong_Park","name":"Park, Seon Yeong","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/15621.jpg?s=21e657ced3842820cb13f2d711cf949f","language":"Korean"},{"mal_id":6106,"url":"https://myanimelist.net/people/6106/Rubina_Kuraoka","name":"Kuraoka, Rubina","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/5197.jpg?s=24f8e3a700e241cdc3041fcb45b8ce9f","language":"German"},{"mal_id":45707,"url":"https://myanimelist.net/people/45707/Dany_Benedito","name":"Benedito, Dany","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/49219.jpg?s=37d2adafbfb5af3df4470a2daceae87f","language":"French"}]},{"mal_id":22050,"url":"https://myanimelist.net/character/22050/Nadeko_Sengoku","image_url":"https://cdn.myanimelist.net/images/characters/2/264877.jpg?s=7dac0c29f3e5b4903d1a8b69913f49bb","name":"Sengoku, Nadeko","role":"Main","voice_actors":[{"mal_id":185,"url":"https://myanimelist.net/people/185/Kana_Hanazawa","name":"Hanazawa, Kana","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/57913.jpg?s=2b49be6c369051294f90ff2647f81a1a","language":"Japanese"},{"mal_id":8812,"url":"https://myanimelist.net/people/8812/Mi_Sook_Jeong","name":"Jeong, Mi Sook","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/25851.jpg?s=a42fcafff84dad905e956f19721bd419","language":"Korean"},{"mal_id":43769,"url":"https://myanimelist.net/people/43769/Samira_Jakobs","name":"Jakobs, Samira","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/47334.jpg?s=c6ebbdb68691f7e3bfcb1cf1c1b83c9b","language":"German"}]},{"mal_id":22037,"url":"https://myanimelist.net/character/22037/Hitagi_Senjougahara","image_url":"https://cdn.myanimelist.net/images/characters/11/287902.jpg?s=dafd19b1176fd8af094fd03f9a141a92","name":"Senjougahara, Hitagi","role":"Main","voice_actors":[{"mal_id":61,"url":"https://myanimelist.net/people/61/Chiwa_Saito","name":"Saito, Chiwa","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/44265.jpg?s=016d345e747a849f56987b33f8cdf259","language":"Japanese"},{"mal_id":14851,"url":"https://myanimelist.net/people/14851/Jeong_Mi_Bae","name":"Bae, Jeong Mi","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/15423.jpg?s=2ba0318e11585625719f8afcc25368d6","language":"Korean"},{"mal_id":32303,"url":"https://myanimelist.net/people/32303/Anja_Stadlober","name":"Stadlober, Anja","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/33295.jpg?s=baec78135844fa6be4684925d6a8bad4","language":"German"},{"mal_id":24243,"url":"https://myanimelist.net/people/24243/Jessica_Barrier","name":"Barrier, Jessica","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/26999.jpg?s=5fad9fc95a256efc44b087410e4e8d92","language":"French"}]}],[{"mal_id":161471,"url":"https://myanimelist.net/character/161471/Itsuki_Nakano","image_url":"https://cdn.myanimelist.net/images/characters/3/366720.jpg?s=f0eb73fb54864706ad9c717727f83302","name":"Nakano, Itsuki","role":"Main","voice_actors":[{"mal_id":11297,"url":"https://myanimelist.net/people/11297/Inori_Minase","name":"Minase, Inori","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/60752.jpg?s=3d164d388cb40a9d1e61ff190f041934","language":"Japanese"},{"mal_id":9526,"url":"https://myanimelist.net/people/9526/Tia_Ballard","name":"Ballard, Tia","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/24323.jpg?s=5e70ab7a22c401ccc0ad56b8619ab38c","language":"English"}]},{"mal_id":161472,"url":"https://myanimelist.net/character/161472/Nino_Nakano","image_url":"https://cdn.myanimelist.net/images/characters/5/366716.jpg?s=ba616ce70f36433cdf2a3cff9dfe2374","name":"Nakano, Nino","role":"Main","voice_actors":[{"mal_id":6996,"url":"https://myanimelist.net/people/6996/Ayana_Taketatsu","name":"Taketatsu, Ayana","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/54669.jpg?s=be5279ce59db05ccc9c11041b10245fc","language":"Japanese"},{"mal_id":41966,"url":"https://myanimelist.net/people/41966/Jill_Harris","name":"Harris, Jill","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/43821.jpg?s=8610b4cfc43832af5a4693ba65aea62d","language":"English"}]},{"mal_id":161470,"url":"https://myanimelist.net/character/161470/Ichika_Nakano","image_url":"https://cdn.myanimelist.net/images/characters/16/378953.jpg?s=af7d0083796b6388f66dddced2611915","name":"Nakano, Ichika","role":"Main","voice_actors":[{"mal_id":185,"url":"https://myanimelist.net/people/185/Kana_Hanazawa","name":"Hanazawa, Kana","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/57913.jpg?s=2b49be6c369051294f90ff2647f81a1a","language":"Japanese"},{"mal_id":10881,"url":"https://myanimelist.net/people/10881/Lindsay_Seidel","name":"Seidel, Lindsay","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/12459.jpg?s=1376b36c0b195dcbc7986717bd0f0ed6","language":"English"},{"mal_id":31635,"url":"https://myanimelist.net/people/31635/Alex_Moore","name":"Moore, Alex","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/32595.jpg?s=6acea9fba654078ce975f378e5b254c8","language":"English"}]},{"mal_id":161469,"url":"https://myanimelist.net/character/161469/Yotsuba_Nakano","image_url":"https://cdn.myanimelist.net/images/characters/5/366719.jpg?s=22d1d39b0b605f74d0c68c27836a6681","name":"Nakano, Yotsuba","role":"Main","voice_actors":[{"mal_id":11622,"url":"https://myanimelist.net/people/11622/Ayane_Sakura","name":"Sakura, Ayane","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/60754.jpg?s=88f9ceb4d14e62b53aeae670cc52f087","language":"Japanese"},{"mal_id":30379,"url":"https://myanimelist.net/people/30379/Bryn_Apprill","name":"Apprill, Bryn","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/40982.jpg?s=bb21d44d2c56d482fc1b20c14057499e","language":"English"}]},{"mal_id":160603,"url":"https://myanimelist.net/character/160603/Miku_Nakano","image_url":"https://cdn.myanimelist.net/images/characters/11/366718.jpg?s=9986132cecb64c17d732825e625fae2c","name":"Nakano, Miku","role":"Main","voice_actors":[{"mal_id":24413,"url":"https://myanimelist.net/people/24413/Miku_Itou","name":"Itou, Miku","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/58504.jpg?s=7b0975db9a9c7c4f52f7e1492abcb11f","language":"Japanese"},{"mal_id":23445,"url":"https://myanimelist.net/people/23445/Felecia_Angelle","name":"Angelle, Felecia","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/33289.jpg?s=1adc732be874310a60af56b20f52536e","language":"English"}]},{"mal_id":159332,"url":"https://myanimelist.net/character/159332/Fuutarou_Uesugi","image_url":"https://cdn.myanimelist.net/images/characters/8/366714.jpg?s=4184c6ef2639ee1867954c4d4af22b31","name":"Uesugi, Fuutarou","role":"Main","voice_actors":[{"mal_id":11817,"url":"https://myanimelist.net/people/11817/Yoshitsugu_Matsuoka","name":"Matsuoka, Yoshitsugu","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/40132.jpg?s=1c7f44d53fe3c1641b79ca5104dd7caa","language":"Japanese"},{"mal_id":1047,"url":"https://myanimelist.net/people/1047/Josh_Grelle","name":"Grelle, Josh","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/29709.jpg?s=78350ef97aa8e9fd394d803c2937f3c9","language":"English"}]}]],
      persons: [],//[[{"mal_id":118,"url":"https://myanimelist.net/people/118/Hiroshi_Kamiya","name":"Hiroshi Kamiya","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/58597.jpg","language":"","member_favorites":79303},{"mal_id":52,"url":"https://myanimelist.net/people/52/Emiri_Katou","name":"Emiri Katou","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/12722.jpg","language":"","member_favorites":2207},{"mal_id":28,"url":"https://myanimelist.net/people/28/Yui_Horie","name":"Yui Horie","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/55669.jpg","language":"","member_favorites":15048},{"mal_id":99,"url":"https://myanimelist.net/people/99/Miyuki_Sawashiro","name":"Miyuki Sawashiro","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/54600.jpg","language":"","member_favorites":37046},{"mal_id":185,"url":"https://myanimelist.net/people/185/Kana_Hanazawa","name":"Kana Hanazawa","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/57913.jpg","language":"","member_favorites":86443},{"mal_id":61,"url":"https://myanimelist.net/people/61/Chiwa_Saito","name":"Chiwa Saito","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/44265.jpg","language":"","member_favorites":10553}],[{"mal_id":11297,"url":"https://myanimelist.net/people/11297/Inori_Minase","name":"Inori Minase","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/60752.jpg","language":"","member_favorites":14294},{"mal_id":6996,"url":"https://myanimelist.net/people/6996/Ayana_Taketatsu","name":"Ayana Taketatsu","image_url":"https://cdn.myanimelist.net/images/voiceactors/1/54669.jpg","language":"","member_favorites":7827},{"mal_id":185,"url":"https://myanimelist.net/people/185/Kana_Hanazawa","name":"Kana Hanazawa","image_url":"https://cdn.myanimelist.net/images/voiceactors/3/57913.jpg","language":"","member_favorites":86443},{"mal_id":11622,"url":"https://myanimelist.net/people/11622/Ayane_Sakura","name":"Ayane Sakura","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/60754.jpg","language":"","member_favorites":10848},{"mal_id":24413,"url":"https://myanimelist.net/people/24413/Miku_Itou","name":"Miku Itou","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/58504.jpg","language":"","member_favorites":1688},{"mal_id":11817,"url":"https://myanimelist.net/people/11817/Yoshitsugu_Matsuoka","name":"Yoshitsugu Matsuoka","image_url":"https://cdn.myanimelist.net/images/voiceactors/2/40132.jpg","language":"","member_favorites":28883}]],
      error: false,
      numSelected: 0,
    }
    this.addVoiceActor = this.addVoiceActor.bind(this);
    this.handleComparisonV2 = this.handleComparisonV2.bind(this);
    this.handleAnimeSelected = this.handleAnimeSelected.bind(this);
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
    this.numSelected++;
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
    console.log('I am in handle comparison this is where I need to be.')
    if (mainCharacter.length > 0) {
      var urls = [];
      mainCharacter.forEach(function (character) {
        var characterVoiceActors = character.voice_actors[0];
        var url = 'http://localhost:10000/thisisatest/' + characterVoiceActors.mal_id;
        urls.push(url);
      })
      console.log('i am here')
      var response = this.requestAllWithDelay(urls, 200).then(
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

  handleComparisonV2 = () => {
    if (this.state.mainCharacters.length > 0) {
      var urls = [];
      let delay = 2000;
      this.state.mainCharacters.forEach(function (mainCharacter) {
        mainCharacter.forEach(function (character) {
          var characterVoiceActors = character.voice_actors[0];
          var url = 'http://localhost:10000/thisisatest/' + characterVoiceActors.mal_id;
          urls.push(url);
        })
      })
      var response = this.requestAllWithDelay(urls, 200).then(
        (response) => {
          this.setState(prevState => ({
            persons: [...prevState.persons, response]
          }))
          // console.log('response: ' + response);
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
    console.log('hello')
    let content = [];
    if (mainCharacters.length == persons.length) {
      console.log('mainCharacters: ' + JSON.stringify(mainCharacters));
      console.log('persons: ' + JSON.stringify(persons));
      var i, j;
      //mainCharacters is an array of arrays. For now just grab the first
      for (i = 0; i < mainCharacters.length; i++) {
        console.log('mainCharacters.length: ' + mainCharacters.length + ' persons.length: ' + persons.length);
        for (j = 0; j < mainCharacters[i].length; j++) {
          console.log('mainCharacters[i].length: ' + mainCharacters[i].length + ' persons[i].length: ' + persons[i].length);
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
          <input type="submit" value="comparison" onClick={this.handleComparisonV2} />
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