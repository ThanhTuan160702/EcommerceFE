import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../utils/helper'
import { Loading, ProductQuantity } from '../../components'
import { apiDeleteCart} from '../../apis'
import { getUser } from '../../store/user/asyncAction'
import { Link, useNavigate } from 'react-router-dom'
import { TiDelete } from "react-icons/ti";
import { BsCartX } from "react-icons/bs";
import path from '../../utils/path'
import Swal from 'sweetalert2'
import { apiUpdateCurrent } from '../../apis/user';
const phoneNumberRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;

const DetailCart = () => {

    const { current } = useSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const [addressShip, setAddressShip] = useState(current.address)
    const [mobileShip, setMobileShip] = useState(current.mobile)
    const [isChecked, setIsChecked] = useState(false)
    const { newProducts } = useSelector(state => state.products)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDelete = async(pid) => {
        const response = await apiDeleteCart(pid)
        if(response.success){
            dispatch(getUser())
        }
    }

    const handleOrder = async() => {
        const checkPhone = phoneNumberRegex.test(mobileShip)
        if(!addressShip){
            Swal.fire('Opps!','Please type address for order','error')
        }else if(!isChecked){
            Swal.fire('Opps!',`If you agree with the Shop's Personal Data Processing Policy, please check the box`,'error')
        }else if(!checkPhone){
            Swal.fire('Oops!','Phone is error !','error')
        }else{
            await apiUpdateCurrent({address: addressShip, mobile: mobileShip})
            dispatch(getUser())
            window.open(`/${path.CHECK_OUT}`, '_blank');
        }
    }

  return (
    <div className='w-full h-full relative px-4'>
        <header className='text-3xl font-semibold py-4 border-b border-b-black'>My Cart</header>
        <div className='flex items-center justify-center p-4'>
            {isLoading && 
            <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50 bg-opacity'>
                <Loading/>
            </div>}
            {current?.cart.length > 0 ?
            <div className='bg-gray-200 w-[700px]'>
            {current?.cart?.map((el)=>(
                <div className='border-b border-black p-4'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col justify-center items-center gap-1'>
                            <img src={el.product.images[0]} alt='img' className='w-20 h-20 flex justify-center items-center object-contain'/>
                            <span onClick={() => handleDelete(el.product._id)} className='flex justify-center cursor-pointer'><TiDelete size={20}/></span>
                        </div>
                        <div className='w-[600px] flex flex-col justify-between'>
                            <div className='flex justify-between'>
                                <div onClick={() => navigate(`/${(el.product.category).toLowerCase()}/${el.product._id}/${el.product.title}`)} className='overflow-hidden text-base whitespace-wrap text-ellipsis w-[450px] cursor-pointer hover:underline'>{el.product.title}</div>
                                <div className=''>{formatPrice(el.product.price * el.quantity)} VNĐ</div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div>{`Color: ${el.color}`}</div>  
                                {newProducts?.map((e) => {
                                    if(e._id === el.product._id){
                                        return <ProductQuantity quantityProduct={el.quantity} countProduct={e.quantity} pid={el.product._id} color={el.color} setIsLoading={setIsLoading}/>
                                    }
                                })} 
                            </div>
                        </div>
                    </div>
                </div>
            ))}
                <div className='p-4 justify-between flex'>
                    <span>Subtotal:</span>
                    <span>{formatPrice(current?.cart.reduce((sum, el)=> sum + Number(el.product.price * el.quantity), 0))} VNĐ</span>
                </div>
                <div className='w-full flex flex-col px-4 py-2'>
                    <label>Your mobile:</label>
                    <input type='Number' placeholder='Please type your mobile for check out' className='p-2 border border-black' value={mobileShip} onChange={(el) => setMobileShip(el.target.value)}/>
                </div>
                <div className='w-full flex flex-col px-4 py-2'>
                    <label>Your address:</label>
                    <input type='text' placeholder='Please type your address for check out' className='p-2 border border-black' value={addressShip} onChange={(el) => setAddressShip(el.target.value)}/>
                </div>
                <div className='flex px-4 py-2 gap-1'>
                    <input type='checkbox' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                    <span>Tôi đồng ý với Chính sách xử lý dữ liệu cá nhân của Shop</span>
                </div>
                <div className='flex justify-center items-center px-4 py-2'>
                    <button onClick={handleOrder} className=' bg-main p-4 rounded-sm'>Đặt Hàng</button>
                </div>
            </div>
            : 
            <div className='flex items-center justify-center flex-col py-10 gap-2'>
                <BsCartX size={100} color='red'/>
                <h1>There are no products in the cart</h1>
            </div>}
        </div>
    </div>
  )
}

export default DetailCart