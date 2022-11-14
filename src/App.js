import { useEffect, useState } from "react";
import { Chart } from "./components/Chart";
import "./styles.css";

const checkCurrency = (currency) => {
  console.log(currency);
  let colour = "";
  switch (currency) {
    case "Bitcoin":
      colour = "#ac0e77";
      break;
    case "Ethereum":
      colour = "#008000";
      break;
    case "Tether":
      colour = "#0000FF";
      break;
    case "BNB":
      colour = "#d2691e";
      break;
    case "USD Coin":
      colour = "#0000FF";
      break;
    default:
      colour = "#C0C0C0";
  }
  console.log(colour);
  return colour;
};

export default function App() {
  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=5");
      const data = await res.json();
      setChartData({
        labels: data.data.map((crypto) => crypto.name),
        datasets: [
          {
            label: "Price in USD",
            data: data.data.map((crypto) => crypto.priceUsd),
            backgroundColor: data.data.map((crypto) =>
              checkCurrency(crypto.name)
            ),
          },
        ],
      });
    };
    fetchPrices();
  }, []);

  const [chartData, setChartData] = useState({});

  return (
    <div className="App">
      <Chart chartData={chartData} />
    </div>
  );
}
