const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // o default sao os dados corretos, o caso de sucesso
    this.productData = {
      id: '00001',
      name: 'computer',
      price: 1000,
      category: 'electronic'
    }
  }
  static aProduct() {
    return new ProductDataBuilder()
  }

  withInvalidId() {
    this.productData.id = '1'
    return this
  }

  withInvalidName() {
    this.productData.name = 'abc123'
    return this
  }

  build() {
    const product = new Product(this.productData)
    return product
  }
}

module.exports = ProductDataBuilder