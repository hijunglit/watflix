import { useQuery } from "@tanstack/react-query";
import { fetchCoinPrice } from "../api";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;
const PriceInfoBox = styled.div`
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
    color: #f5f6fa;
    text-align: center;
`;
const PriceTitle = styled.h4`
    font-weight: 700;
    margin-bottom: 8px;
`;
const PriceValue = styled.span`
    font-size: 0.75em;
`;

interface PriceProps {
    coinId: string
}

function Price({ coinId }: PriceProps) {
    let { 
        state: {
            priceData: {
                quotes: {USD}
            }
        } 
    } = useLocation();
    return (
        <Container>
            <PriceInfoBox>
                <PriceTitle>price</PriceTitle>
                <PriceValue>${USD.price.toFixed(2)}</PriceValue>
            </PriceInfoBox>
            <PriceInfoBox>
                <PriceTitle>past hour</PriceTitle>
                <PriceValue>{USD.percent_change_1h}%</PriceValue>
            </PriceInfoBox>
            <PriceInfoBox>
                <PriceTitle>past day</PriceTitle>
                <PriceValue>{USD.percent_change_24h}%</PriceValue>
            </PriceInfoBox>
            <PriceInfoBox>
                <PriceTitle>past week</PriceTitle>
                <PriceValue>{USD.percent_change_7d}%</PriceValue>
            </PriceInfoBox>
            <PriceInfoBox>
                <PriceTitle>past month</PriceTitle>
                <PriceValue>{USD.percent_change_30d}%</PriceValue>
            </PriceInfoBox>
            <PriceInfoBox>
                <PriceTitle>past year</PriceTitle>
                <PriceValue>{USD.percent_change_1y}%</PriceValue>
            </PriceInfoBox>
        </Container>
    )
}

export default Price;