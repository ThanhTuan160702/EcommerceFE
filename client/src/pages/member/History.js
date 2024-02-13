import React, { useCallback, useEffect, useState } from 'react'
import { apiDeleteOrder, apiGetOrder } from '../../apis/order'
import moment from 'moment'
import { AiFillDelete } from "react-icons/ai";
import { PaginationOrder } from '../../components';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formatPrice } from '../../utils/helper';
import Swal from 'sweetalert2';

const History = () => {

  const [order, setOrder] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [status, setStatus] = useState('');
  const [totalOrder, setTotalOrder] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const fetchOrders = async(queries) => {
    const response = await apiGetOrder({...queries, limit: 4})
    if(response.success){
      setOrder(response.mes)
      setTotalOrder(response.counts)
    }
  }

  const handleChangeCurrentPage = useCallback((key) =>{
    if(key === '+' ){
      setCurrentPage(prev => prev + 1)
    }else{
      setCurrentPage(prev => prev - 1)
    }
  },[currentPage])

  const handleCurrentPage = useCallback((value) => {
    setCurrentPage(value)
  },[currentPage])

  useEffect(()=>{ 
    fetchOrders({status: status, page: currentPage})
  },[currentPage])

  useEffect(()=>{
    const queries = Object.fromEntries([...params])
    if(status === "All" || status === ''){
      delete queries.status
    }
    fetchOrders({...queries})
    window.scrollTo(0, 0)
  },[params])

  useEffect(()=>{
    if(status){
      setCurrentPage(1)
      navigate({
        pathname: location.pathname,
        search: createSearchParams({status}).toString()
      })
  }
  },[status])

  const handleDelete = (oid) => {
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure about that bro ?',
      showCancelButton: true
    }).then(async(result) => {
      if(result.isConfirmed){
        const response = await apiDeleteOrder(oid)
        if(response?.success){
          Swal.fire('Congratulation',response?.mes,'success').then(()=>{
            const queries = Object.fromEntries([...params])
            if(status === "All" || status === ''){
              delete queries.status
            }
            fetchOrders({...queries})
          })
        }
      }
    })
  }

  return (
    <div className='w-full'>
      <h1 className='flex items-center justify-between h-[75px] text-3xl font-bold px-4 border-b border-b-black'>History</h1>
      <div className='px-4'>
        <div className='flex justify-end py-2'>
            <select
            className='p-2'
            value={status}
            onChange={el => {setStatus(el.target.value)}}
            >
              <option>All</option>
              <option>Processing</option>
              <option>Successed</option>
              <option>Cancelled</option>
            </select>
          </div>
        <div className='w-full'>
              <div className='flex gap-2 border border-black bg-blue-600'>
                <span className='py-2 w-[30px] flex justify-center'>#</span>
                <span className='py-2 w-[50%]'>Products</span>
                <span className='py-2 w-[10%]'>Status</span>
                <span className='py-2 w-[15%]'>Total</span>
                <span className='py-2 w-[10%]'>Created At</span>
                <span className='py-2 w-[10%]'>Action</span>
              </div>
              <div>
                {order?.map((el, index) => (
                  <div className='flex gap-2 border border-black border-t-0 items-center'>
                    {<span className='py-2 w-[30px] flex justify-center'>{currentPage > 1 ? index + (currentPage*5) - 5 : index + 1 }</span>}
                      <span className='py-2 w-[50%] flex flex-col max-w-[600px]'>
                      {el.products.map((e)=>(
                        <span>{`• ${e.product.title} - ${e.color} x${e.quantity}`}
                      </span>
                      ))}
                    </span>
                    <span className={`${el.status === "Processing" ? 'text-yellow-500 font-bold py-2 w-[10%]' : el.status === "Successed" ? 'text-green-500 font-bold py-2 w-[10%]' : 'text-red-500 font-bold py-2 w-[10%]'}`}>{el.status}</span>
                    <span className='py-2 w-[15%]'>{formatPrice(el?.products.reduce((sum, el)=> sum + Number(el.product.price * el.quantity), 0))} VNĐ</span>
                    <span className='py-2 w-[10%]'>{moment(el.createdAt).format('DD/MM/YYYY')}</span>
                    <span className='py-2 flex gap-1 w-[10%]'>
                      <span onClick={() => {handleDelete(el._id)}} className='p-1 border border-black cursor-pointer flex items-center justify-center bg-red-500'><AiFillDelete /> Delete</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {<div className='flex justify-end'>
              <PaginationOrder totalPage={totalOrder} currentPage={currentPage} handleChangeCurrentPage={handleChangeCurrentPage} handleCurrentPage={handleCurrentPage}/>
            </div>}
        </div>
    </div>
  )
}

export default History