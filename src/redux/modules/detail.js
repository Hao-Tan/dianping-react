import { combineReducers } from 'redux'
import { FETCH_DATA } from '../middlewares/api'
import url from '../../utils/url'
import { schema as productSchema, getProduct, getProductById } from './entities/products'
import { schema as shopSchema, getShop } from './entities/shops'

export const types = {
  // 获取产品详情三种状态
  FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
  FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',
  // 获取店铺详情三种状态
  FETCH_SHOP_DETAIL_REQUEST: 'DETAIL/FETCH_SHOP_DETAIL_REQUEST',
  FETCH_SHOP_DETAIL_SUCCESS: 'DETAIL/FETCH_SHOP_DETAIL_SUCCESS',
  FETCH_SHOP_DETAIL_FAILURE: 'DETAIL/FETCH_SHOP_DETAIL_FAILURE',

}

// state 初始值
const initialState = {
  product: {
    isFetching: false,
    id: null
  },
  relatedShop: {
    isFetching: false,
    id: null
  }
}

// 异步actions
export const actions = {
  loadProductDetail(id) {
    return (dispath, getState) => {
      const product = getProduct(getState(), id)
      const endpoint =url.getProductDetail(id)
      if (product) {
        return dispath(fetchProductDetailSuccess(id))
      }
      return dispath(fetchProductDetail(endpoint, id))
    }
  },
  loadShopById(id) {
    return (dispath, getState) => {
      const shop = getShop(getState(), id)
      const endpoint =url.getShopDetail(id)
      if (shop) {
        return dispath(fetchShopDetailSuccess(id))
      }
      return dispath(fetchShopDetail(endpoint, id))
    }
  }
}

// action creators
const fetchProductDetail = (endpoint, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILURE
    ],
    endpoint,
    schema: productSchema
  },
  id
})

const fetchProductDetailSuccess = id => ({
  type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
  id
})

const fetchShopDetailSuccess = id => ({
  type: types.FETCH_SHOP_DETAIL_SUCCESS,
  id
})

const fetchShopDetail = (endpoint, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOP_DETAIL_REQUEST,
      types.FETCH_SHOP_DETAIL_SUCCESS,
      types.FETCH_SHOP_DETAIL_FAILURE
    ],
    endpoint,
    schema: shopSchema
  },
  id
})

// 商品详情reducer
const product = (state = initialState.product, action) => {
  switch(action.type) {
    case types.FETCH_PRODUCT_DETAIL_REQUEST: 
      return {...state, isFetching: true}
    case types.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {...state, isFetching: true, id: action.id}
    case types.FETCH_PRODUCT_DETAIL_FAILURE:
      return {...state, isFetching: true, id: null}
    default: 
      return state
  } 
}

const relatedShop = (state = initialState.relatedShop, action) => {
  switch(action.type) {
    case types.FETCH_SHOP_DETAIL_REQUEST: 
      return {...state, isFetching: true}
    case types.FETCH_SHOP_DETAIL_SUCCESS:
      return {...state, isFetching: true, id: action.id}
    case types.FETCH_SHOP_DETAIL_FAILURE:
      return {...state, isFetching: true,  id: null}
    default: 
      return state
  } 
}


const reducer = combineReducers({
  product,
  relatedShop
})

export default reducer;


// selectors
export { getProduct }

/**
 * 通过商品获取店铺相关信息
 * @param {*} state 
 * @param {*} productId 
 */
export const getRelatedShop = (state, productId) => {
  const product = getProductById(state, productId)
  let shopId = product ? product.nearestShop : null
  if (shopId) {
    return getShop(state, shopId)
  }
  return null
}