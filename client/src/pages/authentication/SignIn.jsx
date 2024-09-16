import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInstart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import Swal from "sweetalert2";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { motion } from "framer-motion";
import NavBar from "../../components/NavBar";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInstart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.message}`,
        });
        return;
      }
      dispatch(signInSuccess(data));
      if (data.usertype === "Travel Service Providers") {
        navigate("/additems");
      } else {
        navigate("/");
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      dispatch(signInFailure(error.message));
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
          paddingTop: "6rem",
        }}
        className="bg-cover bg-center bg-no-repeat"
      >
        <motion.div
          className="p-3 max-w-lg mx-auto bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <button
              disabled={loading}
              className="bg-DarkColor text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <div className="flex gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <span className="text-blue-700">Sign Up</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
}
