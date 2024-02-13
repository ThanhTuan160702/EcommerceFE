import React, { useState, useEffect, useCallback } from 'react'
import {createSearchParams, useLocation, useNavigate, useParams} from 'react-router-dom'
import { apiGetProduct, apiGetProducts, apiUpdateCart } from '../../apis'
import { BreadCrumbs, SelectQuantity, MoreInformation, ProductInformation, CustomSlider } from '../../components'
import Slider from 'react-slick';
import { formatPrice, renderStar} from '../../utils/helper';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getUser } from '../../store/user/asyncAction';
import path from '../../utils/path';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};


const DetailProduct = () => {
  const location = useLocation()
  const {pid , title, category} = useParams()
  const [titleProduct, setTitleProduct] = useState(null)
  const [gbProduct, setGbProduct] = useState('')
  const [colorProduct, setColorProduct] = useState('')
  const [color, setColor] = useState([])
  const [gb, setGb] = useState([])
  const [product, setProduct] = useState(null)
  const [productSlider, setProductSlider] = useState(null)
  const [currentImg, setCurrentImg] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { current } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = async() => {
    if(product){
      if(!current) {
        return Swal.fire({
          title: 'Login',
          text: 'Please login to add product !',
          icon: 'info',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          confirmButtonText: 'Login'
        }).then((e)=>{
          if(e.isConfirmed){
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({redirect: location.pathname}).toString()
            })
          }
        })
      }
      const response = await apiUpdateCart({pid: product._id, color: product.color, quantity: quantity})
      if(response.success){
        toast.success('Add product is successfully')
      }
      dispatch(getUser())
    }
  }

  const fetchData = async() => {
    const response = await apiGetProduct(pid)
    if(response?.success){
      setProduct(response?.mes)
      setGbProduct(response?.mes.Gb)
      setColorProduct(response?.mes.color)
      setCurrentImg(response?.mes.images[0])
    }
  }

  const fetchCustom = async() => {
    const response = await apiGetProducts({category})
    setProductSlider(response?.mes)
  }
  
  const fetchTitle = async() => {
    const response = await apiGetProducts({title: product?.title?.slice(0, 20)})
    setTitleProduct(response?.mes)
  }

  const fetDataAndTitle = async() => {
    await fetchData();
    await fetchCustom();
    if(product?.title) {
      await fetchTitle();
    }
  }

  const fetchVarriant = async() => {
    if(product?.title){
      const response = await apiGetProducts({title: product.title.slice(0, 20), Gb: gbProduct, color: colorProduct})
      if(response?.success){
        navigate(`/${category}/${response?.mes[0]._id}/${response?.mes[0]?.title}`)
      }
    }
  }

  useEffect(()=>{
    fetchVarriant()
  },[gbProduct, colorProduct])
  
  
  useEffect(()=>{
    if(pid){
      fetDataAndTitle()
    }
  },[pid, product?.title])

  useEffect(() => {
    if (titleProduct) {
      Array();
    }
  }, [titleProduct]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantity = useCallback((number)=>{
    if(!Number(number) || Number(number) < 0 || Number(number) > product?.quantity){ 
      return
    }else{
      setQuantity(number)
    }
  },[quantity])

  const handleChangeQuantity = useCallback((text)=>{
    if(text==='-' && +quantity > 1){
      setQuantity(+quantity-1)
    }
    if(text==='+'){
      setQuantity(+quantity+1)
    }
  },[quantity])

  const Array = () => {
    const uniqueColors = new Set();
    const uniqueGbs = new Set();
    titleProduct?.forEach(el => {
      uniqueColors.add(el.color);
    });
    titleProduct?.forEach(el => {
      uniqueGbs.add(el.Gb);
    });
    setGb([...uniqueGbs]);
    setColor([...uniqueColors]);
  }
  
  return (
    <div className='w-full'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold'>{title}</h3>
          <BreadCrumbs title={title} category={category}/>
        </div>
      </div>
      <div className='bg-white w-main m-auto mt-4 flex'>
        <div className='w-[40%] gap-4 flex flex-col'>
          <img src={currentImg} alt='' className='w-[458px] h-[458px] border border-black object-contain' />
          <div className='w-[458px] h-[143px]'>
            <Slider className='image-slider mx-[-8px]' {...settings} >
              {product?.images.map((el, index)=>(
                <div className='px-2' key={index}>
                  <img onClick={()=> setCurrentImg(el)} src={el} alt='' className='h-[143px] w-[153px] border border-black object-cover p-2 cursor-pointer'/>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-[40%] flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[30px] font-semibold'>{`${formatPrice(product?.price)}₫`}</h2>
          </div>
          <div className='flex items-center gap-2 italic'>
            <span className='flex'>{renderStar(product?.totalRatings)}</span>
            <span >1 review</span>
          </div>
          <ul className='text-sm list-disc text-gray-500 leading-6'>
            {product?.description?.length > 1 && product?.description.map((el, index)=>(
              <li key={index}>{el}</li>
            ))}
            {product?.description?.length === 1 && <div className='text-sm line-clamp-[10]' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0])}}></div>}
          </ul>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-1'>
                {gbProduct.length > 0 && gb?.map((el)=>(
                  <span onClick={() => setGbProduct(el)} className={gbProduct === el ? 'border border-blue-500 text-blue-500 p-2 cursor-pointer' : 'border border-black p-2 cursor-pointer'}>{el}</span>
                ))}
              </div>
              <div className='flex gap-1'>
                {color?.map((el)=>(
                  <span onClick={() => setColorProduct(el)} className={colorProduct === el ? 'border border-blue-500 text-blue-500 p-2 cursor-pointer' : 'border border-black p-2 cursor-pointer'}>{el}</span>
                ))}
              </div>
          </div>
          <div className='flex flex-col gap-8'>
            <SelectQuantity productQuantity={product?.quantity} quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity}/>
            <button onClick={() => onClick()} className='bg-main p-2 rounded-xl'>
              Add to cart
            </button>
          </div>
        </div>
        <div className='w-[20%] pl-6 flex flex-col gap-3'>
          <MoreInformation />
        </div>
      </div>
      <div className='w-main m-auto mt-8'>
          <ProductInformation product={product}/>
      </div>
      <div className='w-main m-auto mt-4'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main mb-2'>OTHER CUSTOMERS ALSO BUY:</h3>
          <CustomSlider products={productSlider}/>
      </div>
      <div className='h-[500px] w-main m-auto mt-8 border'>
            <h1>{}</h1>
      </div>
    </div>
  )
}

export default DetailProduct