import React, {useState, useCallback, useEffect} from 'react'
import { InputFill, Button, Loading } from '../../components/index'
import { apiRegister, apiLogin, apiForgot } from '../../apis/user'
import { useNavigate, Link, useSearchParams, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {loggedin} from '../../store/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import path from '../../utils/path'

const Login = () => {

  
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn, current } = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  
  const [payload, setPayload] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  
  const resetPayload = () => {
    setPayload({
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })
  }

  const [register, setRegister] = useState(false)
  const [isForgot, setIsForgot] = useState(false)
  const [email, setEmail] = useState('')

  const handleForgot = async() => {
      const response = await apiForgot({email})
      if(response?.success){
        toast.success(response?.mes)
      }else{
        toast.error(response?.mes)
      }
  }

  const handleSubmit = useCallback(async()=>{
      const { lastname, firstname, passwordConfirm, ...data } = payload
      if(register){
        if(data.password === passwordConfirm){
          setIsLoading(true)
          const reponse = await apiRegister(payload)
          setIsLoading(false)
          if(reponse?.success){
            Swal.fire('Congratulation',reponse?.mes,'success').then(()=>{
              setRegister(false)
              resetPayload()
            })
          }else{
            Swal.fire('Oops!',reponse?.mes,'error')
          }
        }else{
          Swal.fire('Oops!','Password Mismatch Error','error')
        }
      }else{
        setIsLoading(true)
        const login = await apiLogin(data)
        setIsLoading(false)
        if(login?.success){
          Swal.fire('Congratulation','Logged in successfully','success').then(()=>{
            dispatch(loggedin({isLoggedIn: true,token: login.accessToken, userData: login.userData}))
            if(searchParams.get('redirect')){
              navigation(`${searchParams.get('redirect')}`)
            }else{
              navigation('/')
            }
          })
        }else{
          Swal.fire('Oops!',login?.mes,'error')
        }
      }
    },[payload,register])

    const handleFormSubmit = (event) => {
      event.preventDefault();
      handleSubmit();
    };

    if(isLoggedIn || current){ 
      return <Navigate to={`/${path.HOME}`} replace={true} />
    }
  
  return (
    <div className='w-screen h-screen relative'>
      {isLoading && 
      <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50 bg-opacity'>
        <Loading/>
      </div>}
      <img 
      src='https://images.unsplash.com/photo-1500053857731-701d06fac2fa?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
      alt='images'
      className='w-full h-full object-cover'
      />
      {isForgot && <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50'>
        <div className='p-8 bg-white rounded-md min-w-[500px] flex flex-col min-h-[310px] gap-10'>
          <h1 className='text-[30px] font-bold text-gray-900 justify-center flex items-center'>Quên mật khẩu</h1>
          <label htmlFor='email'>Enter your email:</label>
          <input type='text' id='email'className='pb-2 border-b outline-none'placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
          <div className='flex justify-end gap-2'>
            <Button children='Submit' handleOnClick={handleForgot}/>
            <Button children='Close' handleOnClick={()=>{setIsForgot(false)}}/>
        </div>
        </div>
      </div>}
      <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center'>
        <div className='p-8 bg-opacity rounded-md min-w-[500px]'>
          <h1 className='text-[30px] font-bold text-black justify-center flex items-center'>{register ? "Đăng ký" : "Đăng nhập "}</h1>
          {register && 
          <div className='flex items-center gap-2'>
            <InputFill
            value={payload.firstname}
            setValue={setPayload}
            nameKey='firstname'
            placeholder='First name'
            />
            <InputFill
            value={payload.lastname}
            setValue={setPayload}
            nameKey='lastname'
            placeholder='Last name'
            />
          </div>
          }
          <InputFill
          value={payload.email}
          setValue={setPayload}
          nameKey='email'
          placeholder='Email'
          />
          <InputFill
          type='password'
          value={payload.password}
          setValue={setPayload}
          nameKey='password'
          placeholder='Password'
          />
          {register && <InputFill
          type='password'
          value={payload.passwordConfirm}
          setValue={setPayload}
          nameKey='passwordConfirm'
          placeholder='Password Confirm'
          />}
          <Button 
          children={register ? 'Register' : 'Login'}
          style='w-full bg-blue-500 rounded-md text-white h-[40px] mt-2'
          handleOnClick={handleSubmit} 
          />
          <div className='mt-4'>
            <div className='justify-between flex'>
              <span className='cursor-pointer hover:underline' onClick={()=>{setIsForgot(true)}}>{!register ? 'Forgot your account ?' :''}</span>
              {!register && <span className='cursor-pointer hover:underline' onClick={()=> {setRegister(true); resetPayload()}}>Create account</span>}
              </div>  
              {register && <span className='cursor-pointer hover:underline justify-center items-center flex' onClick={()=> {setRegister(false); resetPayload()}}>Go login</span>}
          </div>
          {!register && <Link className='flex justify-center cursor-pointer hover:underline' to={`/${path.HOME}`}>Go Home</Link>}
        </div>
      </div>
    </div>
  )
} 

export default Login