const ProductService = require('../services/products.service');

class ProductsController {
  productService = new ProductService();

  adminGetAllProducts = async (req, res, next) => {
    try {
      const usersInfo = await this.productService.adminFindAllProducts();
      return res.status(200).json({ data: usersInfo });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminGetProductsBySearchWord = async (req, res, next) => {
    const { searchword } = req.params;
    try {
      const usersInfo = await this.productService.adminFindProductsBySearchWord(searchword);
      return res.status(200).json({ data: usersInfo });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = ProductsController;
