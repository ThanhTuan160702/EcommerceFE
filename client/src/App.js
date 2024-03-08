import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public,FAQ,DetailProduct,Blogs,Service,Products,FinalRegister,ResetPassword} from './pages/public/index'
import { AdminLayout, CreateProduct, Dashboard, ManageOrder, ManageProduct, ManageUser } from './pages/admin/index'
import { CheckOut, History, MemberLayout, MyOrder, Personal, Wishlist, DetailCart  } from './pages/member/index'
import path from "./utils/path"
import { getCategories } from './store/app/asyncAction'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getNewProducts } from './store/products/asyncAction';
import { Loading } from './components';


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCategories())
    dispatch(getNewProducts())
  },[])
  const { isLoading } = useSelector(state => state.products)
  return (
    <div className={`h-screen font-main relative ${isLoading ? 'overflow-hidden' : ''}`}>
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.BLOGS} element={<Blogs />}/>
          <Route path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProduct />}/>
          <Route path={path.FQA} element={<FAQ />}/>
          <Route path={path.OUR_SERVICES} element={<Service />}/>
          <Route path={path.PRODUCTS_CATEGORY} element={<Products />}/>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout/>}>
          <Route path={path.DASHBOARD} element={<Dashboard />}/>
          <Route path={path.ADD_PRODUCT} element={<CreateProduct />}/>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />}/>
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />}/>
          <Route path={path.MANAGE_USER} element={<ManageUser />}/>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout/>}>
          <Route path={path.DETAIL_CART} element={<DetailCart />}/>
          <Route path={path.PERSONAL} element={<Personal />}/>
          <Route path={path.HISTORY} element={<History />}/>
          <Route path={path.WISHLIST} element={<Wishlist />}/>
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />}/>
        <Route path={path.CHECK_OUT} element={<CheckOut />}/>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}/>
        <Route path={path.LOGIN} element={<Login />}/>
        <Route path='*' element={<Home />}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
