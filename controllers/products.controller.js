const ProductService = require('../services/products.service');

class ProductsController {
  productService = new ProductService();

  adminGetAllProducts = async (req, res, next) => {
    try {
      let limit = 3;
      let offset = 0 + (req.query.page - 1) * limit;
      const productsInfo = await this.productService.adminFindAllProducts(
        limit,
        offset
      );
      return res.status(200).json({
        totalPage: Math.ceil(productsInfo.count / limit),
        data: productsInfo.rows,
      });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminGetProductsBySearchWord = async (req, res, next) => {
    const { searchword } = req.params;
    try {
      const productsInfo =
        await this.productService.adminFindProductsBySearchWord(searchword);
      return res.status(200).json({ data: productsInfo });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminCreateProduct = async (req, res, next) => {
    console.log(req.body)
    const { productName, productExp, price, quantity } = req.body;
    const productPhoto = './uploads/' + req.file.filename;
    const createProductData = await this.productService.createProduct(
      productName,
      productExp,
      price,
      productPhoto,
      quantity,
      0
    );
    res.redirect('/admin-products');
    // res.status(201).json({ data: createProductData });
  };

  adminDeleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    const deleteProduct = await this.productService.deleteProduct(productId);

    res.status(200).json({ data: deleteProduct });
  };
}

module.exports = ProductsController;
