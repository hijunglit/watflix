interface IMovie {
    id: number,
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}
interface ITv {
    id: number,
    backdrop_path: string;
    poster_path: string;
    name: string;
    overview: string;
}
export interface IAllMovies {
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
export interface IGetTvResult {
    dates?: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: ITv[];
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

// https://api.themoviedb.org/3/movie/11?api_key=17048dc01f87f281be6e07ca6f6cb5e5
const API_KEY = "17048dc01f87f281be6e07ca6f6cb5e5";
const BASE_PATH = "https://api.themoviedb.org/3";

export async function getMovies() {
    return await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getTopRatedMovie() {
    return await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getUpcomingMovie() {
    return await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getLatestMovie() {
    return await fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getPopularMovie() {
    return await fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then((response) => response.json());
}
export async function searchMovies(keyword: string) {
    return await fetch(`${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}`).then((response) => response.json());
}
export async function getTvs() {
    return await fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getOnTheAirTvs() {
    return await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getPopularTvs() {
    return await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) => response.json());
}
export async function getTopRatedTvs() {
    return await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((response) => response.json());
}

