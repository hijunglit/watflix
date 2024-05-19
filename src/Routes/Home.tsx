import { useQuery } from "@tanstack/react-query";
import {
  IGetMoviesResult,
  getLatestMovie,
  getMovies,
  getPopularMovie,
  getTopRatedMovie,
  getUpcomingMovie,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import NowPlaying from "../Components/NowPlaying";
import Latest from "../Components/Latest";
import TopRated from "../Components/TopRated";
import Upcoming from "../Components/Upcoming";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ $bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;
const Box = styled(motion.div)<{ $bgphoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
const rowVariants = {
  hidden: {
    x: window.outerWidth - 690,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 690,
  },
};
const boxVariants = {
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      type: "tween",
      duration: 0.1,
    },
  },
  normal: { scale: 1 },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;
function Home() {
  const [index, setIndex] = useState(0);
  const history = useNavigate();
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    });
  const useMultipleQuery = () => {
    const latest = useQuery<IGetMoviesResult>({
      queryKey: ["latest"],
      queryFn: getLatestMovie,
    });
    const topRated = useQuery<IGetMoviesResult>({
      queryKey: ["topRated"],
      queryFn: getTopRatedMovie,
    });
    const upComming = useQuery<IGetMoviesResult>({
      queryKey: ["upComming"],
      queryFn: getUpcomingMovie,
    });
    return [latest, topRated, upComming];
  };
  const [
    { data: latestMovie, isLoading: loadingLatest },
    { data: topRatedMovie, isLoading: loadingTopRated },
    { data: upCommingMovie, isLoading: loadingUpComming },
  ] = useMultipleQuery();
  const data = nowPlaying || latestMovie || topRatedMovie || upCommingMovie;
  const isLoading = loadingLatest || loadingTopRated || loadingUpComming;
  // const { data: latest, isLoading: latestLoading } = useQuery({
  //   queryKey: ["movies", "latest"],
  //   queryFn: getLatestMovie,
  // });
  // const { data: topRated, isLoading: topRatedLoading } =
  //   useQuery<IGetMoviesResult>({
  //     queryKey: ["movies", "topRated"],
  //     queryFn: getTopRatedMovie,
  //   });
  // const { data: upcoming, isLoading: upComingLoading } =
  //   useQuery<IGetMoviesResult>({
  //     queryKey: ["movies", "upcoming"],
  //     queryFn: getUpcomingMovie,
  //   });
  const onBoxClicked = (movieId: number) => {
    history(`movies/${movieId}`);
  };
  const totalMovies = nowPlaying!?.results.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const paginate = (newDirection: number) => {
    if (nowPlaying) {
      if (leaving) return;
      toggleLeaving();
      setIndex((prev) =>
        newDirection === 1
          ? prev === maxIndex
            ? 0
            : prev + 1
          : prev === 0
          ? 0
          : prev - 1
      );
    }
  };
  const bigMovieMatch = useMatch(process.env.PUBLIC_URL + "/movies/:movieId");
  console.log(bigMovieMatch);
  const { scrollY } = useScroll();
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onOverlayClick = () => history(process.env.PUBLIC_URL + "/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      // https://velog.io/@adguy/TypeScript-possibly-undefined-value-%ED%95%B4%EA%B2%B0-%ED%95%98%EB%8A%94-%EB%B2%95
      (movie) => movie.id === +bigMovieMatch.params.movieId!
    );
  console.log(clickedMovie);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgphoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <motion.div key='nowPlaying'>
                <h3>Now Playing</h3>
                <Row>
                  {nowPlaying?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        variants={boxVariants}
                        whileHover='hover'
                        initial='normal'
                        onClick={() => onBoxClicked(movie.id)}
                        transition={{ type: "tween" }}
                        key={movie.id}
                        $bgphoto={makeImagePath(
                          movie.backdrop_path || "",
                          "w500"
                        )}
                      />
                    ))}
                </Row>
                <div
                  style={{
                    display: index === maxIndex ? "none" : "flex",
                  }}
                  className='next'
                  key={index + "nowPlayingNext"}
                  onClick={() => paginate(1)}
                >
                  {"‣"}
                </div>
                <div
                  style={{ display: index === 0 ? "none" : "flex" }}
                  className='prev'
                  key={index + "nowPlayingPrev"}
                  onClick={() => paginate(-1)}
                >
                  {"‣"}
                </div>
              </motion.div>
              <motion.div key='topRated'>
                <h3>Top Rated</h3>
                <Row>
                  {topRatedMovie?.results
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        variants={boxVariants}
                        whileHover='hover'
                        initial='normal'
                        onClick={() => onBoxClicked(movie.id)}
                        transition={{ type: "tween" }}
                        key={movie.id}
                        $bgphoto={makeImagePath(
                          movie.backdrop_path || "",
                          "w500"
                        )}
                      />
                    ))}
                </Row>
                <div
                  style={{
                    display: index === maxIndex ? "none" : "flex",
                  }}
                  className='next'
                  key={index + "nowPlayingNext"}
                  onClick={() => paginate(1)}
                >
                  {"‣"}
                </div>
                <div
                  style={{ display: index === 0 ? "none" : "flex" }}
                  className='prev'
                  key={index + "nowPlayingPrev"}
                  onClick={() => paginate(-1)}
                >
                  {"‣"}
                </div>
              </motion.div>
              <motion.div key='upComming'>
                <h3>Upcomming</h3>
                <Row>
                  {upCommingMovie?.results
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        variants={boxVariants}
                        whileHover='hover'
                        initial='normal'
                        onClick={() => onBoxClicked(movie.id)}
                        transition={{ type: "tween" }}
                        key={movie.id}
                        $bgphoto={makeImagePath(
                          movie.backdrop_path || "",
                          "w500"
                        )}
                      />
                    ))}
                </Row>
                <div
                  style={{
                    display: index === maxIndex ? "none" : "flex",
                  }}
                  className='next'
                  key={index + "nowPlayingNext"}
                  onClick={() => paginate(1)}
                >
                  {"‣"}
                </div>
                <div
                  style={{ display: index === 0 ? "none" : "flex" }}
                  className='prev'
                  key={index + "nowPlayingPrev"}
                  onClick={() => paginate(-1)}
                >
                  {"‣"}
                </div>
              </motion.div>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
