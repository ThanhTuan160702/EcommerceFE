import React,{ memo, useCallback, useEffect, useState } from 'react'
import { MarkdownEditor } from '../../components'
import { useSelector } from 'react-redux'
import { FaTrashAlt } from "react-icons/fa";
import { getBase64 } from '../../utils/helper';
import Swal from 'sweetalert2';
import { apiUpdateProduct } from '../../apis';
import { Loading } from '../../components'
import { toast } from 'react-toastify';

const UpdateProduct = ({editProduct, render, setEditProduct}) => {
  const {categories} = useSelector(state => state.app)
  const [selectedCategory, setSelectedCategory] = useState(editProduct.category);
  const [imgUpdate, setImgUpdate] = useState({
    images: []
  })
  const [preview, setPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    title: editProduct?.title,
    price: editProduct?.price,
    quantity: editProduct?.quantity,
    color: editProduct?.color,
    category: editProduct?.category,
    brand: editProduct?.brand,
    Gb: editProduct?.Gb,
    variant: editProduct?.variant,
    description: editProduct?.description,
    images: editProduct?.images
  })
  const [brands, setBrands] = useState([]);

  const handleOnChangeBrand = (id) => {
    setSelectedCategory(id.target.value)
    setProduct(prev => ({...prev, category: id.target.value}))
  }

  const [payload, setPayload] = useState({
    description: ''
  })

  const changeValue = useCallback((e)=>{
    setPayload(e)
  },[payload])


  useEffect(() => {
    const selectedCategoryData = categories.find(el => el.title === selectedCategory);
    setBrands(selectedCategoryData?.brand);
    setProduct(prev => ({...prev, brand: selectedCategoryData?.brand[0]}))
  }, [selectedCategory, categories]);

  const handleToBase64 = async(files) => {
    const images = []
    for(let file of files){
      if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
        Swal.fire('Oops!',`Invalid type`,'error')
      }else{
        const toBase64 = await getBase64(file)
        images.push({name: file.name, path: toBase64})
      }
    }
    setPreview(images)
  }

  const handleUpdateProduct = async() => {
    if(product.category === '...Choose...'){
      Swal.fire('Oops!', `Category can't be empty`,'error')
    }else if(!product.title){
      Swal.fire('Oops!', `Title can't be empty`,'error')
    }else if(!product.quantity){
      Swal.fire('Oops!', `Quantity can't be empty`,'error')
    }else if(!product.price){
      Swal.fire('Oops!', `Price can't be empty`,'error')
    }else if(!product.color){
      Swal.fire('Oops!', `Color can't be empty`,'error')
    }else if(!payload.description){
      Swal.fire('Oops!', `Description can't be empty`,'error')
    }else if(!product.images){
      Swal.fire('Oops!', `Image can't be empty`,'error')
    }else{
      if(preview.length > 0){
        const updateProduct = {...product, ...payload, ...imgUpdate}
        const formData = new FormData() 
        for(let i of Object.entries(updateProduct)){
          formData.append(i[0], i[1])
        }
        for(let image of updateProduct.images){
          formData.append('images', image)
          console.log('images', image)
        }
        setIsLoading(true)
        const response = await apiUpdateProduct(formData, editProduct?._id)
        setIsLoading(false)
        Swal.fire('Congratulation',response?.mes,'success').then(()=>{
          setEditProduct(null)
          render()
        })
      }else{
        setIsLoading(true)
        const updateProduct = {...product, ...payload}
        setIsLoading(false)
        const response = await apiUpdateProduct(updateProduct, editProduct?._id)
        Swal.fire('Congratulation',response?.mes,'success').then(()=>{
          setEditProduct(null)
          render()
        })
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setPayload({description: typeof product?.description === 'object' ? product?.description?.join(', ') : product?.description})
  },[])

  useEffect(()=>{
    handleToBase64(imgUpdate.images)
  },[imgUpdate.images])

  return (
    <div className='relative'>
      {isLoading && 
      <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50 bg-opacity'>
        <Loading/>
      </div>}
      <h1 className='flex items-center justify-between h-[75px] text-3xl font-bold px-4 border-b border-b-black'>
        <span>Update Product</span>
      </h1>
      <div className='p-4'>
        <label className='font-bold'>Name</label>
        <input 
            type='text'
            name='title'
            id='title'
            className='border border-black w-full p-1'
            placeholder='Title of new product'
            value={product.title}
            onChange={el => setProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
          />
          <div className='flex my-6 gap-4 w-full'>
            <div className='flex flex-col w-full'>
              <label className='font-bold'>Price</label>
              <input 
              type='number'
              name='price'
              id='price'
              className='border border-black p-1'
              placeholder='Price of new product'
              value={product.price}
              onChange={el => setProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='font-bold'>Quantity</label>
              <input 
              type='number'
              name='quantity'
              id='quantity'
              className='border border-black p-1'
              placeholder='Quantity of new product'
              value={product.quantity}
              onChange={el => setProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='font-bold'>Color</label>
              <input 
              type='text'
              name='color'
              id='color'
              className='border border-black p-1'
              placeholder='Color of new product'
              value={product.color}
              onChange={el => setProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='font-bold'>Gb</label>
              <input 
              type='text'
              name='Gb'
              id='Gb'
              className='border border-black p-1'
              placeholder='Gb of new product'
              value={product.Gb}
              onChange={el => setProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label>Variant</label>
              <select 
              type='text'
              name='variant'
              id='variant'
              className='border border-black p-1'
              placeholder='Variant of new product'
              value={product.variant}
              onChange={el => setProduct(prev => ({...prev, [el.target.name]: el.target.value}))}
              >
              <option>false</option>
              <option>true</option>
              </select>
            </div>
          </div>
          <div className='flex gap-4 my-6'>
            <div className='flex flex-col w-full'>
              <label className='font-bold'>Category</label>
              <select
              id='category'
              name='category'
              className='border border-black p-1'
              value={product.category}
              onChange={handleOnChangeBrand}
              >
                <option>...Choose...</option>
                {categories?.map((el)=>(
                  <option key={el._id}>{el.title}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label className='font-bold'>Brand</label>
              <select
              id='brand'
              name='brand'
              className='border border-black p-1'
              value={product.brand}
              onChange={el => setProduct(prev => ({ ...prev, [el.target.name]: el.target.value}))}
              >
                {brands?.map((el)=>(
                  <option key={el._id}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          <MarkdownEditor 
          name='description'
          changeValue={changeValue}
          value={payload.description}
          label='Description'
          />
          <div className='flex flex-col w-full mt-6'>
            <label className='font-bold'>Image</label>
            {editProduct?.images && <div className='my-4 flex gap-2'>
              {editProduct?.images.map((el, index)=>(
                <div className='relative'>
                  <img src={el} alt='images' className='w-[200px] object-cover border border-black'/>
                </div>
              ))}
            </div>}
          </div>
          <div className='flex flex-col py-4'>
            <label className='font-bold' htmlFor='image'>Upload Image</label>
            <input type='file' id='image' multiple onChange={el => setImgUpdate(prev => ({ ...prev, images: el.target.files}))}/>
          </div>
          {preview && <div className='my-4 flex gap-2'>
            {preview.map((el, index)=>(
              <div className='relative'>
                <img src={el.path} alt='images' className='w-[200px] object-cover border border-black'/>
              </div>
            ))}
          </div>}
          <div className='flex gap-1'>
            <button onClick={() => handleUpdateProduct()} className='bg-main border border-black p-2 rounded-xl text-white'>Update product</button>
            <button onClick={() => setEditProduct(null)} className='bg-black border border-black p-2 rounded-xl text-white'>Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default memo(UpdateProduct)