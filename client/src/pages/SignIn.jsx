import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSucess,
  signInFailure,
} from "../redux/user/userSlice";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.json().then((response) => {
        if (!response.success) {
          dispatch(signInFailure(response));
          return;
        }
        dispatch(signInSucess(response));
        navigate("/");
      });
    } catch (error) {
      dispatch(
        signInFailure({ message: error.message ?? "Failed to sign in!" })
      );
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name=""
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name=""
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex  gap-2 mt-5">
        <p>Don&apos;t have an account</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700">
        {error ? error.message ?? "Something went wrong!" : ""}
      </p>
    </div>
  );
}
