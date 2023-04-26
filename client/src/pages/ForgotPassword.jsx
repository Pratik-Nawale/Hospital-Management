import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const navigate = useNavigate();

  const onSubmitHandler = async (values) => {

    try {
      const res = await axios.post("/api/v1/user/forgot-password", values);
      // console.log(values);
      if (res.data.success) {
        message.success(res.data.message);
      }
      if (res.data.error) {
        message.error(res.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onSubmitHandler}
          className="register-form"
        >
          <h3 className="text-centre">Forgot Password</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
