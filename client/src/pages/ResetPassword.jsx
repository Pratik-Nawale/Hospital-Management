import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const params = useParams();
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const onSubmitHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/reset-password", {password: values.password, userId});
      console.log(values);
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

  const fetchId = async () => {
    const id = params.id;
    setUserId(id);
  };

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onSubmitHandler}
          className="register-form"
        >
          <h3 className="text-centre">Reset Password</h3>
          
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
