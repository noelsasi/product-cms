import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  Spin,
  Tag,
  Slider,
  Empty,
  Pagination,
} from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import ProducstJson from "./data.json";
import ProductCard from "./productCard";
import AddProduct from "./AddProduct";
import TopProducts from "./TopProducts";

function Container() {
  const categories = ["Books", "Clothes", "Bags", "Mobiles"];

  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [products, setProducts] = useState([]);

  const [copyData, setCopyData] = useState([]);

  const [modal, setModal] = useState(false);

  const [edit, setEdit] = useState("");

  const [sort, setSort] = useState();

  const [ctgy, setCtgy] = useState("");

  const [priceFilter, setPriceFilter] = useState([20, 1000]);

  const [next, setNext] = useState(9);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts(ProducstJson);
      setCopyData(ProducstJson);
      setLoading(false);
    }, 1000);
  };

  const menuCond = ["Low to High", "High to Low"];

  const menu = (
    <Menu onClick={(e) => handleSort(e.key)}>
      {menuCond.map((x, i) => (
        <Menu.Item key={i}>{x}</Menu.Item>
      ))}
    </Menu>
  );

  const handleAddProducts = (item) => {
    setLoading(true);
    const modify = {
      id: copyData.length.toString(),
      ...item,
      image:
        "https://creativebonito.com/wp-content/uploads/2018/07/Hard-Cover-Book-Mockup.jpg",
    };
    setTimeout(() => {
      const merge = [...copyData, modify];
      setCtgy("");

      setProducts(merge);
      setCopyData(merge);
      setLoading(false);
    }, 1000);
  };

  const handleEditItem = (item) => {
    setLoading(true);

    const copy = copyData;
    const remove = copy.filter((x) => x.id !== item.id);

    setTimeout(() => {
      const merge = [...remove, item];
      setCtgy("");
      setProducts(merge);
      setCopyData(merge);
      setLoading(false);
    }, 1000);
  };

  const handelModal = (_, item) => {
    setRefresh(true);
    setTimeout(() => {
      setModal(!modal);
      if (item) {
        setEdit(item);
      } else {
        setEdit("");
      }
      setRefresh(false);
    }, 100);
  };

  const handleSort = (e) => {
    setLoading(true);
    setSort(e);

    setTimeout(() => {
      if (e === "0") {
        let data = products.sort((x, i) => x.price - i.price);
        setProducts(data);
      } else if (e === "1") {
        let data = products.sort((x, i) => i.price - x.price);
        setProducts(data);
      } else {
        setProducts(products);
      }

      setLoading(false);
    }, 500);
  };

  const handleCategoryView = (ctgy) => {
    setCtgy(ctgy);
    const copy = copyData;
    const update = copy.filter((x) => x.ctgy === ctgy);
    setProducts(update);

    setNext(9);
    setSkip(0);
    setCurrent(1);
  };

  const handlePriceFilter = () => {
    const copy = copyData;
    const newData = copy.filter(
      (x) =>
        parseInt(x.price) > priceFilter[0] && parseInt(x.price) < priceFilter[1]
    );

    setProducts(newData);
  };

  const handlePagination = (e) => {
    const skipCal = e * 9;
    const startPosition = skipCal - 9;
    setSkip(startPosition);
    setNext(skipCal);

    setCurrent(e);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);

    window.scrollTo(0, 0);
  };

  return (
    <Col xs={24} lg={24} className="doodle-container">
      <Row justify="center">
        <Col xs={22} md={22} lg={18} className="product-wrapper">
          {/* Header */}
          <Row justify="space-between">
            <h1 className="title">Products</h1>
            <Button
              style={{ borderRadius: "5px" }}
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handelModal}
            >
              {" "}
              Add Product
            </Button>
            {!refresh ? (
              <AddProduct
                modal={modal}
                handelModal={handelModal}
                handleAddProducts={handleAddProducts}
                handleEditItem={handleEditItem}
                categories={categories}
                edit={edit}
              />
            ) : (
              ""
            )}
          </Row>

          {/* Container */}
          <Row justify="space-between">
            {/* SideBar */}
            <Col lg={5} xs={0} className="sidebar">
              <h3>Categories</h3>
              <div className="content">
                <ul className="ctgy-card">
                  {categories.map((x, i) => (
                    <li onClick={() => handleCategoryView(x)} key={i}>
                      {x}
                    </li>
                  ))}
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

              <TopProducts
                data={copyData.filter((x) => x.exclusive === true)}
              />
            </Col>

            {/* Product Container */}
            <Col lg={18} xs={24} className="product-container">
              <div className="content">
                <Row justify="space-between" className="header">
                  <div>
                    <p style={{ marginBottom: 0 }}>
                      {" "}
                      Showing {skip + 1} -{" "}
                      {current * 9 < products.length
                        ? current * 9
                        : products.length}{" "}
                      of {products.length} results{" "}
                    </p>

                    {ctgy ? (
                      <Tag
                        style={{ marginTop: "1rem" }}
                        color="magenta"
                        closable
                        onClose={() => {
                          setProducts(copyData);
                          setCtgy("");
                        }}
                      >
                        {ctgy}
                      </Tag>
                    ) : (
                      ""
                    )}
                  </div>
                  <Button>
                    <Dropdown trigger={["click"]} overlay={menu}>
                      <a
                        href="hello"
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        {sort ? menuCond[sort] : "Default Sorting"}{" "}
                        <DownOutlined />
                      </a>
                    </Dropdown>
                  </Button>
                </Row>

                <Spin
                  style={{ marginTop: `${loading ? "7rem" : 0}` }}
                  spinning={loading}
                  tip="Please wait, Loading Products..."
                >
                  <Row className="card-wrap">
                    {products.length > 0
                      ? products.slice(skip, next).map((x, i) => (
                          <Col xs={12} sm={12} md={12} lg={8} key={i}>
                            <ProductCard handelModal={handelModal} data={x} />
                          </Col>
                        ))
                      : ""}
                  </Row>
                  {!loading && products.length === 0 ? (
                    <Row style={{ marginTop: "3rem" }} justify="center">
                      <Empty description="Sorry, No Products found!" />
                    </Row>
                  ) : (
                    <Row style={{ marginTop: "3rem" }} justify="center">
                      <Pagination
                        onChange={handlePagination}
                        current={current}
                        total={products.length}
                        hideOnSinglePage={true}
                      />
                    </Row>
                  )}
                </Spin>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default Container;
