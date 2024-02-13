import React,{ memo, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const InputForm = ({data, handleClose, handleSubmit, setEditProduct}) => {

    const {categories} = useSelector(state => state.app)
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(data?.category);

    const handleOnChangeBrand = (id) => {
        setSelectedCategory(id.target.value)
        setEditProduct(prev => ({...prev, category: id.target.value}))
    }

    useEffect(() => {
        const selectedCategoryData = categories.find(el => el.title === selectedCategory);
        setBrands(selectedCategoryData?.brand);
        setEditProduct(prev => ({...prev, brand: selectedCategoryData?.brand[0]}))
    }, [selectedCategory, categories]);

  return (
    <div className='flex flex-col'>
      <h1 className='uppercase font-bold flex justify-center p-4'>Chỉnh sửa sản phẩm</h1>
      <div className='flex gap-1'>
        <div className='flex flex-col justify-around gap-1'>
          <label htmlFor={data?.id}>Title: </label>
          <label htmlFor={data?.id}>Category: </label>
          <label htmlFor={data?.id}>Brand: </label>
          <label htmlFor={data?.id}>Price: </label>
          <label htmlFor={data?.id}>Quantity: </label>
          <label htmlFor={data?.id}>Color: </label>
          <label htmlFor={data?.id}>Images: </label>
          {data?.Gb && <label htmlFor={data?.id}>Gb: </label>}
        </div>
        <div className='flex flex-col w-[300px] gap-1'>
          <input 
            type='text'
            name='title'
            id={data?._id}
            className={`border border-black`}
            defaultValue={data?.title}
            onChange={el => setEditProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <select 
            type='text'
            id={data?._id}
            name='category'
            className={`border border-black`}
            defaultValue={data?.category}
            onChange={handleOnChangeBrand}
          >
            {categories?.map((el)=>(
                <option key={el._id}>{el.title}</option>
            ))}
          </select>
          <select
            type='text'
            id={data?._id}
            name='brand'
            className={`border border-black`}
            value={data?.brand}
            onChange={el => setEditProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
          >
            {brands?.map((el)=>(
                  <option key={el._id}>{el}</option>
                ))}
          </select>
          <input 
            type='number'
            id={data?._id}
            name='price'
            className={`border border-black`}
            defaultValue={data?.price}
            onChange={el => setEditProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <input
            id={data?._id}
            name='quantity'
            className={`border border-black`}
            value={data?.quantity} // Sử dụng thuộc tính value thay vì defaultValue để thiết lập giá trị mặc định
            onChange={el => setEditProduct(prev => ({ ...prev, [el.target.name]: el.target.value}))}
          />
          <input
            id={data?._id}
            name='color'
            className={`border border-black`}
            value={data?.color} // Sử dụng thuộc tính value thay vì defaultValue để thiết lập giá trị mặc định
            onChange={el => setEditProduct(prev => ({ ...prev, [el.target.name]: el.target.value}))}
          />
          {data?.Gb && 
          <input
            id={data?._id}
            name='Gb'
            className={`border border-black`}
            value={data?.Gb} // Sử dụng thuộc tính value thay vì defaultValue để thiết lập giá trị mặc định
            onChange={el => setEditProduct(prev => ({ ...prev, [el.target.name]: el.target.value}))}
          />}
        </div>
      </div>
      <div className='flex w-[50px] h-[50px]'>
        {data?.images.map((el)=>(
          <img src={el} alt='images' />
        ))}
      </div>
      <div className='flex justify-end gap-2 py-2'>
        <button onClick={()=> handleSubmit()} className='bg-blue-500 px-2 py-1 border border-black rounded-2xl'>Submit</button>
        <button className='bg-red-500 px-2 py-1 border border-black rounded-2xl' onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}

export default memo(InputForm)
