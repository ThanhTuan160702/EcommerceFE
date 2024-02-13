import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { getBase64 } from '../../utils/helper';
import { apiUpdateCurrent } from '../../apis/user'
import { getUser } from '../../store/user/asyncAction'
import { Loading } from '../../components';
import avatarDefault from '../../assets/avatarDefault.jpg'
import { phoneNumberRegex } from '../../utils/helper';

const Personal = () => {

  const { current } = useSelector(state => state.user)
  const [preview, setPreview] = useState(null)
  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState({
    avatar: null
  })

  const [updateUser, setUpdateUser] = useState({
    firstname: current.firstname,
    lastname: current.lastname,
    email: current.email,
    mobile: current.mobile,
    address: current.address
  })

  useEffect(()=>{

  },[update])


  const handleUpdate = async() => {
    const checkPhone = phoneNumberRegex.test(updateUser.mobile)
    if(checkPhone === false){
      Swal.fire('Oops!','Phone is error !','error')
    }else if(updateUser.firstname === '' || updateUser.lastname === ''){
      Swal.fire('Oops!','Missing name !','error')
    }else{
      if(avatar?.avatar?.length > 0){
      const update = {...updateUser} 
      const formData = new FormData()
      for(let i of Object.entries(update)){
        formData.append(i[0], i[1])
      }
      formData.append('avatar', avatar.avatar[0])
      console.log([...formData])
      setIsLoading(true)
      const response = await apiUpdateCurrent(formData)
      setIsLoading(false)
      Swal.fire('Congratulation',response?.mes,'success').then(()=>{
        dispatch(getUser())
        setUpdate(!update)
      })
      }else{
        setIsLoading(true)
        const response = await apiUpdateCurrent({...updateUser})
        setIsLoading(false)
        Swal.fire('Congratulation',response?.mes,'success').then(()=>{
          dispatch(getUser())
          setUpdate(!update)
        })
      }
    }
  }

  const handleToBase64 = async(file) => {
    let images = null
    if(file[0].type !== 'image/png' && file[0].type !== 'image/jpeg'){
      Swal.fire('Oops!',`Invalid type`,'error')
    }else{
      const toBase64 = await getBase64(file[0])
      images = toBase64
    }
    setPreview(images)
  }

  useEffect(()=>{
    if(avatar.avatar){
      handleToBase64(avatar.avatar)
    }
  },[avatar.avatar])

  return (
    <div className='relative px-4 flex flex-col gap-4'>
      {isLoading && 
      <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50 bg-opacity'>
        <Loading/>
      </div>}
      <header className='text-3xl font-semibold py-4 border-b border-b-black'>Personal</header>
      <div className='w-full gap-2 p-2 flex flex-col justify-center items-center'>
        <div className='w-1/4 h-1/4 border-4 border-black overflow-hidden rounded-3xl'>
          <img src={current?.avatar || avatarDefault} alt='avatar' className='w-full h-full object-cover'/>
        </div>
        <span className='font-semibold text-3xl'>{`${current.firstname} ${current.lastname}`}</span>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex w-full gap-2'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold'>First Name</label>
              <input 
                type='text'
                name='firstname'
                id='firstname'
                className='border border-black p-1'
                placeholder='First name of user'
                value={updateUser?.firstname}
                onChange={el => setUpdateUser(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold'>First Name</label>
              <input 
                type='text'
                name='lastname'
                id='lastname'
                className='border border-black p-1'
                placeholder='Last name of user'
                value={updateUser?.lastname}
                onChange={el => setUpdateUser(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
          </div>
        </div>
        <div className='flex w-full gap-2'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold'>Email</label>
              <input 
                type='text'
                name='email'
                id='email'
                className='border border-black p-1 bg-white'
                value={updateUser?.email}
                disabled
              />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold'>Phone</label>
              <input 
                type='number'
                name='mobile'
                id='mobile'
                className='border border-black p-1'
                placeholder='mobile of user'
                value={updateUser?.mobile}
                onChange={el => setUpdateUser(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full'>
            <label className='font-semibold'>Address</label>
              <input 
                type='text'
                name='address'
                id='address'
                className='border border-black p-1'
                placeholder='address of user'
                value={updateUser?.address}
                onChange={el => setUpdateUser(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold'>Avatar</label>
            <input type='file' id='image' onChange={el => setAvatar({avatar: el.target.files})}/>
          </div>
          {preview && <div className='my-4 flex gap-2'>
              <div className='relative'>
                <img src={preview} alt='images' className='w-[200px] object-cover'/>
              </div>
          </div>}
      <button onClick={() => handleUpdate()} className='bg-main border border-black w-[150px] p-4 rounded-2xl text-white'>Update info</button>
    </div>
  )
}

export default Personal