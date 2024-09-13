// Importing necessary dependencies
import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Functional component for EditPayment
const EditPayment = () => {
  // State variables for managing form data and loading state
  const [PaymentId, setPaymentId] = useState('');
  const [cusID, setCusID] = useState('');
  const [Vehicle_Number, setVehicleNumber] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [Booking_Id, setBookingId] = useState('');
  const [Package, setPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [Pamount, setPamount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [Samount, setSamount] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the payment ID from the URL

  // Fetch payment data based on the payment ID when component mounts
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/payments/${id}`)
      .then((response) => {
        const payment = response.data;
        setPaymentId(payment.PaymentId);
        setCusID(payment.cusID);
        setVehicleNumber(payment.Vehicle_Number);
        setPaymentDate(payment.PaymentDate);
        setPaymentMethod(payment.PaymentMethod);
        setBookingId(payment.Booking_Id);
        setPackage(payment.Package);
        setSelectedServices(payment.selectedServices);
        setPamount(payment.Pamount);
        setTotalAmount(payment.totalAmount);
        setEmail(payment.email);
        setSamount(payment.Samount);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching payment data. Please check the console.',
        });
        console.log(error);
      });
  }, [id]);

  // Event handler for editing the Payment
  const handleEditPayment = () => {
    // Validate form fields
    if (!cusID || !Vehicle_Number || !PaymentDate || !PaymentMethod || !Booking_Id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }

    setLoading(true);

    const updatedPayment = {
      cusID,
      Vehicle_Number,
      PaymentDate,
      PaymentMethod,
      Booking_Id,
      Package,
      selectedServices,
      Pamount,
      totalAmount,
      email,
      Samount,
    };

    axios
      .put(`http://localhost:3000/payments/${id}`, updatedPayment)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Payment updated successfully!',
        });
        navigate('/payments/allPayments');
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the payment. Please check the console.',
        });
        console.log(error);
      });
  };

  // JSX for rendering the edit payment form
  return (
    <div className="p-4">
      <BackButton destination='/payments/allPayments' />
      <h1 className="text-3xl my-4">Edit Payment</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Payment ID</label>
          <input
            type="text"
            value={PaymentId}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
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
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
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
            value={selectedServices.join(", ")}
            onChange={(e) => setSelectedServices(e.target.value.split(", "))}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Payment Amount</label>
          <input
            type="number"
            value={Pamount}
            onChange={(e) => setPamount(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
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
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Service Amounts</label>
          <input
            type="text"
            value={Samount.join(", ")}
            onChange={(e) => setSamount(e.target.value.split(", ").map(Number))}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-4 bg-sky-300 m-8' onClick={handleEditPayment}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditPayment component
export default EditPayment;
