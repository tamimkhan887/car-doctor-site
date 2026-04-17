import React from 'react';
import { ImBin } from "react-icons/im";

const CartDetails = ({ cart, handleDelete, handleUpdate }) => {
    console.log(cart)
    const { _id, name, date, email, price, img, status } = cart
    return (
        <tr>
            <td>
                <ImBin size={30} onClick={() => { handleDelete(_id) }}></ImBin>
            </td>
            <td className='flex items-center justify-center'>
                <div className="avatar">
                    <div className="mask mask-squircle h-18 w-18">
                        <img
                            src={img}
                            alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td className='text-center'>
                <div className="font-bold">{name}</div>
            </td>
            <td className='text-center'>
                <div className="font-bold">{email}</div>
            </td>
            <td className='text-center'>{price}</td>
            <td className='text-center'>{date}</td>
            <td>{status == "confirm" ? <p className='btn btn-success'>Confirmed </p> :
                <p className='btn btn-ghost' onClick={() => handleUpdate(_id)} > Please Confirm</p>}</td>
        </tr>
    );
};

export default CartDetails;