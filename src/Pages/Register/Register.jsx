import React, { useContext } from 'react';
import img1 from "../../assets/images/login/login.svg"
import { LiaFacebookF } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/ContextContainer';

const Register = () => {
    const {createUser} = useContext(AuthContext)
    const handleForm = (e) =>{
        e.preventDefault();
        const email = e.target.email.value 
        const password = e.target.password.value
        console.log(email , password)
        createUser(email , password)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return (
        <div className="mt-8 md:mt-16 lg:mt-20 lg:mb-40">
            <div className="flex justify-center items-center flex-col-reverse lg:flex-row gap-20">
                <div>
                    <img src={img1} alt="" className='hidden lg:flex'/>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className='mx-8'>
                        <h3 className='text-[#444444] text-center font-semibold text-4xl mt-16 mb-8'>Sign Up</h3>
                        <form onSubmit={handleForm}>
                            <fieldset className="fieldset">
                                <label className="text-lg font-semibold text-[#444444]">Name</label>
                                <input type="text" name='name' className="input focus:border-none" placeholder="Your name" />

                                <label className="text-lg font-semibold text-[#444444] mt-6">Email</label>
                                <input type="email" name='email' className="input focus:border-none" placeholder="Your Email" />


                                <label className="text-lg font-semibold text-[#444444] mt-6 ">Confirm Password</label>
                                <input type="password" className="input focus:border-none" name='password' placeholder="Password" />
                                <input type="submit" value="Sign Up" className=" btn text-white bg-[#FF3811]  mt-4 font-semibold text-xl" />

                            </fieldset>
                        </form>
                        <p className='text-[#444444] text-center font-medium text-lg my-4'>Or Sign Up with</p>
                        <div className='flex justify-center items-center gap-5'>
                            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-[#F5F5F8]'>
                                <LiaFacebookF color='#3B5998' size={20} ></LiaFacebookF>
                            </div>
                            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-[#F5F5F8]'>
                                <FaLinkedinIn color='#3B5998' size={20}></FaLinkedinIn>

                            </div>
                            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-[#F5F5F8]'>
                                <FcGoogle size={24}></FcGoogle>
                            </div>
                        </div>
                        <p className='text-[#757575] text-center text-lg mt-4 mb-16'>
                            Already have an account? <span className='text-[#FF3811] font-bold'><Link to="/login">Login</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;