import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface chartProps {
    coinId: string,
}

interface historical {
    time_open:number,
    time_close:number,
    open:string,
    high:string,
    low:string,
    close:string,
    volume:string,
    market_cap:string,
}
function Chart({ coinId }:chartProps) {
    const {isLoading, data} = useQuery<historical[]>({
        queryKey:['ohlcv', coinId],
        queryFn: () => fetchCoinHistory(coinId)
    })

    return (
        <div>
          {isLoading ? (
            "Loading chart..."
          ) : (
            <ApexChart
              type="line"
              series={[
                {
                  name: "Price",
                  data: data?.map((price) => parseFloat(price.close)) ?? [],
                },
              ]}
              options={{
                theme: {
                  mode: "dark",
                },
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: {
                    show: false,
                  },
                  background: "transparent",
                },
                grid: { show: false },
                stroke: {
                  curve: "smooth",
                  width: 4,
                },
                yaxis: {
                  show: false,
                },
                xaxis: {
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                },
              }}
            />
          )}
        </div>
      );
}

export default Chart;