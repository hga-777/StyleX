import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice.js";
import {useDispatch , useSelector} from 'react-redux';

export default function SignIn() {
    const [formData , setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user );
     //was getting an error in the above line so added extra lines after 'or'
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.id] : e.target.value});  
    }

    const handleSubmit =  async(e) => {
         e.preventDefault();  //this will prevent the submission of the form
         try{
             dispatch(signInStart());
             const res = await fetch('/api/auth/signin' , {
                method:'POST',
                headers:{
                  'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();  
            if(data.success === false) {dispatch(signInFailure(data)); return;}
            dispatch(signInSuccess(data));
            navigate('/');
         }catch(error){
          dispatch(signInFailure(error));
         }
    };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:70"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex justify-normal gap-5 mt-4">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">  {error ? error || 'Something went wrong!' : ''}</p>
    </div>
  );
}