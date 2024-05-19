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
  const { data: latest, isLoading: latestLoading } = useQuery({
    queryKey: ["movies", "latest"],
    queryFn: getLatestMovie,
  });
  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "topRated"],
      queryFn: getTopRatedMovie,
    });
  const { data: upcoming, isLoading: upComingLoading } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "upcoming"],
      queryFn: getUpcomingMovie,
    });
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
  const data = nowPlaying || latest || topRated || upcoming;
  const isLoading =
    nowPlayingLoading || latestLoading || topRatedLoading || upComingLoading;
  const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onOverlayClick = () => history("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowPlaying?.results.find(
      // https://velog.io/@adguy/TypeScript-possibly-undefined-value-%ED%95%B4%EA%B2%B0-%ED%95%98%EB%8A%94-%EB%B2%95
      (movie) => movie.id === +bigMovieMatch.params.movieId!
    );
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
              {nowPlaying ? <NowPlaying key={"nowPlaying"} /> : null}
              {topRated ? <TopRated key={"topRated"} /> : null}
              {upcoming ? <Upcoming key={"upComing"} /> : null}
              {latest ? <Latest key={"latest"} /> : null}
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
