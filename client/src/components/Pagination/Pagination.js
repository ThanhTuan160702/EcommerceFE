import React, { memo, useEffect} from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigate, useNavigate, useSearchParams, useParams, createSearchParams } from 'react-router-dom';

const Pagination = ({totalPage, currentPage, handleChangeCurrentPage, handleCurrentPage}) => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { category } = useParams()

  useEffect(()=>{
    const queries = Object.fromEntries([...params])
    if(Number(currentPage)) queries.page = currentPage
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString()
    })
  },[currentPage])
  
  return (
    <div className='py-2 flex gap-2 items-center'>
      <span>1</span>
      <button onClick={() => handleChangeCurrentPage('-')} className='py-1 cursor-pointer px-2'>
          <IoIosArrowBack />
      </button>
      <input className='w-10 border border-black text-center' value={currentPage} type='text' onChange={e => handleCurrentPage(e.target.value)}/>
      <button onClick={() => handleChangeCurrentPage('+')} className='py-1 cursor-pointer px-2 borde' disabled={currentPage===Math.ceil(totalPage/4)}>
          <IoIosArrowForward />
      </button>
      <span>{Math.ceil(totalPage/4) < 1 ? 1 : Math.ceil(totalPage/4)}</span>
    </div>
  )
}

export default memo(Pagination)