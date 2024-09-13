import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ReadOnePayment = () => {
  const [payment, setPayment] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Extracting the PaymentId from the route parameters

  // Fetching the payment details when the component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/payments/${id}`)
      .then((response) => {
        setPayment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="read-payment-container p-4">
      <BackButton destination='/payments/allPayments'/>
      <h1 className="read-payment-title text-3xl my-4">Payment Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="payment-details-container border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Payment ID</label>
            <span>{payment.PaymentId}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Customer ID</label>
            <span>{payment.cusID}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Vehicle Number</label>
            <span>{payment.Vehicle_Number}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Payment Date</label>
            <span>{payment.PaymentDate}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Payment Method</label>
            <span>{payment.PaymentMethod}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Booking ID</label>
            <span>{payment.Booking_Id}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Package</label>
            <span>{payment.Package}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Selected Services</label>
            <span>{payment.selectedServices && payment.selectedServices.join(', ')}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Payment Amount</label>
            <span>{payment.Pamount}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Total Amount</label>
            <span>{payment.totalAmount}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Email</label>
            <span>{payment.email}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Service Amounts</label>
            <span>{payment.Samount && payment.Samount.join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOnePayment;
