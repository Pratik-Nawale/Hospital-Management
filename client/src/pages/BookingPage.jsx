import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import dayjs from "dayjs";
const { range, remove } = require("./timeRange");

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [start, setStart] = useState("00:00");
  const [end, setEnd] = useState("00:00");

  // const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);

        // setting the start and end value for using in time picker
        doctors.timings && setStart(parseInt(remove(doctors.timings[0])));
        doctors.timings && setEnd(parseInt(remove(doctors.timings[1])));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initializeDoctorTime = () => {
    setStart(parseInt(remove(doctors.timings[0])));
    setEnd(parseInt(remove(doctors.timings[1])));
  };
  // ============ handle availiblity
  // const handleAvailability = async () => {
  //   try {
  //     console.log(time)
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       "/api/v1/user/booking-availbility",
  //       { doctorId: params.doctorId, date, time },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(time)

  //     dispatch(hideLoading());
  //     if (res.data.success) {
  //       setIsAvailable(true);
  //       console.log(isAvailable);
  //       message.success(res.data.message);
  //     } else {
  //       message.error(res.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };
  // =============== booking function
  const handleBooking = async () => {
    try {
      // setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
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
      }
      if (res.data.error) {
        message.success(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledTime = () => ({
    disabledHours: () => range(start, end),
  });

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, [setStart, setEnd]);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                disabledDate={disabledDate}
                onChange={(value) => {
                  console.log(value);

                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                defaultValue={dayjs("00:00", "HH:mm")}
                onMouseEnter={initializeDoctorTime}
                onClick={initializeDoctorTime}
                onMouseUp={initializeDoctorTime}
                disabledTime={disabledTime}
                onChange={(value, dateString) => {
                  console.log(value, dateString);
                  setTime(dateString);
                }}
              />

              {/* <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button> */}

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
