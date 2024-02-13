import React, { useCallback, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import MarkdownEditor from '../../components/Untils/MarkdownEditor'
import Swal from 'sweetalert2'
import { getBase64 } from '../../utils/helper'
import { FaTrashAlt } from "react-icons/fa";
import { apiCreateProduct } from '../../apis/product'
import { toast } from 'react-toastify'
import { Loading } from '../../components'


const CreateProduct = () => {

  const {categories} = useSelector(state => state.app)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [payload, setPayload] = useState({
    description: ''
  })
  const [hover, setHover] = useState(null)
  const [preview, setPreview] = useState([])
  const [product, setProduct] = useState({
    title: '',
    price: '',
    quantity: '',
    color: '',
    category: '',
    brand: '',
    Gb: '',
    variant: false,
    images: []
  })
  const changeValue = useCallback((e)=>{
    setPayload(e)
  },[payload])

  const handleCreateProduct = async() => {
    if(product.category === '...Choose...' || !product.category || !product.title || !product.price || !product.quantity || !product.color || !payload.description){
      Swal.fire('Oops!', 'Missing Input','error')
    }else{
      const createProduct = {...product, ...payload}
      const formData = new FormData()
      for(let i of Object.entries(createProduct)){
        formData.append(i[0], i[1])
        console.log(i[0], i[1])
      }
      if(createProduct.images){
        for(let image of createProduct.images){
          formData.append('images', image)
          console.log('images', image)
        }
      }
      setIsLoading(true)
      const response = await apiCreateProduct(formData)
      if(response.success){
        toast.success(response.mes)
        setPayload({
          description: ''
        })
        setProduct({
          title: '',
          price: '',
          quantity: '',
          color: '',
          category: '',
          brand: '',
          Gb: '',
          variant: false,
          images: []
        })
        setPreview([])
        setSelectedCategory('')
        setIsLoading(false)
      }else{
        toast.error(response.mes)
      }
    }
  }

  useEffect(() => {
    const selectedCategoryData = categories.find(el => el.title === selectedCategory);
    setBrands(selectedCategoryData?.brand);
    setProduct(prev => ({...prev, brand: selectedCategoryData?.brand[0]}))
  }, [selectedCategory, categories]);

  const handleOnChangeBrand = (id) => {
    setSelectedCategory(id.target.value)
    setProduct(prev => ({...prev, category: id.target.value}))
  }

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

  useEffect(()=>{
    handleToBase64(product.images)
  },[product.images])

  return (
    <div className='relative'>
      {isLoading && 
      <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50 bg-opacity'>
        <Loading/>
      </div>}
      <h1 className='flex items-center justify-between h-[75px] text-3xl font-bold px-4 border-b border-b-black'>
        <span>Add Product</span>
      </h1>
      <div className='p-4'>
        <label>Name</label>
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
              <label>Price</label>
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
              <label>Quantity</label>
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
              <label>Color</label>
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
              <label>Gb</label>
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
              <label>Category</label>
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
              <label>Brand</label>
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
          <div className='flex flex-col py-4'>
            <label htmlFor='image'>Upload Image</label>
            <input type='file' id='image' multiple onChange={el => setProduct(prev => ({ ...prev, images: el.target.files}))}/>
          </div>
          {preview && <div className='my-4 flex gap-2'>
            {preview.map((el, index)=>(
              <div className='relative'>
                <img src={el.path} alt='images' className='w-[200px] object-cover'/>
              </div>
            ))}
          </div>}
          <button onClick={() => handleCreateProduct()} className='bg-main border border-black p-2 rounded-xl text-white'>Create new product</button>
      </div>
    </div>
  )
}

export default CreateProduct