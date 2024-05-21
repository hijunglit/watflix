import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { IGetMoviesResult, searchMovies } from "../api";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

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
  backgroundcolor: white;
  height: 200px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgphoto});
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
function Search() {
  const history = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const { data: movieResults, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["Search"],
    queryFn: () => searchMovies(keyword as string),
  });
  console.log(movieResults);
  const onBoxClicked = (movieId: number) => {
    history(`movies/${movieId}`);
  };
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
              />
            ))}
          </ResultsContainer>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
