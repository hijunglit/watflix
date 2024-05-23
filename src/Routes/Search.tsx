import {
  matchMutation,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { IGetMoviesResult, searchMovies } from "../api";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { makeImagePath } from "../utils";
import { AnimatePresence, animate, motion, useScroll } from "framer-motion";

const Wrapper = styled.div`
  background: black;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  margin: 105px;
`;
const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
`;
const ResultsItem = styled(motion.div)<{ $bgphoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgphoto});
  background-position: center;
  &:last-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
  padding: 10px;
  opacity: 0;
  background-color: ${(props) => props.theme.black.lighter};
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
function Search() {
  const queryClient = useQueryClient();
  const history = useNavigate();
  const { scrollY } = useScroll();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: movieResults, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["Search"],
    queryFn: () => searchMovies(keyword as string),
  });
  // react query: mutate 설명
  // https://velog.io/@rookieand/react-query-%EC%9D%98-mutation%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90
  queryClient.invalidateQueries({ queryKey: ["Search"] });

  const onBoxClicked = (movieId: number) => {
    history(process.env.PUBLIC_URL + `/search/${movieId}?keyword=${keyword}`);
  };
  const bigMovieMatch = useMatch(process.env.PUBLIC_URL + "/search/:id");
  const clickedMovie =
    bigMovieMatch?.params.id &&
    movieResults?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.id!
    );
  const onOverlayClick = () =>
    history(process.env.PUBLIC_URL + `/search/?keyword=${keyword}`);
  return (
    <Wrapper>
      {isLoading ? (
        <ClipLoader
          loading={isLoading}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <>
          <Title>"{keyword}" 의 검색결과</Title>
          <ResultsContainer>
            {movieResults?.results.map((movie) => (
              <ResultsItem
                layoutId={movie.id + ""}
                variants={boxVariants}
                whileHover='hover'
                initial='normal'
                onClick={() => onBoxClicked(movie.id)}
                transition={{ type: "tween" }}
                key={movie.id}
                $bgphoto={makeImagePath(movie.backdrop_path || "", "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </ResultsItem>
            ))}
          </ResultsContainer>
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
                  layoutId={bigMovieMatch.params.id}
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
export default Search;
