import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
const CoinList = styled.ul``;
const Coin = styled.li`
  background: #fff;
  color: ${props => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: all 0.2s ease-in;
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    a {
        color: ${props => props.theme.btnColor};
    }
}
`;
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`
const Loading = styled.h1``;

interface CoinInterface {
    id: string,
    is_active: boolean,
    is_new: boolean,
    name: string,
    rank: number,
    symbol: string,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 20));
            setLoading(false);
        })()
    }, []);
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
                {loading ? <Loading>Loading...</Loading>: (
                    <CoinList>
                        {coins.map((item) => (
                            <Coin key={item.id}>
                                <Link to={item.id} state={{id:item.id, name: item.name}}>
                                    <Img src="https://cryptoicon-api.pages.dev/api/icon/btc" />
                                    {item.name}
                                </Link>
                            </Coin>
                        ))}
                    </CoinList>
                )}
        </Container>
    )
}

export default Coins;