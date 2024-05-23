import { useQuery } from "@tanstack/react-query";
import {
  IGetMoviesResult,
  IGetTvsResult,
  getOnTheAirTvs,
  getPopularTvs,
  getTopRatedTvs,
  getTvs,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Carousel from "react-multi-carousel";

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
const SliderRow = styled(motion.div)`
  position: relative;
`;
const Category = styled.h3`
  font-size: 48px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ $bgphoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgphoto});
  background-position: center;
  background-size: cover;
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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigTv = styled(motion.div)`
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
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
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
// Multi Caroucel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
    slidesToSlide: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
function Tv() {
  const history = useNavigate();
  const useMultipleQuery = () => {
    const airingToday = useQuery<IGetTvsResult>({
      queryKey: ["airingToday"],
      queryFn: getTvs,
    });
    const onTheAir = useQuery<IGetTvsResult>({
      queryKey: ["onTheAir", "tv"],
      queryFn: getOnTheAirTvs,
    });
    const popular = useQuery<IGetTvsResult>({
      queryKey: ["popular", "tv"],
      queryFn: getPopularTvs,
    });
    const topRated = useQuery<IGetTvsResult>({
      queryKey: ["topRated", "tv"],
      queryFn: getTopRatedTvs,
    });
    return [airingToday, onTheAir, popular, topRated];
  };
  const [
    { data: airingToday, isLoading: loadingAiringToday },
    { data: onTheAir, isLoading: loadingOnTheAir },
    { data: popular, isLoading: loadingPopular },
    { data: topRated, isLoading: loadingTopRated },
  ] = useMultipleQuery();
  const isLoading =
    loadingAiringToday || loadingOnTheAir || loadingPopular || loadingTopRated;
  const allTvs = airingToday?.results.concat(
    onTheAir?.results as any,
    popular?.results as any,
    topRated?.results as any
  );
  const { scrollY } = useScroll();
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const bigTvMatch = useMatch(process.env.PUBLIC_URL + "/tv/:tvId");
  console.log(bigTvMatch);
  const onBoxClicked = (tvId: number) => {
    history(`${process.env.PUBLIC_URL}/tv/${tvId}`);
  };
  const onOverlayClick = () => history(process.env.PUBLIC_URL + "/tv");
  const clickedTv =
    bigTvMatch?.params.tvId &&
    allTvs?.find((tv) => tv.id === +bigTvMatch.params.tvId!);
  console.log(clickedTv);
  console.log(allTvs);
  return (
    <Wrapper>
      {isLoading ? (
        <ClipLoader
          loading={isLoading}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        ></ClipLoader>
      ) : (
        <>
          <Banner
            $bgphoto={makeImagePath(
              airingToday?.results[0].backdrop_path || ""
            )}
          >
            <Title>{airingToday?.results[0].name}</Title>
            <Overview>{airingToday?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <SliderRow key='airingToday'>
                <Category style={{ fontSize: "48px" }}>Airing today</Category>
                <Carousel
                  responsive={responsive}
                  showDots={true}
                  containerClass='slider-container'
                  itemClass='slider-item'
                >
                  {airingToday?.results.slice(1).map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      variants={boxVariants}
                      whileHover='hover'
                      initial='normal'
                      onClick={() => onBoxClicked(tv.id)}
                      transition={{ type: "tween" }}
                      key={tv.id}
                      $bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
                </Carousel>
              </SliderRow>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigTv
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigTvMatch.params.tvId}
                >
                  {clickedTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedTv.name}</BigTitle>
                      <BigOverview>{clickedTv.overview}</BigOverview>
                    </>
                  )}
                </BigTv>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
