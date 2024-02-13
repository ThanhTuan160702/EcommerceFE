import React,{memo, useEffect, useState} from 'react'
import { apiUpdateCart } from '../../apis'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/user/asyncAction'
import { toast } from 'react-toastify'

const ProductQuantity = ({quantityProduct, countProduct , pid, color, setIsLoading}) => {

    const [quantity, setQuantity] = useState(quantityProduct)
    const [isUpdating, setIsUpdating] = useState(false)
    const dispatch = useDispatch()

    const handleQuantity = (number)=>{
        if(!Number(number) || Number(number) < 0 || Number(number) > countProduct){ 
          return
        }else{
          setQuantity(number)
          setIsUpdating(true)
        }
      }

    
      const handleChangeQuantity = (text)=>{
        if(text==='-' && +quantity > 1){
          setQuantity((prevQuantity) => prevQuantity - 1);
          setIsUpdating(true)
        }
        if(text==='+'){
          setQuantity((prevQuantity) => prevQuantity + 1);
          setIsUpdating(true)
        }
      }

      const updateQuantity = async(quantity) => {
        setIsLoading(true)
        await apiUpdateCart({pid: pid, quantity: quantity, color: color})
        setIsLoading(false)
        dispatch(getUser())
        setIsUpdating(false)
      }

      useEffect(()=>{
        if(isUpdating){
          updateQuantity(quantity)
        }
      },[quantity, isUpdating])
      

  return (
    <div className='flex items-center'>
        <button onClick={()=>handleChangeQuantity('-')} className='py-1 cursor-pointer px-2 border-r-0 border border-black'>
          -
        </button>
        {/*<span onClick={()=>handleChangeQuantity('-')} className='py-1 cursor-pointer px-2 border border-black'>-</span>*/}
        <input className='py-1 px-2 outline-none w-[40px] text-center border border-black' type='text' value={quantity} onChange={e => handleQuantity(e.target.value)}/>
        {countProduct > quantity && <button onClick={()=>handleChangeQuantity('+')} className='py-1 cursor-pointer px-2 border-l-0 border border-black'>
          +
        </button>}
    </div>
  )
}

export default memo(ProductQuantity)