import WatchListItem from "./WatchListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { DoughNut } from "./DoughNut";

const WatchList = () => {
  const [allWatchlist, seAllWatchlist] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/addWatchLists").then((res) => {
      seAllWatchlist(res.data);
    });
  }, []);

  const labels = allWatchlist.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: allWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {allWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {allWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughNut data={data} />
    </div>
  );
};

export default WatchList;
