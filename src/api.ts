import { error } from "console";

const API_KEY = "17048dc01f87f281be6e07ca6f6cb5e5";
const API_ACCESS = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzA0OGRjMDFmODdmMjgxYmU2ZTA3Y2E2ZjZjYjVlNSIsInN1YiI6IjY2MjNkNjAyMjIxYmE2MDE3YzEzMWNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeEU3X9NugNxiq77niIGMn2LYps54JeUoPtAmnXuvcg"
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number,
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}
export interface IGetMoviesResult {
    dates?: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
interface ITv {
    id: number,
    backdrop_path: string,
    poster_path: string,
    name: string,
    overview: string
}
export interface IGetTvsResult {
    page: number,
    results: ITv[],
    total_pages: number,
    total_results: number,
}

export async function getMovies() {
    const url = `${BASE_PATH}/movie/now_playing?language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_ACCESS}`
        }
    }
    return await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}
export async function getPopularMovie() {
    const url = `${BASE_PATH}/movie/popular?language=en-US&page=1`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS}`
        }
      };
      return await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err))
}

export async function getTvs() {
    const url = `${BASE_PATH}//tv/airing_today?language=en-US&page=1`
    const options = {
        method:'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_ACCESS}`
        }
    }
    return await fetch(url, options).then(res => res.json()).catch(err => console.error('error:' + err))
}