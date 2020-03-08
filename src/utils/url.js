export default {
  getProductList(path, rowIndex, pageSize) {
    return `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`;
  },
  getProductDetail(id) {
    return `/mock/product_detail/${id}.json`;
  },
  getShopDetail(id) {
    return `/mock/shops/${id}.json`;
  }
};
