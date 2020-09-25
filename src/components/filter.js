import React from "react";
import { Col, Row, Slider, Button } from "antd";
import TopProducts from "./TopProducts";
import { useStateValue } from "../StateProvider";

function Filter({
  handleCategoryView,
  setPriceFilter,
  handlePriceFilter,
  priceFilter,
  small,
}) {
  const [{ categories }] = useStateValue();

  return (
    <Col lg={!small ? 5 : 0} xs={!small ? 0 : 24} className="sidebar">
      <h3>Categories</h3>
      <div className="content">
        <ul className="ctgy-card">
          {categories.length > 0
            ? categories.map((x, i) => (
                <li onClick={() => handleCategoryView(x)} key={i}>
                  {x}
                </li>
              ))
            : []}
        </ul>
      </div>

      <div className="price-slider">
        <h1>Filter By Price</h1>
        <Slider
          range
          onChange={(e) => setPriceFilter(e)}
          defaultValue={priceFilter}
          max="1000"
        />
        <Row
          style={{ marginTop: "1rem" }}
          align="middle"
          justify="space-between"
        >
          <Button
            onClick={() => handlePriceFilter()}
            type="primary"
            shape="round"
          >
            Filter
          </Button>
          <p>Price: {`$${priceFilter[0]} - $${priceFilter[1]}`}</p>
        </Row>
      </div>

      <TopProducts />
    </Col>
  );
}

export default Filter;
