import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string,
}

interface Historical {
    time_open:number,
    time_close:number,
    open:string,
    high:string,
    low:string,
    close:string,
    volume:string,
    market_cap:string,
}
function Chart({ coinId }:ChartProps) {
    const {isLoading, data} = useQuery<Historical[]>({
        queryKey:['ohlcv', coinId],
        queryFn: () => fetchCoinHistory(coinId),
    })

    return (
        <div>
          {isLoading ? (
            "Loading chart..."
          ) : (
            <ApexChart
              type="candlestick"
              series={[
               {
                 data:
                  data?.map((price) => ({
                    x: price.time_open,
                    y:[price.close, price.open, price.low, price.high],
                  })) ?? []
               }
              ]}
              options={{
                theme:{
                  mode: "light",
                },
                chart: {
                  height: 350,
                  toolbar: {
                    show:false,
                  }
                },
                xaxis: {
                  type: 'datetime',
                  labels: {
                    show: false,
                  }
                },
                yaxis: {
                  show:false,
                  labels: {
                    show: false
                  },
                  tooltip: {
                    enabled: true
                  }
                },
                grid: {show: false},
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: '#00B746',
                      downward: '#EF403C'
                    },
                    wick: {
                      useFillColor: true
                    }
                  }
                },
              }}
            />
          )}
        </div>
      );
}

export default Chart;