export default {
  getProductList(rowIndex, pageSize) {
    return `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`;
  }
};
