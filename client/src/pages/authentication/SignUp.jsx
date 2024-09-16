import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { motion } from "framer-motion";
import NavBar from "../../components/NavBar";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.retypePassword)
      newErrors.retypePassword = "Passwords must match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.message}`,
        });
        return;
      }

      navigate("/sign-in");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div>
      <NavBar />

      <div
        style={{
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "4rem", // Adds space between NavBar and the sign-up container
        }}
        className="bg-cover bg-center bg-no-repeat"
      >
        <motion.div
          className="p-3 max-w-lg mx-auto bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border p-3 rounded-lg">
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="First Name"
                id="firstname"
                className="w-full bg-transparent border-none focus:outline-none"
                onChange={handleChange}
              />
            </div>
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname}</p>
            )}

            <div className="flex items-center border p-3 rounded-lg">
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Last Name"
                id="lastname"
                className="w-full bg-transparent border-none focus:outline-none"
                onChange={handleChange}
              />
            </div>
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname}</p>
            )}

            <div className="flex items-center border p-3 rounded-lg">
              <AiOutlineMail className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="w-full bg-transparent border-none focus:outline-none"
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <div className="flex items-center border p-3 rounded-lg">
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="w-full bg-transparent border-none focus:outline-none"
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}

            <div className="flex items-center border p-3 rounded-lg">
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Retype Password"
                id="retypePassword"
                className="w-full bg-transparent border-none focus:outline-none"
                onChange={handleChange}
              />
            </div>
            {errors.retypePassword && (
              <p className="text-red-500">{errors.retypePassword}</p>
            )}

            <button
              disabled={loading}
              className="bg-DarkColor text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <div className="flex gap-2 mt-5">
            <p>Already have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Sign In</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
}
