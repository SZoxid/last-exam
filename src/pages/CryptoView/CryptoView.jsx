import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import Navbar from "../../components/Navbar/Navbar";

const CryptoView = ({ currency }) => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=30`
        );
        const data = await response.json();
        const prices = data.prices.map((price) => ({
          x: new Date(price[0]),
          y: price[1],
        }));

        setChartSeries([
          {
            name: `${coinId} Price (Past 30 Days)`,
            data: prices,
          },
        ]);

        setChartOptions({
          chart: {
            type: "line",
            height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            background: "#14161A",
          },
          grid: {
            borderColor: "#4B5563",
            strokeDashArray: 0,
          },
          stroke: {
            curve: "smooth",
            width: 3,
            colors: ["#00E396"],
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.7,
              opacityTo: 0.7,
              stops: [0, 100],
            },
          },
          xaxis: {
            type: "datetime",
            labels: {
              style: {
                colors: "#fff",
              },
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toFixed(2);
              },
              style: {
                colors: "#fff",
              },
            },
            title: {
              text: "Price",
              style: {
                color: "#fff",
              },
            },
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return val.toFixed(2);
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchCoinData();
    fetchChartData();
  }, [coinId, currency]);

  if (!coin || chartSeries.length === 0) {
    return <div>Loading...</div>;
  }

  const price =
    coin.market_data.current_price[currency] ||
    coin.market_data.current_price.usd;
  const marketCap =
    coin.market_data.market_cap[currency] || coin.market_data.market_cap.usd;

  const description =
    coin.description?.en?.split(".")[0] || "No description available.";

  return (
    <div className="w-full h-[750px] bg-[#14161A] text-white">
      <div className="w-[100%] shadow-lg">
        <Navbar />
      </div>
      <div className="w-[98%] flex justify-between m-auto mt-[25px]">
        <div className="w-[25%] border-r-2">
          <div className="flex justify-center mt-[20px]">
            <img
              src={coin.image.large}
              alt={coin.name}
              className="w-[100px] h-[100px]"
            />
          </div>
          <h2 className="text-[48px] font-bold text-center mt-[20px]">
            {coin.name}
          </h2>
          <div className="mt-[20px]">
            <p className="w-[330px] h-full text-left text-[14px] font-normal m-auto">
              {description}.
            </p>
            <div className="w-[330px] h-full text-left mt-[20px]  m-auto mr-[20px]">
              <span className="mb-[15px] text-[24px] font-bold flex gap-[20px]">
                Rank:{" "}
                <p className="text-[24px] font-normal">
                  {coin.market_cap_rank}
                </p>
              </span>
              <span className="mb-[15px] text-[24px] font-bold flex gap-[20px]">
                Current Price:{" "}
                <p className="text-[24px] font-normal gap-[20px]">{price}</p>
              </span>
              <span className="mb-[15px] text-[24px] font-bold flex gap-[20px]">
                Market Cap:{" "}
                <p className="text-[24px] font-normal gap-[20px]">
                  {marketCap}
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="w-[70%]">
          <div style={{ width: "100%", height: "400px", marginTop: "40px" }}>
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={350}
            />
          </div>
          <div className="flex justify-between mt-4 space-x-2">
            <button className="w-[285px] h-[40px] bg-[#1F2937] text-white py-2 px-4 rounded hover:bg-[#4B5563]">
              24 Hours
            </button>
            <button className="w-[285px] h-[40px] bg-[#1F2937] text-white py-2 px-4 rounded hover:bg-[#4B5563]">
              30 Days
            </button>
            <button className="w-[285px] h-[40px] bg-[#1F2937] text-white py-2 px-4 rounded hover:bg-[#4B5563]">
              3 Months
            </button>
            <button className="w-[285px] h-[40px] bg-[#1F2937] text-white py-2 px-4 rounded hover:bg-[#4B5563]">
              1 Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoView;
