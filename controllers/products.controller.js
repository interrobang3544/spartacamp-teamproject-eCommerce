const ProductService = require('../services/products.service');
const fs = require('fs');

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
      console.log(error);
      return res.status(400).json({
        errorMessage: '상품 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminGetProductsBySearchWord = async (req, res, next) => {
    const { searchword } = req.params;
    try {
      let limit = 3;
      let offset = 0 + (req.query.page - 1) * limit;
      const productsInfo =
        await this.productService.adminFindProductsBySearchWord(
          limit,
          offset,
          searchword
        );
      return res.status(200).json({
        totalPage: Math.ceil(productsInfo.count / limit),
        data: productsInfo.rows,
      });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '상품 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminCreateProduct = async (req, res, next) => {
    try {
      const { productName, productExp, price, quantity } = req.body;

      if (!req.file.filename) {
        res.status(412).send({
          errorMessage: '상품 이미지를 등록해주세요.',
        });
        return;
      }

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
    } catch (error) {
      return res.status(400).json({
        errorMessage: '상품 등록에 실패하였습니다.',
      });
    }
  };

  adminUpdateProduct = async (req, res, next) => {
    console.log(req.body, req.file);
    const {
      modifyProductId,
      modifyProductName,
      modifyProductExp,
      modifyPrice,
      modifyProductPhoto,
      modifyQuantity,
      modifyUserCount,
    } = req.body;

    let newProductPhoto = modifyProductPhoto;

    if (req.file) {
      try {
        fs.unlinkSync('./static' + modifyProductPhoto.substr(1));
      } catch (error) {
        console.log(error);
      }
      newProductPhoto = './uploads/' + req.file.filename;
    }

    const updateProduct = await this.productService.updateProduct(
      modifyProductId,
      modifyProductName,
      modifyProductExp,
      modifyPrice,
      newProductPhoto,
      modifyQuantity,
      modifyUserCount
    );

    res.redirect('/admin-products');
  };

  adminDeleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    const { productPhoto } = req.body;
    const deleteProduct = await this.productService.deleteProduct(productId);

    try {
      fs.unlinkSync('./static' + productPhoto.substr(1));
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ data: deleteProduct });
  };

  getProducts = async (req, res, next) => {
    const products = await this.productService.findAllProduct();

    res.status(200).json({ data: products })
  }

  getProductspec = async (req, res, next) => {
    const { productId } = req.params;
    const productspec = await this.productService.findProductSpec(productId);
    // console.log(productspec);

    res.status(200).json({ data: productspec })
  }
}

module.exports = ProductsController;
