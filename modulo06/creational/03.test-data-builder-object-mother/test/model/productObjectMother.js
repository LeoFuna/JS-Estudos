const ProductDataBuilder = require("./productDataBuilder")

class ProductObjectMother {
  static valid() {
    return ProductDataBuilder.aProduct().build()
  }

  static withInvalidId() {
    return ProductDataBuilder.aProduct().withInvalidId().build()
  }

  static withInvalidName() {
    return ProductDataBuilder.aProduct().withInvalidName().build()
  }
}

module.exports = ProductObjectMother