import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  Spin,
  Tag,
  Empty,
  Pagination,
} from "antd";

import {
  PlusOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import ProducstJson from "../data.json";
import ProductCard from "./productCard";
import AddProduct from "./AddProduct";
import SideBar from "./SideBar";
import Filter from "./filter";
import { useStateValue } from "../StateProvider";

function Container() {
  const [{ products, copyData }, dispatch] = useStateValue();

  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [modal, setModal] = useState(false);

  const [edit, setEdit] = useState("");

  const [sort, setSort] = useState();

  const [ctgy, setCtgy] = useState("");

  const [drawer, setDrawer] = useState(false);

  const [priceFilter, setPriceFilter] = useState([20, 1000]);

  const [next, setNext] = useState(9);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch({
        type: "FETCH_PRODUCT",
        payload: ProducstJson,
      });
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
      let data = [];
      if (e === "0") {
        data = products.sort((x, i) => x.price - i.price);
      } else if (e === "1") {
        data = products.sort((x, i) => i.price - x.price);
      } else {
        return false;
      }

      setLoading(false);

      return dispatch({
        type: "FILTER_PRODUCT",
        payload: data,
      });
    }, 500);
  };

  const handleCategoryView = (ctgy) => {
    setLoading(true);

    setCtgy(ctgy);
    const copy = copyData;
    const update = copy.filter((x) => x.ctgy === ctgy);

    setTimeout(() => {
      dispatch({
        type: "FILTER_PRODUCT",
        payload: update,
      });
      setLoading(false);
    }, 500);

    setNext(9);
    setSkip(0);
    setCurrent(1);
  };

  const handlePriceFilter = () => {
    setLoading(true);

    const copy = copyData;
    const newData = copy.filter(
      (x) =>
        parseInt(x.price) > priceFilter[0] && parseInt(x.price) < priceFilter[1]
    );

    setTimeout(() => {
      dispatch({
        type: "FILTER_PRODUCT",
        payload: newData,
      });

      setLoading(false);
    }, 500);

    setNext(9);
    setSkip(0);
    setCurrent(1);
    setCtgy("");
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

  const handleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Col xs={24} lg={24} className="doodle-container">
      <Row justify="center">
        <Col xxl={14} xs={22} md={22} lg={18} className="product-wrapper">
          {/* Header */}
          <Row justify="space-between">
            <Col xs={3} md={3} lg={0}>
              <Button
                type="primary"
                size="large"
                onClick={handleDrawer}
                icon={<MenuUnfoldOutlined />}
                style={{ marginRight: "1rem" }}
              />
              <SideBar
                handlePriceFilter={handlePriceFilter}
                handleCategoryView={handleCategoryView}
                setPriceFilter={setPriceFilter}
                priceFilter={priceFilter}
                visible={drawer}
                handleDrawer={handleDrawer}
              />
            </Col>

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
                edit={edit}
                setLoading={setLoading}
                setCtgy={setCtgy}
              />
            ) : (
              ""
            )}
          </Row>

          {/* Container */}
          <Row justify="space-between">
            {/* SideBar */}
            <Filter
              handlePriceFilter={handlePriceFilter}
              handleCategoryView={handleCategoryView}
              setPriceFilter={setPriceFilter}
              priceFilter={priceFilter}
            />

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
                          dispatch({
                            type: "RESET",
                          });
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
                          <Col xs={22} sm={12} md={12} lg={8} xxl={6} key={i}>
                            <ProductCard handelModal={handelModal} data={x} />
                          </Col>
                        ))
                      : ""}
                  </Row>

                  <Row style={{ marginTop: "3rem" }} justify="center">
                    {!loading && products.length === 0 ? (
                      <Empty description="Sorry, No Products found!" />
                    ) : (
                      <Pagination
                        onChange={handlePagination}
                        current={current}
                        total={products.length}
                        hideOnSinglePage={true}
                      />
                    )}
                  </Row>
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
