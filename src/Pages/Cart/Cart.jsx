import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContextProvider/contextContainer";
import CartDetails from "./CartDetails";
import axios from "axios";

const Cart = () => {
    const { user } = useContext(AuthContext)
    const [carts, setCarts] = useState([]);
    const url = `${import.meta.env.VITE_API_URL}/bookings?email=${user?.email}`
    useEffect(() => {
        axios.get(url ,{withCredentials: true})
            .then(res => {
                setCarts(res.data)
            })
    }, [url])

    const handleDelete = (id) => {
        const proceed = confirm("Are You Sure You Want To Delete : ")
        if (proceed) {
            fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Data deleted SuccessFully")
                        const remaining = carts.filter(cart=> cart._id != id)
                        setCarts(remaining)
                    }
                })
        }
    }


    const handleUpdate = (id) =>{
        fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`,{
            method: "PATCH",
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({status : 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount >0 ){
                const remaining = carts.filter(cart => cart._id !== id)
                const updated = carts.find(cart => cart._id == id)
                updated.status = "confirm"
                setCarts([updated , ...remaining])
            }
        })
    }
    

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="text-center">Image</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart) => <CartDetails key={cart._id} cart={cart} handleDelete={handleDelete} handleUpdate={handleUpdate}></CartDetails>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Cart;