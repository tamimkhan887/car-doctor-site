import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/contextContainer';

const Checkout = () => {
    const service = useLoaderData();
    const {img} = service ;
    const {user} = useContext(AuthContext)
    const handleform = (e) =>{
        e.preventDefault();
        const name = e.target.name.value
        const date = e.target.date.value
        const email = e.target.email.value
        const price = e.target.price.value
        const message = e.target.message.value

        const booking = {
            name,
            date,
            email,
            price,
            message,
            img
            
        }
        fetch("http://localhost:5000/bookings" , {
            method: "POST",
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                alert("Data is inserted")
                e.target.reset();
            }
        })
    }
    return (
        <div className='bg-[#F3F3F3] p-7 md:p-14 rounded-lg mt-14'>
            <form onSubmit={handleform} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <input type="text" className="input w-full h-14 focus:border-none" defaultValue={user?.displayName} name='name' placeholder="Name" />
                    <input type="date" className="input w-full h-14 focus:border-none text-gray-400" name='date' />
                    <input type="email" className="input w-full h-14 focus:border-none" defaultValue={user?.email} placeholder="Email"  name='email'/>
                    <input type="text" name='price' defaultValue={`$${service.price}`} className="input w-full h-14 focus:border-none"/>
                    <textarea className="md:col-span-2 textarea focus:border-none w-full h-60" placeholder="Your Message" name='message'></textarea>
                    <input type="submit" className='input text-xl font-semibold w-full md:col-span-2 bg-[#FF3811] text-white rounded-lg h-14 focus:border-none border-none ' value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;