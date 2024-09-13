import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import ReportPayment from './ReportPayment';

const ShowPayment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('All');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/payments')
            .then((response) => {
                setPayments(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = (
            payment.PaymentId.toLowerCase().includes(searchQuery) ||
            payment.cusID.toLowerCase().includes(searchQuery) ||
            payment.Vehicle_Number.toLowerCase().includes(searchQuery) ||
            (payment.PaymentDate && payment.PaymentDate.toLowerCase().includes(searchQuery)) ||
            (payment.PaymentMethod && payment.PaymentMethod.toLowerCase().includes(searchQuery)) ||
            (payment.Booking_Id && payment.Booking_Id.toLowerCase().includes(searchQuery)) ||
            (payment.email && payment.email.toLowerCase().includes(searchQuery))
        );

        const matchesMethod = selectedMethod === 'All' || payment.PaymentMethod === selectedMethod;

        return matchesSearch && matchesMethod;
    });

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-3xl my-8'>Payments List</h1>
                <Link to='/payments/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='border border-slate-300 p-2 rounded mr-4'
                />
                <select
                    value={selectedMethod}
                    onChange={handleMethodChange}
                    className='border border-slate-300 p-2 rounded'
                >
                    <option value='All'>All Methods</option>
                    <option value='Credit Card'>Credit Card</option>
                    <option value='Cash'>Cash</option>
                    <option value='Bank Transfer'>Bank Transfer</option>
                </select>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {/* <ReportPayment filteredPayments={filteredPayments} /> */}
                    <table className='w-full border-separate border-spacing-2 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>Payment ID</th>
                                <th className='border border-slate-600 rounded-md'>Customer ID</th>
                                <th className='border border-slate-600 rounded-md'>Vehicle Number</th>
                                <th className='border border-slate-600 rounded-md'>Payment Date</th>
                                <th className='border border-slate-600 rounded-md'>Payment Method</th>
                                <th className='border border-slate-600 rounded-md'>Booking ID</th>
                                <th className='border border-slate-600 rounded-md'>Email</th>
                                <th className='border border-slate-600 rounded-md'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment) => (
                                <tr key={payment._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.PaymentId}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.cusID}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.Vehicle_Number}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.PaymentDate}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.PaymentMethod}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.Booking_Id}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {payment.email}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/payments/detail/${payment._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/payments/edit/${payment._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/payments/delete/${payment._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ShowPayment;
