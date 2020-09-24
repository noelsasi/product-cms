import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  Upload,
  Divider,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function AddProduct({
  modal,
  handelModal,
  categories,
  handleAddProducts,
  edit,
  handleEditItem,
}) {
  const [fileList, setFilelist] = useState([]);

  const [form] = Form.useForm();

  const handleOk = (e) => {
    if (edit) {
      let json = {
        ...e,
        id: edit.id,
        image: edit.image,
      };
      handleEditItem(json);
    } else {
      handleAddProducts(e);
    }
    form.resetFields();

    handelModal();
  };

  const handleCancel = (e) => {
    handelModal();
  };

  const Imageprops = {
    onRemove: (file) => {
      setFilelist((state) => {
        const index = state.indexOf(file);
        const newFileList = state.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      setFilelist([file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Modal style={{ top: 50 }} footer={null} visible={modal}>
        <Col lg={24}>
          <Row justify="center">
            <Col xs={22} lg={16} className="addProduct">
              <h1>Add Product</h1>
              <Form
                initialValues={edit}
                onFinish={handleOk}
                layout="vertical"
                form={form}
              >
                <Form.Item
                  rules={[{ required: true }]}
                  label="Item Category"
                  name="ctgy"
                >
                  <Select>
                    {categories.map((x, i) => (
                      <Option key={i} value={x}>
                        {x}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Product Name"
                  name="item"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Price"
                  name="price"
                >
                  <Input />
                </Form.Item>

                <Form.Item name="exclusive" valuePropName="checked">
                  <Checkbox>Top Product</Checkbox>
                </Form.Item>

                <h3>Upload Product Image</h3>
                <Upload {...Imageprops}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>

                <Divider style={{ background: "#bbb" }} />

                <Row justify="space-around">
                  <Button
                    style={{ background: "#ddd", padding: "0 3rem" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      style={{ padding: "0 3rem" }}
                      type="primary"
                    >
                      {edit ? "Update" : "Submit"}
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Modal>
    </>
  );
}

export default AddProduct;
