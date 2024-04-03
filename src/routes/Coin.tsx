import { 
  Route, 
  Routes, 
  useLocation, 
  useParams, 
  Link, 
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api"; 
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Loading = styled.h1``;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 80px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
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
const Tab = styled.span<{$isactive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  border-radius: 10px;
  padding: 7px 0;
  background: rgba(0, 0, 0, 0.5);
  a {
    display: block;
    color: ${props => props.$isactive ? props.theme.textColor : "#f5f6fa"};
  }
`

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
id:string;
name:string;
symbol:string;
rank:number;
total_supply:number;
max_supply:number;
beta_value:number;
first_data_at:string;
last_updated:string;
quotes:{
  USD: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  }
};
}

function Coin() {
    const navigate = useNavigate();
    const location  = useLocation();
    let { coinId } = useParams();
    let state = location.state as {name: string};
    const matchPrice = useMatch("/:coinId/price");
    const matchChart = useMatch("/:coinId/chart");

    const gobackBtn = () => {
      navigate(-1);
    }

    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>({
      queryKey: ['info', coinId],
      queryFn: () => (fetchCoinInfo(coinId)),
    })
    const {isLoading: priceLoading, data: priceData} = useQuery<PriceData>({
      queryKey: ['price', coinId],
      queryFn: () => (fetchCoinPrice(coinId)),
    })
    const loading = infoLoading || priceLoading;

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
          <Helmet>
            <title>{coinId}</title>
          </Helmet>
            <Header>
                <FontAwesomeIcon icon={faChevronLeft} onClick={gobackBtn} />
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
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
                  <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>open source:</span>
                  <span>{infoData?.open_source? "TRUE" : "FALSE"}</span>
                </OverviewItem>
              </Overview>
              <Description>{infoData?.description}</Description>
              <Overview>
                <OverviewItem>
                  <span>total supply</span>
                  <span>{priceData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>max supply</span>
                  <span>{priceData?.total_supply}</span>
                </OverviewItem>
              </Overview>
              <Tabs>
                <Tab $isactive={matchChart !== null}>
                  <Link to={`/${coinId}/chart`}>chart</Link>
                </Tab>
                <Tab $isactive={matchPrice !== null}>
                  <Link to={`/${coinId}/price`} state={{priceData}}>price</Link>
                </Tab>
              </Tabs>
              <Routes>
                <Route path="chart" element={<Chart coinId={coinId as string} />} />
                <Route path="price" element={<Price coinId={coinId as string} />}/>
              </Routes>
              </>
            )}
        </Container>
    )
}

export default Coin;