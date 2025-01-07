import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img src="images/homeHero.png" alt="Hero Image" className="mb-5"></img>
        <h1 className="mt-5">Invest in eveything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          many more.
        </p>
        <Link to={"/signup"}
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}
