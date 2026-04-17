import error from "../../assets/images/error.svg"
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className="mt-12">
            <div className='flex items-center justify-center'>
                <img src={error} alt="" />
            </div> 
            <div className="mt-6 flex items-center justify-center">
                <Link to="/"><button className="animate-bounce btn-error btn text-white px-8 py-6">Go To Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;