import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const CreatePayment = () => {
  // State variables for managing form data
  const [cusID, setCusID] = useState('');
  const [Vehicle_Number, setVehicleNumber] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [Booking_Id, setBookingId] = useState('');
  const [Package, setPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [Pamount, setPamount] = useState(0);
  const [Samount, setSamount] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission and validation
  const handleSavePayment = () => {
    if (!cusID || !Vehicle_Number || !PaymentDate || !PaymentMethod || !Booking_Id || !email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields!',
      });
      return;
    }

    // Calculate total amount (example: sum of Pamount and Samount array values)
    const calculatedTotalAmount = Pamount + Samount.reduce((acc, curr) => acc + curr, 0);
    setTotalAmount(calculatedTotalAmount);

    setLoading(true);

    const paymentData = {
      cusID,
      Vehicle_Number,
      PaymentDate,
      PaymentMethod,
      Booking_Id,
      Package,
      selectedServices,
      Pamount,
      Samount,
      totalAmount: calculatedTotalAmount,
      email,
    };

    axios.post('http://localhost:3000/payments', paymentData)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Payment created successfully!',
        });
        navigate('/payments/allPayments');
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'An error occurred while creating the payment. Please check the console.',
        });
        console.error(error.response?.data);
      });
      
  };

  // JSX for rendering the payment creation form
  return (
    <div className="p-4">
      <BackButton destination='/payments/allPayments'/>
      <h1 className="text-3xl my-4">Create Payment</h1>
      {loading ? <Spinner /> : ''}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Customer ID</label>
          <input
            type="text"
            value={cusID}
            onChange={(e) => setCusID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Vehicle Number</label>
          <input
            type="text"
            value={Vehicle_Number}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Payment Date</label>
          <input
            type="date"
            value={PaymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Payment Method</label>
          <select
            value={PaymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Booking ID</label>
          <input
            type="text"
            value={Booking_Id}
            onChange={(e) => setBookingId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Package</label>
          <input
            type="text"
            value={Package}
            onChange={(e) => setPackage(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Selected Services</label>
          <input
            type="text"
            value={selectedServices.join(', ')}
            onChange={(e) => setSelectedServices(e.target.value.split(',').map(service => service.trim()))}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Enter services separated by commas"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Package Amount</label>
          <input
            type="number"
            value={Pamount}
            onChange={(e) => setPamount(Number(e.target.value))}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Service Amounts</label>
          <input
            type="text"
            value={Samount.join(', ')}
            onChange={(e) => setSamount(e.target.value.split(',').map(amount => Number(amount.trim())))}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Enter service amounts separated by commas"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSavePayment}>
          Save Payment
        </button>
      </div>
    </div>
  );
};

export default CreatePayment;
