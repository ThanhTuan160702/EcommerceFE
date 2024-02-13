import React, { useEffect, useState, useCallback } from 'react'
import { apiDeleteUser, apiGetAllUser, apiUpdateUser } from '../../apis'
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import moment from 'moment';
import { PaginationUser, InputForm} from '../../components/index'
import useDebounce from '../../hooks/useDebounce';
import { ValidateEmail } from '../../utils/helper'
import Swal from 'sweetalert2';

const ManageUser = () => {
  const [users, setUsers] = useState(null)
  const [email, setEmail] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [editUser, setEditUser] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [update, setUpdate] = useState(false)

  const fetch = async(params) => {
    const response = await apiGetAllUser({...params, page: currentPage})
    if(response?.success){
      setUsers(response)
    }
  } 

  const searchEmail = useDebounce(email, 500)
  
  const handleDelete = (uid) => {
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure about that bro ?',
      showCancelButton: true
    }).then(async(result) => {
      if(result.isConfirmed){
        const response = await apiDeleteUser(uid)
        if(response?.success){
          Swal.fire('Congratulation',response?.mes,'success').then(()=>{
            render()
          })
        }
      }
    })
  }

  useEffect(()=>{
    const params = {}
    if(searchEmail){
      params.email = searchEmail
      setCurrentPage(1)
    } 
    fetch(params)
  },[searchEmail, currentPage, update])

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

  const handleClose = useCallback(()=> {
    setIsEdit(false)
  },[isEdit])

  const render = useCallback(()=>{
    setUpdate(!update)
  },[update])

  const Submit = useCallback(async()=>{
    if(editUser?.email.length === 0 || editUser?.firstname.length === 0 || editUser?.lastname.length === 0){
      Swal.fire('Oops!',`Information can't be empty`,'error')
    }else if(ValidateEmail(editUser?.email)){
      Swal.fire('Oops!',`Invalid email!`,'error')
    }else{
      const response = await apiUpdateUser(editUser, editUser?._id)
      Swal.fire('Congratulation',response?.mes,'success').then(()=>{
        handleClose()
        render()
      })
    }
  },[editUser])

  return (
    <div className='w-full h-full relative'>
      { isEdit ? 
        <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50 bg-opacity h-full'>
          <div className='bg-white w-[500px] flex flex-col items-center justify-center rounded-2xl'>
            <InputForm data={editUser} handleClose={handleClose} handleSubmit={Submit} setEditUser={setEditUser}/>
          </div>
        </div>
        : ''}
      <h1 className='flex items-center justify-between h-[75px] text-3xl font-bold px-4 border-b border-b-black'>
        <span>Manage User</span>
      </h1>
      <div className='px-4'>
        <div className='flex justify-end py-2'>
          <input
          className='p-2'
          name={'email'}
          value={email}
          onChange={el => setEmail(el.target.value)}
          placeholder='Search email...'
          />
        </div>
        <div className='mb-6 w-full'>
            <div className='flex gap-1 border border-black bg-blue-600'>
              <span className='py-2 w-[3%] flex justify-center'>#</span>
              <span className='py-2 w-[25%]'>Email</span>
              <span className='py-2 w-[10%]'>Firstname</span>
              <span className='py-2 w-[10%]'>Lastname</span>
              <span className='py-2 w-[7%]'>Role</span>
              <span className='py-2 w-[10%]'>Phone</span>
              <span className='py-2 w-[7%]'>Status</span>
              <span className='py-2 w-[10%]'>Created At</span>
              <span className='py-2 w-[10%]'>Actions</span>
            </div>
            <div>
              {users?.mes?.map((el, index)=>(
                <div className='flex gap-1 border border-black border-t-0 items-center'>
                  <span className='py-2 w-[3%] flex justify-center'>{index + 1}</span>
                  <span className='py-2 w-[25%]'>{el.email}</span>
                  <span className='py-2 w-[10%]'>{el.firstname}</span>
                  <span className='py-2 w-[10%]'>{el.lastname}</span>
                  <span className='py-2 w-[7%]'>{+el.role === 9999 ? 'Admin' : 'User'}</span>
                  <span className='py-2 w-[10%]'>{el.mobile}</span>
                  <span className='py-2 w-[7%]'>{el.isBlocked ? 'Block' : 'Active'}</span>
                  <span className='py-2 w-[10%]'>{moment(el.createdAt).format('DD/MM/YYYY')}</span>
                  <span className='py-2 w-[10%] flex gap-2'>
                    <span onClick={() => handleDelete(el?._id)} className='p-1 border border-black cursor-pointer flex items-center justify-center bg-red-500'><AiFillDelete /> Delete</span>
                    <span onClick={() => {setEditUser(el); setIsEdit(true)}} className='p-1 border border-black cursor-pointer flex items-center justify-center bg-yellow-500'><FaRegEdit /> Edit</span>
                  </span>
                </div>
              ))}
            </div>
        </div>
          <div className='flex justify-end'>
            <PaginationUser totalPage={users?.counts} currentPage={currentPage} handleChangeCurrentPage={handleChangeCurrentPage} handleCurrentPage={handleCurrentPage}/>
          </div>
      </div>
    </div>
  )
}

export default ManageUser