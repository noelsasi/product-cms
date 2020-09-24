import React from "react";
import { Row, Col, Rate } from "antd";

function TopProducts({ data }) {
  const topProducts = [
    {
      image: "https://cf.shopee.ph/file/d540de61e12c97a38f840a77088f26a6",
      item: "Coffee Mug",
      rating: 5,
      price: "26.50",
    },
    {
      image:
        "https://static.zara.net/photos///2020/I/0/3/p/4873/703/655/2/w/1920/4873703655_1_1_1.jpg?ts=1592237719114",
      item: "T-shirt",
      rating: 5,
      price: "45.50",
    },
    {
      image:
        "https://creativebonito.com/wp-content/uploads/2018/07/Hard-Cover-Book-Mockup.jpg",
      item: "Hard Cover Book",
      rating: 3,
      price: "23.10",
    },
  ];

  return (
    <div className="top-products">
      <h1>Top Products</h1>
      <Row>
        {data.map((x, i) => (
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
