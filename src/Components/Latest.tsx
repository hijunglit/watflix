import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, getLatestMovie } from "../api";
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

interface IGetLatestMovie {
  id: number;
  title: string;
  backdrop_path?: string;
}

const offset = 6;
function Latest() {
  const history = useNavigate();
  const { data: latestMovie, isLoading: latestLoading } =
    useQuery<IGetLatestMovie>({
      queryKey: ["movies", "latest"],
      queryFn: getLatestMovie,
    });
  console.log(latestMovie, latestLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history(`movies/${movieId}`);
  };
  return (
    <Wrapper>
      <h3 style={{ fontSize: "48px" }}>Latest</h3>
      <Row
        variants={rowVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        transition={{ type: "tween", duration: 1 }}
        key={index}
      >
        {latestMovie ? (
          <Box
            layoutId={latestMovie.id + ""}
            whileHover='hover'
            initial='normal'
            variants={boxVariants}
            onClick={() => onBoxClicked(latestMovie.id)}
            transition={{ type: "tween" }}
            key={latestMovie.id}
            $bgphoto={makeImagePath(latestMovie.backdrop_path!, "w500")}
          >
            <Info variants={infoVariants}>
              <h4>{latestMovie.title}</h4>
            </Info>
          </Box>
        ) : null}
      </Row>
    </Wrapper>
  );
}

export default Latest;
