import React from "react";
import { Row, Col, Rate } from "antd";
import { useStateValue } from "../StateProvider";

function TopProducts() {
  const [state] = useStateValue();

  return (
    <div className="top-products">
      <h1>Top Products</h1>
      <Row>
        {state.copyData
          .filter((x) => x.exclusive === true)
          .map((x, i) => (
            <Col lg={22} className="item">
              <div>
                <img src={x.image} alt="top" />
              </div>
              <div>
                <h2>{x.item}</h2>
                <Rate defaultValue={5} disabled />
                <p>${x.price}</p>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default TopProducts;
