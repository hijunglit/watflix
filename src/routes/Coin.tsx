import { Route, Routes, useLocation, useParams, Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";

const Loading = styled.h1``;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.textColor}
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  color: #f5f6fa;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: #f5f6fa;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0;
  gap: 10px;
  margin-top: 10px;
`;
const Tab = styled.span<{isactive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  border-radius: 10px;
  padding: 7px 0;
  background: rgba(0, 0, 0, 0.5);
  a {
    display: block;
    color: ${props => props.isactive ? props.theme.textColor : "#f5f6fa"};
  }
`

function Coin() {
    const location  = useLocation();
    let { coinId } = useParams<string>();
    let state = location.state as {name: string};
    const matchPrice = useMatch("/:coinId/price");
    const matchChart = useMatch("/:coinId/chart");

    const { isLoading: infoLoading, data: infoData } = useQuery({
      queryKey: ['info', coinId],
      queryFn: () => fetchCoinInfo(coinId as string),
    })
    const { isLoading: infoPrice, data: priceData } = useQuery({
      queryKey: ['price', coinId],
      queryFn: () => fetchCoinPrice(coinId as string),
    })
    const loading = infoLoading || infoPrice;
    // const [loading, setLoading] = useState<boolean>(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [price, setPrice] = useState<PriceData>();
    // useEffect(() => {
    //   (async() => {
    //     const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //     const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //     setInfo(infoData);
    //     setPrice(priceData);
    //     setLoading(false)
    //   })()
    // }, [coinId]);

    return (
        <Container>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.}</Title>
            </Header>
            {loading ? <Loading>Loading...</Loading> : (
              <>
              <Overview>
                <OverviewItem>
                  <span>rank:</span>
                  <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>symbol:</span>
                  <span>{info?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>open source:</span>
                  <span>{info?.open_source? "TRUE" : "FALSE"}</span>
                </OverviewItem>
              </Overview>
              <Description>{info?.description}</Description>
              <Overview>
                <OverviewItem>
                  <span>total supply</span>
                  <span>{price?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>max supply</span>
                  <span>{price?.total_supply}</span>
                </OverviewItem>
              </Overview>
              <Tabs>
                <Tab isactive={matchPrice !== null}>
                  <Link to={`/${coinId}/price`}>price</Link>
                </Tab>
                <Tab isactive={matchChart !== null}>
                  <Link to={`/${coinId}/chart`}>chart</Link>
                </Tab>
              </Tabs>
              <Routes>
                <Route path="price" element={<Price />}/>
                <Route path="chart" element={<Chart />} />
              </Routes>
              </>
            )}
        </Container>
    )
}

export default Coin;