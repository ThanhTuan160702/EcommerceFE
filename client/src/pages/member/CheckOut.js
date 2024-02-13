import React, { useEffect, useState } from 'react'
import payment from '../../assets/payment.svg'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../utils/helper';
import Paypal from '../../components/Paypal/Paypal';
import { getUser } from '../../store/user/asyncAction'
import { useNavigate } from 'react-router-dom';


const CheckOut = () => {

  const { current } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(()=>{
    if(isSuccess){
      dispatch(getUser())
    }
  },[isSuccess])

  console.log(isSuccess)

  return (
    <div className='p-8 w-full flex h-full max-h-screen overflow-y-auto gap-6'>
      <div className='w-[40%] flex justify-center items-center flex-col text-3xl'>
        <img src={payment} alt='payment' className='h-[70%] object-contain flex justify-center items-center'/>
      </div>
      <div className='flex flex-col items-center gap-6 w-[60%]'>
        <h1 className='text-2xl font-bold'>CheckOut your order</h1>
        <table className='table-auto w-full'>
          <thead>
            <tr className='border bg-gray-200'>
              <th className='text-left p-2'>Products</th>
              <th className='text-center p-2'>Quantity</th>
              <th className='text-center p-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {current?.cart.map((el)=>(
              <tr key={el.product._id}>
                <td className='border text-center'>{el.product.title}</td>
                <td className='border text-center'>{el.quantity}</td>
                <td className='border text-center'>{formatPrice(el.product.price * el.quantity)} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex gap-3'>
                    <span>Subtotal:</span>
                    <span>{formatPrice(current?.cart.reduce((sum, el)=> sum + Number(el.product.price * el.quantity), 0))} VNĐ</span>
                </div>
        <div className='w-full flex flex-col pb-4'>
          <label>INFORMATION ACCOUNT</label>
          <span>{`${current.firstname} ${current.lastname} - ${current.mobile}`}</span>
          <label>{`Your address: ${current.address}`}</label>
        </div>
        <div className='w-full h-full'>
          <Paypal setIsSuccess={setIsSuccess} payload={{products: current.cart, total: Math.round(+current?.cart.reduce((sum, el)=> sum + Number(el.product.price * el.quantity), 0)/23500), address: current.address, mobile: current.mobile}} amount={Math.round(+current?.cart.reduce((sum, el)=> sum + Number(el.product.price * el.quantity), 0)/23500)}/>
        </div>
      </div>
    </div>
  )
}

export default CheckOut