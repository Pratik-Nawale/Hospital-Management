import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update user ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/updateProfile",
        {
          userId: params.id,
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update user ==========

  const changePassword = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        "/api/v1/user/update-user-password",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong ");
    }
  };

  //getDOc Details
  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {users && (
        <div className="user-profile">
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="m-3"
            initialValues={{
              ...users,
            }}
          >
            <h4 className="">Personal Details : </h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Name"
                  name="name"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="your email address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Mobile Number"
                  name="number"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="number" placeholder="your mobile number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}></Col>

              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  Update
                </button>
              </Col>
            </Row>
          </Form>

          <Form layout="vertical" className="m-3" onFinish={changePassword}>
            <h4>Update Password</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Old Password"
                  name="oldPassword"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="password" placeholder="Enter old password" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="password" placeholder="Enter new password" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  Change Password
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
