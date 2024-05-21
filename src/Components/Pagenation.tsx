import { useState } from "react";
import { IGetMoviesResult } from "../api";

function Pagenation() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return <></>;
}

export default Pagenation;
