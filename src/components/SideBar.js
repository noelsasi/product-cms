import React from "react";
import { Drawer, Row, Button } from "antd";
import Filter from "./filter";
import { CloseCircleFilled } from "@ant-design/icons";

function SideBar({
  data,
  visible,
  handleDrawer,
  handleCategoryView,
  setPriceFilter,
  handlePriceFilter,
  categories,
  priceFilter,
}) {
  return (
    <Drawer
      title={
        <Row justify="space-between">
          <h1>Filter Section</h1>
          <Button
            icon={<CloseCircleFilled />}
            shape="circle-outline"
            onClick={handleDrawer}
          />
        </Row>
      }
      placement="left"
      closable={false}
      onClose={handleDrawer}
      visible={visible}
    >
      <Filter
        small={"small"}
        categories={categories}
        data={data}
        handlePriceFilter={handlePriceFilter}
        handleCategoryView={handleCategoryView}
        setPriceFilter={setPriceFilter}
        priceFilter={priceFilter}
      />
    </Drawer>
  );
}

export default SideBar;
