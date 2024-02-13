import axios from "../axios";

export const apiGetOrders = (params) => axios({
    url: '/order/getOrders/',
    method: 'get',
    params
})

export const apiGetOrder = (params) => axios({
    url: '/order/getUserOrder/',
    method: 'get',
    params
})

export const apiUpdateOrder = (oid,data) => axios({
    url: '/order/updatestatus/'+oid,
    method: 'put',
    data
})

export const apiDeleteOrder = (oid) => axios({
    url: '/order/deleteOrder/'+oid,
    method: 'delete'
})