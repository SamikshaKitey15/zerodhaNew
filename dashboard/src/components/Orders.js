import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [newOrder, setNewOrder] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/newOrder").then((res) => {
      console.log(res.data);
      setNewOrder(res.data);
    });
  }, []);

  return (
    <>
      <h3 className="title">New Orders</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty.</th>
            <th>Mode</th>
          </tr>

          {newOrder.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td>{stock.qty}</td>
                <td>{stock.mode}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Orders;
