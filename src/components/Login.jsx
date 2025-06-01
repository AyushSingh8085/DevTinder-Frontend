import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setError("");

    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data.user));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async (e) => {
    setError("");

    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data.user));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Sign up failed. Please try again.");
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign up"}
          </h2>
          {!isLoginForm && (
            <>
              <div className="pb-2">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label py-2">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-x-xs"
                  />
                </label>
              </div>
              <div className="pb-2">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label py-2">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-x-xs"
                  />
                </label>
              </div>
            </>
          )}
          <div className="pb-2">
            <label className="form-control w-full max-w-xs my-2">
              <div className="label py-2">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-x-xs"
              />
            </label>
          </div>
          <div className="pb-2">
            <label className="form-control w-full max-w-xs my-2">
              <div className="label py-2">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-x-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>

          <p
            className="cursor-pointer m-auto pt-2 scroll-m-0 overflow-auto"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setEmailId("");
              setPassword("");
              setFirstName("");
              setLastName("");
            }}
          >
            {isLoginForm
              ? "New User? Sign up here."
              : "Existing User? Login here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
