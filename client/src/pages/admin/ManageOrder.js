import React, { useCallback, useEffect, useState } from 'react'
import { apiGetOrders, apiUpdateOrder } from '../../apis/order'
import { PaginationOrder } from '../../components';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formatPrice } from '../../utils/helper';
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/user/asyncAction';

const ManageOrder = () => {

  const [order, setOrder] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusUpdate, setStatusUpdate] = useState('');
  const [status, setStatus] = useState('');
  const [idUpdate, setIdUpdate] = useState('')
  const [totalOrder, setTotalOrder] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const fetchOrders = async(queries) => {
    const response = await apiGetOrders({...queries, limit: 4})
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
    fetchOrders({ status, page: currentPage })
  },[currentPage, status])

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

  const handleEdit = (id) => {
    setIdUpdate(id)
  }

  const handleUpdateStatus = async(id, statusOrder) => {
    const response = await apiUpdateOrder(id,{update: statusOrder})
  }

  useEffect(()=>{
    if(statusUpdate.length > 0){
      handleUpdateStatus(idUpdate, statusUpdate)
      setIdUpdate('')
      setStatusUpdate('')
    }
  },[statusUpdate])

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if(status === "All" || status === ''){
      delete queries.status
    }
    fetchOrders({...queries})
  }, [statusUpdate]);

  return (
    <div className='w-full'>
      <h1 className='flex items-center justify-between h-[75px] text-3xl font-bold px-4 border-b border-b-black'>History</h1>
        <div className='flex justify-end px-4 py-2'>
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
          {order?.map((orderItem) => (
            <div className='px-4 py-2'>
              <div className='border border-black p-2'>
                  <div className='flex flex-col w-full'>
                      <div key={orderItem._id}>
                        <table className='border table-auto w-full'>
                          <thead>
                            <tr className='border bg-gray-200'>
                              <th className='text-left p-2'>Products</th>
                              <th className='text-center p-2'>Quantity</th>
                              <th className='text-center p-2'>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderItem?.products?.map((product) => (
                              <tr key={product._id}>
                                <td className='border text-start max-w-[300px]'>{`${product.product.title} - ${product.color}`}</td>
                                <td className='border text-center'>{product.quantity}</td>
                                <td className='border text-center'>{formatPrice(product.product.price * product.quantity)} VNĐ</td>
                              </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='flex gap-3 items-center justify-end py-2'>
                      <span>Subtotal:</span>
                      <span>{formatPrice(orderItem?.products.reduce((sum, el)=> sum + Number(el.product.price * el.quantity), 0))} VNĐ</span>
                    </div>
                    <div className='w-full flex flex-col'>
                      <div className='flex items-center gap-2'>
                        {(idUpdate === orderItem._id) 
                        ? 
                        <select value={orderItem.status} onChange={(e) => {setStatusUpdate(e.target.value)}}>
                          <option>Processing</option>
                          <option>Successed</option>
                          <option>Cancelled</option>
                        </select>
                        : 
                        <span 
                          className={`${orderItem.status === "Processing" ? 'text-yellow-500 font-bold' : orderItem.status === "Successed" ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}
                        >
                          {`Status: ${orderItem.status}`}
                        </span> 
                        }
                        <CiEdit size={25} className='cursor-pointer' onClick={()=> handleEdit(orderItem._id)}/>
                      </div>
                      <label className='text-xl italic'>INFORMATION ACCOUNT</label>
                      <span>{`${orderItem.orderBy.firstname} ${orderItem.orderBy.lastname} - ${orderItem.mobile}`}</span>
                      <label>{`Your address: ${orderItem.address}`}</label>
                    </div>
              </div>
            </div>
          ))}
        {<div className='flex justify-end px-4 py-2'>
          <PaginationOrder totalPage={totalOrder} currentPage={currentPage} handleChangeCurrentPage={handleChangeCurrentPage} handleCurrentPage={handleCurrentPage}/>
        </div>}
    </div>
  )
}

export default ManageOrder