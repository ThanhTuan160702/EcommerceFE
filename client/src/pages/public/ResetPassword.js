import React, { useState } from 'react'
import { Button } from '../../components'
import { useParams, useNavigate } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import Swal from 'sweetalert2'

const ResetPassword = () => {

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordconfirm] = useState('')
  const { token } = useParams()
  const navigation = useNavigate()

  const handleResetPassword = async() => {
    if(password===passwordConfirm){
      const response = await apiResetPassword({password, token})
      if(response?.success){
        Swal.fire('Congratulation!','Change password is successfully','success').then(()=>{
          navigation('/login')
        })
      }else{
        Swal.fire('Oops!',response?.mes,'error')
      }
    }else{
      Swal.fire('Oops!','Password Mismatch Error','error')
    }
  }


  return (
    <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50'>
    <div className='p-8 bg-white rounded-md min-w-[500px] flex flex-col min-h-[310px] gap-10'>
      <h1 className='text-[30px] font-bold text-gray-900 justify-center flex items-center'>Quên mật khẩu</h1>
      <label htmlFor='password'>Enter your new password:</label>
      <input type='password' id='password'className='pb-2 border-b outline-none'placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
      <input type='password' id='passwordconfirm'className='pb-2 border-b outline-none'placeholder='Password Confirm' value={passwordConfirm} onChange={e=>setPasswordconfirm(e.target.value)}/>
      <div className='flex justify-end gap-2'>
        <Button name='Submit' handleOnClick={handleResetPassword}/>
    </div>
    </div>
  </div>
  )
}

export default ResetPassword