import React from "react";

function ProductCard({ data, handelModal }) {
  return (
    <>
      <div
        onClick={() => {
          handelModal("_", data);
        }}
        className="product-card"
      >
        <div className="image">
          <img src={data.image} alt="product" />
        </div>
        <div className="body">
          <h3>{data.item}</h3>
          <h6>${data.price}</h6>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
