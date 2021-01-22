import Container from '../components/container';
import AnimesList from '../components/animes';
import getAnimes from './api/animeApis';
import fetch from 'isomorphic-fetch';
import { useEffect, useState } from 'react';

const Anime = (props) => {
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [valueToSearch, setValueToSearch] = useState('');

  useEffect(() => {
    setFavorites(props.favoriteList);
    setList(props.animes);
  }, [valueToSearch]);

  async function addToFavorites(anime) {
    let newAnimeFavorite = {
      idAnime: favorites.length + 1,
      image_url: anime.image_url,
      title: anime.title
    };

    // if you are localy this is the fetch http://localhost:3000/api/animeRequests
    await fetch('https://nextjsanime.herokuapp.com/api/animeRequests', {
      method: 'post',
      body: JSON.stringify(newAnimeFavorite)
    });
    
    let newFavoritesArray = [...favorites, newAnimeFavorite];
    setFavorites(newFavoritesArray);
  }

  async function deleteFavotires(anime) {
    
    // if you are localy this is the fetch http://localhost:3000/api/animeRequests
    await fetch('https://nextjsanime.herokuapp.com/api/animeRequests', {
      method: 'delete',
      body: JSON.stringify(anime)
    });
    let newFavoritesArray = [];
    for(let i=0;i<favorites.length;i++){
      if(favorites[i].idAnime != anime.idAnime) newFavoritesArray.push(favorites[i]);
    }
    setFavorites(newFavoritesArray);
  }

  async function searchValue(text) {
    let newSearch = await getAnimes(text);
    if(newSearch){
      setList([]);
      setList(newSearch);
    }
  }

  return (
    <>
      <Container searchValue={searchValue} value={props.valueToSearch} search="true">
        <main>
          <h2>Anime</h2>
          <AnimesList animes={list} text="Add to Favorites" favorites={addToFavorites} />
          <h2 className="pt-2">Favorites</h2>
          <AnimesList animes={favorites} text="Delete from Favorites" favorites={deleteFavotires} />
        </main>
      </Container>
    </>
  );
};
Anime.getInitialProps = async (ctx) => {
  const resJson = await getAnimes('Dragon Ball');

  // if you are localy this is the fetch http://localhost:3000/api/animeRequests
  const favorites = await fetch('https://nextjsanime.herokuapp.com/api/animeRequests');
  const favoritesJson = await favorites.json();

  return { animes:resJson, favoriteList: favoritesJson }
};

export default Anime;