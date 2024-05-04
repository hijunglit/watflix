const API_KEY = "17048dc01f87f281be6e07ca6f6cb5e5";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number,
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}
export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    const url = `${BASE_PATH}/movie/now_playing?language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzA0OGRjMDFmODdmMjgxYmU2ZTA3Y2E2ZjZjYjVlNSIsInN1YiI6IjY2MjNkNjAyMjIxYmE2MDE3YzEzMWNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeEU3X9NugNxiq77niIGMn2LYps54JeUoPtAmnXuvcg'
        }
    }
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}