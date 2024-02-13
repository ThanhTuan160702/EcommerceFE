import React,{ memo} from 'react'

const InputForm = ({data, handleClose, handleSubmit, setEditUser}) => {

  return (
    <div className='flex flex-col'>
      <h1 className='uppercase font-bold flex justify-center p-4'>Chỉnh sửa tài khoản</h1>
      <div className='flex gap-1'>
        <div className='flex flex-col justify-around gap-1'>
          <label htmlFor={data?.id}>Email: </label>
          <label htmlFor={data?.id}>Firstname: </label>
          <label htmlFor={data?.id}>Lastname: </label>
          <label htmlFor={data?.id}>Phone: </label>
          <label htmlFor={data?.id}>Role: </label>
          <label htmlFor={data?.id}>Active: </label>
        </div>
        <div className='flex flex-col w-[300px] gap-1'>
          <input 
            type='text'
            name='email'
            id={data?._id}
            className={`border border-black`}
            defaultValue={data?.email}
            onChange={el => setEditUser(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <input 
            type='text'
            id={data?._id}
            name='firstname'
            className={`border border-black`}
            defaultValue={data?.firstname}
            onChange={el => setEditUser(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <input 
            type='text'
            id={data?._id}
            name='lastname'
            className={`border border-black`}
            defaultValue={data?.lastname}
            onChange={el => setEditUser(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <input 
            type='number'
            id={data?._id}
            name='mobile'
            className={`border border-black`}
            defaultValue={data?.mobile}
            onChange={el => setEditUser(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <select
          id={data?._id}
          name='role'
          className={`border border-black`}
          value={data?.role === '6666' ? 'User' : 'Admin' } // Sử dụng thuộc tính value thay vì defaultValue để thiết lập giá trị mặc định
          onChange={el => setEditUser(prev => ({ ...prev, [el.target.name]: el.target.value === 'Admin' ? '9999' : '6666'}))}
          >
            <option>Admin</option>
            <option>User</option>
          </select>
          <select
          id={data?._id}
          name='isBlocked'
          className={`border border-black`}
          value={!data?.isBlocked ? 'Active' : 'Block'} // Sử dụng thuộc tính value thay vì defaultValue để thiết lập giá trị mặc định
          onChange={el => setEditUser(prev => ({ ...prev, [el.target.name]: el.target.value === 'Active' ? false : true}))}
          >
            <option>Active</option>
            <option>Block</option>
          </select>
        </div>
      </div>
      <div className='flex justify-end gap-2 py-2'>
        <button onClick={()=> handleSubmit()} className='bg-blue-500 px-2 py-1 border border-black rounded-2xl'>Submit</button>
        <button className='bg-red-500 px-2 py-1 border border-black rounded-2xl' onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}

export default memo(InputForm)
