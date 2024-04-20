
const API_KEY = "17048dc01f87f281be6e07ca6f6cb5e5";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}