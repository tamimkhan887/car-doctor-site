import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const {_id ,title, img, price } = service;
    return (
        <div className='p-8 shadow rounded-xl'>
            <div className="">
                <img
                    src={img}
                    alt="Shoes" className='rounded-xl h-60' />
                <div className="space-y-2 mt-4">
                    <h2 className="text-[444444] font-bold text-2xl">{title}</h2>
                    <div className="flex justify-between items-center">
                        <p className='text-[#FF3811] font-semibold text-xl'>Price : ${price}</p>
                        <Link to={`/services/${_id}`}>
                            <button className="btn btn-error">Buy Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;