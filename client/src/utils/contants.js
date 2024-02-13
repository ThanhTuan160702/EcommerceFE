import path from './path'
import { MdDashboard } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgProductHunt } from "react-icons/cg";
import { IoBagAdd } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle, FaShoppingCart, FaHistory, FaHeart } from "react-icons/fa";

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQS',
        path: `/${path.FQA}`
    },
]

export const tabs = [
    {
      id: 1,
      title: 'DESCRIPTION'
    },
    {
      id: 2,
      title: 'WARRANTY',
      content: `LIMITED WARRANTIES
      Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
      
      Frames Used In Upholstered and Leather Products
      Limited Lifetime Warranty
      A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
    },
    {
      id: 3,
      title: 'DELIVERY',
      content: `PURCHASING & DELIVERY
      Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
      Picking up at the store
      Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
      Delivery
      Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
      In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
    {
      id: 4,
      title: 'PAYMENT',
      content: `PURCHASING & DELIVERY
      Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
      Picking up at the store
      Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
      Delivery
      Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
      In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    }
  ]


export const color = [
  'Đen',
  'Xanh',
  'Đỏ',
  'Cam',
  'Hồng',
  'Nâu',
  'Vàng',
  'Xám',
  'Trắng',
  'Tím'
]

export const sorts = [
  {
    id: 1,
    value: '-sold',
    text: 'Best Selling',
  },
  {
    id: 2,
    value: '-title',
    text: 'A-Z',
  },
  {
    id: 3,
    value: 'title',
    text: 'Z-A',
  },
  {
    id: 4,
    value: '-price',
    text: 'Price high to low',
  },
  {
    id: 5,
    value: 'price',
    text: 'Price low to high',
  },
  {
    id: 6,
    value: '-createAt',
    text: 'Date new to old',
  },
  {
    id: 7,
    value: 'createAt',
    text: 'Date old to new',
  },
]

export const adminSidebar = [
  {
    id: 1,
    type: 'single',
    text: 'Dashboard',
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <MdDashboard size={20}/>
  },
  {
    id: 2,
    type: 'single',
    text: 'Manage User',
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <FaAddressBook size={20}/>
  },
  {
    id: 3,
    type: 'single',
    text: 'Manage Order',
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <BsCart4 size={20}/>
  },
  {
    id: 4,
    type: 'parent',
    text: 'Manage Product',
    icon: <IoBagAdd size={20}/>,
    submenu: [
      {
        text: 'Add Product',
        path: `/${path.ADMIN}/${path.ADD_PRODUCT}`,
        icon: <IoIosAddCircleOutline size={20}/>
      },
      {
        text: 'Manage Product',
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
        icon: <CgProductHunt size={20}/> 
      }
    ]
  }
]

export const memberSidebar = [
  {
    id: 1,
    type: 'single',
    text: 'Personal',
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <FaRegUserCircle size={20}/>
  },
  {
    id: 2,
    type: 'single',
    text: 'My Order',
    path: `/${path.MEMBER}/${path.DETAIL_CART}`,
    icon: <FaShoppingCart size={20}/>
  },
  {
    id: 3,
    type: 'single',
    text: 'History',
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <FaHistory size={20}/>
  },
  {
    id: 3,
    type: 'single',
    text: 'Wishlist',
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <FaHeart size={20}/>
  }
]