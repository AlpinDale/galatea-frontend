import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RegisterForm } from '../components' 
import { SimpleNavBar } from '../components';

const Register = () => {
  return (
    <>
    <div className="ga-black scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-purple/900 scrollbar flex h-screen flex-col">
      <div>
        <SimpleNavBar />
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="my-4 border-b border-white/5" />
        <div className="w-full max-w-sm">
          <h1 className="text-4xl">Welcome.</h1>
          <p className="text-white/50">Please create your account below.</p>
          <div className="my-4 border-b border-white/5" />
          <RegisterForm />
        </div>
      </div>
    </div>
    </>
  )
}

export default Register;