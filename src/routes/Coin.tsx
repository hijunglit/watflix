import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { Statement } from "typescript";

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
const Loading = styled.h1``;

function Coin() {
    const location  = useLocation();
    const [loading, setLoading] = useState(true);
    let { coinId } = useParams<string>();
    let state = location.state as {name: string};
    // console.log(state);
    // console.log(coinId);
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? <Loading>Loading...</Loading> : null}
        </Container>
    )
}

export default Coin;