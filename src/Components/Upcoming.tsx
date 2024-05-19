import { motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult, getUpcomingMovie } from "../api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  position: relative;
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

function Upcoming() {
  const history = useNavigate();
  const { data: upComingMovies, isLoading: upComingLoading } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "upcoming"],
      queryFn: getUpcomingMovie,
    });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history(`${process.env.PUBLIC_URL}/movies/${movieId}`);
  };
  const totalMovies = upComingMovies!?.results.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const paginate = (newDirection: number) => {
    if (upComingMovies) {
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
  return (
    <Wrapper>
      <h3 style={{ fontSize: "48px" }}>Upcoming</h3>
      <Row
        variants={rowVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        transition={{ type: "tween", duration: 1 }}
        key={index}
      >
        {upComingMovies?.results
          .slice(offset * index, offset * index + offset)
          .map((movie) => (
            <Box
              layoutId={movie.id + ""}
              whileHover='hover'
              initial='normal'
              variants={boxVariants}
              onClick={() => onBoxClicked(movie.id)}
              transition={{ type: "tween" }}
              key={movie.id}
              $bgphoto={makeImagePath(movie.backdrop_path || "", "w500")}
            >
              <Info variants={infoVariants}>
                <h4>{movie.title}</h4>
              </Info>
            </Box>
          ))}
      </Row>
      <div
        style={{
          display: index === maxIndex ? "none" : "flex",
        }}
        key={"next"}
        className='next'
        onClick={() => paginate(1)}
      >
        {"‣"}
      </div>
      <div
        style={{ display: index === 0 ? "none" : "flex" }}
        key={"prev"}
        className='prev'
        onClick={() => paginate(-1)}
      >
        {"‣"}
      </div>
    </Wrapper>
  );
}

export default Upcoming;
