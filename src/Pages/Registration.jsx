import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


function Registration() {


  const [data,setData]= useState({
    firstName:"", 
    lastName:"",
    email:"",
    password:""
  });
  const handleChange=({ currentTarget:input })=>{
    setData({...data, [input.name]:input.value})
  }

  const navigate= useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const url="http://localhost:5000/api/users";
      const {data:res}= await axios.post(url, data);
      navigate("/login")
      console.log(res.message);
      
    } catch (error) {
      if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
  }
  const [errorMessage, setErrorMessage] = useState('');
  const [error,setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  return (
    
    <div className="w-full">
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
        Register
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
            First Name
          </label>
          <div className="mt-2">
            <input
              name="firstName"
              type="text"
              value={data.firstName}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
            Last Name
          </label>
          <div className="mt-2">
            <input
              name="lastName"
              type="text"
              value={data.lastName}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="relative w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              👁️
            </button>
          </div>
          
        </div>
          {error &&<div>{error}</div>}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-green-600"
          >
            Register
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.location.href = '/login'}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          Already registered? Log In
        </button>
      </form>

      {errorMessage && (
        <p className="mt-4 text-center text-sm text-red-500">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-center text-sm text-green-500">{successMessage}</p>
      )}
    </div>
  </div>
</div>

  )
}

export default Registration
