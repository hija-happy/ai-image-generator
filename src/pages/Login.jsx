import React from 'react';
import Pic1 from '../assets/pic2.jpg';
import '../index.css';

const Login = () => {
  return (
    <div className='flex h-screen w-full bg-purple-darkest text-letter'>

      {/* Left: Image section */}
      <div className='w-[50%] h-full'>
        <img src={Pic1} alt="Login" className='w-full h-full object-cover' />
      </div>

      {/* Right: Form section */}
      <div className='w-[50%] flex items-center justify-center'>
        <form className='w-[80%] max-w-md bg-transparent p-8 space-y-7'>
          <h1 className='text-3xl font-semibold pb-6'>Login to Your Account</h1>
          <p className='text-sm text-gray-500'>
            Don’t have an account? <a href="/register" className='text-pink-400 hover:underline'>Sign up here</a>.
          </p>

          <input
            className='w-full p-2 border border-border rounded-[0.1rem]'
            type="text"
            placeholder="Username or Email"
          />
          <input
            className='w-full p-2 border border-border rounded-[0.1rem]'
            type="password"
            placeholder="Password"
          />
          <button className='w-full bg-buttonbg text-white py-2 px-4 rounded hover:bg-buttonhover transition-colors duration-300'>
            Login
          </button>

          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm text-gray-400 hover:text-pink-400 transition">
              Forgot Password?
            </a>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className='flex items-center justify-center w-full border border-gray-500 rounded py-2 hover:bg-gray-800 transition'>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className='w-5 h-5 mr-2' />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
