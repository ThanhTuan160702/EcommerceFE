import React from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from '../../store/app/appSlice';
import { formatPrice } from '../../utils/helper';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { apiDeleteCart } from '../../apis';
import { getUser } from '../../store/user/asyncAction'
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';

const Cart = () => {

    const { current } = useSelector(state => state.user)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleDelete = async(pid) => {
        const response = await apiDeleteCart(pid)
        if(response.success){
            dispatch(getUser())
        }
    }

  return (
    <div onClick={(e) => {e.stopPropagation()}} className='fixed w-[500px] h-screen grid grid-rows-6 bg-black text-white p-6'>
        <header className='border-b border-white font-bold text-3xl row-span-1 h-full flex items-center justify-between'>
            <span>Your Cart</span>
            <span onClick={() => dispatch(showCart())} className='cursor-pointer'><IoCloseCircle /></span>
        </header>
        <section className='flex flex-col row-span-4 gap-3 h-full max-h-full overflow-y-auto py-3'>
            {!current?.cart && <span>Your cart is empty.</span>}
            {current?.cart && current?.cart.map((el)=>(
                <div key={el.product} className='flex gap-2 items-center bg-black p-1'>
                    <div className='flex gap-2'>
                        <img src={el.product.images[0]} className='w-[64px] h-[64px] object-cover' alt='images'/>
                        <div className='flex flex-col'>
                            <span className='overflow-hidden text-base whitespace-nowrap text-ellipsis w-[290px]'>{el.product.title}</span>
                            <span className='text-sm'>{`Color: ${el.color}`}</span>
                            <span className='text-sm'>{`${formatPrice(el.product.price)} VNĐ`}</span>
                        </div>
                    </div>
                    <span onClick={() => handleDelete(el.product._id)} className='w-8 rounded-full hover:bg-gray-700 cursor-pointer h-8 flex justify-center items-center'><RiDeleteBin5Fill size={20}/></span>
                </div>
            ))}
        </section>
        <div className='row-span-1 h-full'>
            <div className='flex items-center my-4 justify-between pt-4 border-t gap-2'>
                <span>Subtotal:</span>
                <span>{`${formatPrice(current?.cart?.reduce((sum,el) => sum + Number(el.product?.price), 0))} VNĐ`}</span>
            </div>
            <button onClick={() => navigate(`${path.MEMBER}/${path.DETAIL_CART}`)} className='bg-main p-2 rounded-2xl w-full'>Shopping Cart</button>
        </div>
    </div>
  )
}

export default Cart