import img1 from "../../assets/images/login/login.svg";
import { LiaFacebookF } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../ContextProvider/contextContainer";
import axios from "axios";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const HandleLogIn = (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const email = form.email.value.trim();
        const password = form.pass.value;
        console.log(email, password)
        signInUser(email, password)
            .then(() => {
                form.reset();
                const user = { email }
                    axios.post("http://localhost:5000/jwt" , user , {withCredentials: true} )
                    .then(res=>{
                        if(res.data.success){
                            navigate(location?.state ? location.state : "/")
                        }
                    })
                    .catch(err => {
                        console.log(err.code)
                    })
    })
            .catch ((err) => {
    console.log("Error code:", err.code);
    console.log("Error message:", err.message);

    if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
    } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
    } else {
        setError("Login failed. Please try again.");
    }
});
    };

return (
    <div className="mt-8 md:mt-16 lg:mt-20 lg:mb-40">
        <div className="flex justify-center items-center flex-col-reverse lg:flex-row gap-20">
            <div>
                <img src={img1} alt="Login" className="hidden lg:flex" />
            </div>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="mx-8">
                    <h3 className="text-[#444444] text-center font-semibold text-4xl mt-16 mb-8">
                        Login
                    </h3>

                    <form onSubmit={HandleLogIn}>
                        <fieldset className="fieldset">
                            <label className="text-lg font-semibold text-[#444444] mt-6">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="input focus:border-none"
                                placeholder="Your Email"
                                required
                            />

                            <label className="text-lg font-semibold text-[#444444] mt-6">
                                Password
                            </label>
                            <input
                                type="password"
                                name="pass"
                                className="input focus:border-none"
                                placeholder="Password"
                                required
                            />

                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}

                            <input
                                type="submit"
                                value="Sign In"
                                className="btn text-white bg-[#FF3811] mt-4 font-semibold text-xl"
                            />
                        </fieldset>
                    </form>

                    <p className="text-[#444444] text-center font-medium text-lg my-4">
                        Or Sign Up with
                    </p>

                    <div className="flex justify-center items-center gap-5">
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#F5F5F8] cursor-pointer">
                            <LiaFacebookF color="#3B5998" size={20} />
                        </div>

                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#F5F5F8] cursor-pointer">
                            <FaLinkedinIn color="#3B5998" size={20} />
                        </div>

                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#F5F5F8] cursor-pointer">
                            <FcGoogle size={24} />
                        </div>
                    </div>

                    <p className="text-[#757575] text-center text-lg mt-4 mb-16">
                        Don't have an account?{" "}
                        <span className="text-[#FF3811] font-bold">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
};

export default Login; 