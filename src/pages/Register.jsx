import React, { useState } from 'react';
import Pic1 from '../assets/pic1.jpg'; // Adjust the path as necessary
import '../index.css'
import e from 'cors';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  return (
    <div className='flex  h-screen w-full bg-purple-darkest text-letter'>

      {/* Left: Image section - 60% */}
      <div className='w-[50%] h-full'>
        <img src={Pic1} alt="Register" className='w-full h-full object-cover' />
      </div>

      {/* Right: Form section - 40% */}
      <div className='w-[50%] flex items-center justify-center'>
        <form className='w-[80%] max-w-md bg-transparent p-8 space-y-7'>
          <h1 className='text-3xl font-semibold pb-6'>Create an Account</h1>
          <p className='text-sm text-gray-500'>Already have an account? <a href="/login" className='text-blue-500'>Login here</a>.</p>

          <input className='w-full p-2 border border-border rounded-[0.1rem]'
          type="text" placeholder="Username" />
          <input className='w-full p-2 border border-border rounded-[0.1rem]'
          type="email" placeholder="Email" />
          <input className='w-full p-2 border border-border rounded-[0.1rem]'
          type="password" placeholder="Password" />
          <button className='w-full bg-buttonbg text-white py-2 px-4 rounded hover:bg-buttonhover transition-colors duration-300'>
            Register
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or register with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

        
          <button>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className='inline-block w-6 h-6 mr-2' />
            Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
