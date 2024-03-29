import { useParams } from "react-router-dom";

function Coin() {
    let { coinId } = useParams();
    console.log(coinId);
    return <h1>Coin: {coinId}</h1>
}

export default Coin;