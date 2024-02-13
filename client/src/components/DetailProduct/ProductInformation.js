import React,{memo, useCallback, useState} from 'react'
import { tabs } from '../../utils/contants'
import { Button, Ratings, VoteBar, VoteOption } from '..'
import { renderStar } from '../../utils/helper'
import DOMPurify from 'dompurify'

const ProductInformation = ({product}) => {

  const [idTabs, setIdTabs] = useState(1)
  const [isVote, setIsVote] = useState(false)

  const handleReview = useCallback(()=>{
    setIsVote(true)
  },[isVote])

  return (
    <div className='relative'>
      {isVote && <div className='absolute inset-0'>
        model
      </div>}
      <div className='flex gap-2 items-center relative bottom-[-1.2px]'>
        {tabs.map((el)=>(
          <span 
          onClick={()=>setIdTabs(el.id)} 
          key={el.id} 
          className={`px-4 py-3 border cursor-pointer ${el.id === idTabs ? 'bg-white border-b-0' : 'bg-gray-200'}`}>{el.title}</span>
        ))}
        <span 
          onClick={()=>setIdTabs(5)} 
          className={`px-4 py-3 border cursor-pointer ${5 === idTabs ? 'bg-white border-b-0' : 'bg-gray-200'}`}>Customer Review</span>
      </div>
      <div className='w-main border p-4'>
        {idTabs===1 && product?.description?.length > 1 && product?.description.map((el, index)=>(
          <li key={index}>{el}</li>
        ))}
        {idTabs===1 && product?.description?.length === 1 && <div className='text-sm line-clamp-[10]' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0])}}></div>}
        {tabs.some(el => el.id === idTabs) && tabs.find(el => el.id === idTabs)?.content}
        {idTabs === 5 && <div className='flex flex-col p-4'>
          <div className='flex'>
            <div className='flex items-center justify-center border w-1/3 flex-col border-red-500'>
                <span className='font-semibold text-3xl'>{`${product?.totalRatings}/5`}</span>
                <span className='flex'>{renderStar(product?.totalRatings)}</span>
                <span>{`${product?.ratings.length} reviewer`}</span>
            </div>
            <div className='w-2/3 flex flex-col'>
              {Array.from(Array(5).keys()).reverse().map(el => (
                <VoteBar key={el} number={el+1} countRatings={5} ratingTotal={2}/>
              ))}
            </div>
          </div>
          {!isVote && 
          <div className='flex flex-col justify-center items-center p-4 gap-2'>
            <span>Do you like to review this product ?</span>
            <Button handleOnClick={handleReview}>Review now!</Button>
          </div>}
          <div className='mt-8'>{product?.ratings?.map((el)=>(
            <div className='border-b border-black py-4 flex flex-col gap-2'>
              <span className='flex'>{renderStar(el.star)}</span>
              <span>{el?.comment}</span>
            </div>
          ))}</div>
        </div>}
      </div>
    </div>
  )
}

export default memo(ProductInformation)