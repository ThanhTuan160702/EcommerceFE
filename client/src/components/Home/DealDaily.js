import React, { useState, useEffect, memo } from 'react'
import { FaStar } from "react-icons/fa";
import { apiGetProducts } from '../../apis/product';
import { formatPrice, renderStar } from '../../utils/helper';
import { MdOutlineMenu } from "react-icons/md";
import { Countdown } from '../index'
import { useNavigate } from 'react-router-dom';



const DealDaily = () => {

    const [dealDaily, setDealDaily] = useState(null)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const navigate = useNavigate()
    var currentDate = new Date();
    const hoursNow = 23 - currentDate.getHours()
    const minutesNow = 59 - currentDate.getMinutes()
    const secondsNow = 59 - currentDate.getSeconds()
    const fetchData = async() => {
        const response = await apiGetProducts({limit: 1, page: 1})
        if(response.success){
            setDealDaily(response.mes[0])
            setHours(hoursNow)
            setMinutes(minutesNow)
            setSeconds(secondsNow)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        let idInterval = setInterval(()=>{
            if(seconds > 0){
                setSeconds(prev => prev - 1)
            }else{
                if(minutes > 0){
                    setMinutes(prev => prev - 1)
                    setSeconds(59)
                }else{
                    if(hours > 0){
                        setHours(prev => prev - 1)
                        setMinutes(59)
                        setSeconds(59)
                    }
                }
            }
            
        },1000)
        return () => {
            clearInterval(idInterval)
        }
    },[seconds, minutes, hours])

  return (
    <div className='w-full border flex-auto'>
        <div className='flex items-center justify-between p-4'>
            <span className='flex-1'><FaStar color='red' size={20}/></span>
            <span className='flex-2 font-semibold text-[20px] text-center'>Deal Dailys</span>
            <span className='flex-1'></span>
        </div>
        <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
            <img src={dealDaily?.images[0]} alt='images' className='w-full object-contain'/>
            <span className='flex'>{renderStar(dealDaily?.totalRatings)}</span>
            <span className='line-clamp-1'>{dealDaily?.title}</span>
            <span>{`${formatPrice(dealDaily?.price)} VND`}</span>
        </div>
        <div className='px-4 mt-4'>
            <div className='flex justify-center gap-2 items-center mb-4'>
                <Countdown unit={"hours"} number={hours}/>
                <Countdown unit={"minutes"} number={minutes}/>
                <Countdown unit={"seconds"} number={seconds}/>
            </div>
            <button onClick={() => {navigate(`${dealDaily?.category.toLowerCase()}/${dealDaily?._id}/${dealDaily?.title}`)}} className='flex bg-main hover:bg-gray-700 gap-2 w-full items-center justify-center text-white font-medium py-2'>
                <MdOutlineMenu/>
                <span>Options</span>
            </button>
        </div>
    </div>
  )
}

export default memo(DealDaily)