import React, { useCallback, useEffect, useState } from 'react'
import { apiDeleteCart, apiGetProducts } from '../../apis'
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { InputFormProduct, PaginationProduct } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { apiDeleteProduct } from '../../apis';
import Swal from 'sweetalert2';
import { apiUpdateProduct } from '../../apis';
import UpdateProduct from './UpdateProduct';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/user/asyncAction';

const ManageProduct = () => {

  const [products, setProducts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [title, setTitle] = useState('')
  const [update, setUpdate] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const dispatch = useDispatch()

  const fetch = async(params) => {
    const response = await apiGetProducts({...params, limit: 10, page: currentPage})
    if(response?.success){
      setProducts(response)
    }
  }

  const handleDeleteProductCart = async(pid) => {
    const response = await apiDeleteCart(pid)
    if(response.success){
        dispatch(getUser())
    }
}

  const handleDelete = (pid) => {
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure about that bro ?',
      showCancelButton: true
    }).then(async(result) => {
      if(result.isConfirmed){
        const response = await apiDeleteProduct(pid)
        handleDeleteProductCart(pid)
        if(response?.success){
          Swal.fire('Congratulation',response?.mes,'success').then(()=>{
            render()
          })
        }
      }
    })
  }


  const render = useCallback(()=>{
    setUpdate(!update)
  },[update])

  const searchTitle = useDebounce(title, 500)

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
    const params = {}
    if(searchTitle){
      params.title = searchTitle
      setCurrentPage(1)
    } 
    fetch(params)
  },[searchTitle, currentPage, update])

  return (
    <div className='w-full h-full relative'>
      { editProduct ? 
        <div className='absolute inset-0 min-h-screen bg-white'>
          {<UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct}/>}
        </div>
        : ''}
      <h1 className='flex items-center justify-between h-[75px] text-3xl font-bold px-4 border-b border-b-black'>
        <span>Manage Products</span>
      </h1>
      <div className='px-4'>
        <div className='flex justify-end py-2'>
          <input
          className='p-2'
          name={'title'}
          value={title}
          onChange={el => setTitle(el.target.value)}
          placeholder='Search title...'
          />
        </div>
      </div>  
      <div className='px-4'>
      <div className='mb-6 w-full'>
            <div className='flex mt-4 gap-2 border border-black bg-blue-600'>
              <span className='py-2 w-[30px] flex justify-center'>#</span>
              <span className='py-2 w-[100px]'>Image</span>
              <span className='py-2 w-[200px]'>Title</span>
              <span className='py-2 w-[110px]'>Category</span>
              <span className='py-2 w-[100px]'>Brand</span>
              <span className='py-2 w-[100px]'>Price</span>
              <span className='py-2 w-[100px]'>Quantity</span>
              <span className='py-2 w-[120px]'>Color</span>
              <span className='py-2 w-[50px]'>Sold</span>
              <span className='py-2 w-[100px]'>Actions</span>
            </div>
            <div>
              {products?.mes?.map((el, index) => (
                <div className='flex gap-2 border border-black border-t-0 items-center'>
                  <span className='py-2 w-[30px] flex justify-center'>{currentPage > 1 ? index + (currentPage*10) - 10 + 1 : index + 1 }</span>
                  <span className='py-2 w-[100px]'>
                    <img src={el.images[0]} alt='images'/>
                  </span>
                  <span className='py-2 w-[200px]'>{el.title}</span>
                  <span className='py-2 w-[110px]'>{el.category}</span>
                  <span className='py-2 w-[100px]'>{el.brand}</span>
                  <span className='py-2 w-[100px]'>{el.price}</span>
                  <span className='py-2 w-[100px]'>{el.quantity}</span>
                  <span className='py-2 w-[120px]'>{el.color}</span>
                  <span className='py-2 w-[50px]'>{el.sold}</span>
                  <span className='py-2 flex gap-1 w-[100px]'>
                    <span onClick={() => {handleDelete(el._id)}} className='p-1 border border-black cursor-pointer flex items-center justify-center bg-red-500'><AiFillDelete /> Delete</span>
                    <span onClick={() => {setEditProduct(el); setIsEdit(true)}} className='p-1 border border-black cursor-pointer flex items-center justify-center bg-yellow-500'><FaRegEdit /> Edit</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end'>
            <PaginationProduct totalPage={products?.counts} currentPage={currentPage} handleChangeCurrentPage={handleChangeCurrentPage} handleCurrentPage={handleCurrentPage}/>
          </div>
      </div>
    </div>
  )
}

export default ManageProduct