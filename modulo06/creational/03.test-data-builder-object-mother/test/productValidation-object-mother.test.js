const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('../src')
const ProductDataBuilder = require('./model/productDataBuilder')
const ProductObjectMother = require('./model/productObjectMother')

describe('Test Object Mother', () => {
  it('shouldnt return error with valid product', () => {
    const product = ProductObjectMother.valid()
    const result = productValidator(product)

    const expected = {
      errors: [],
      result: true
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe('Product Validation Rules', () => {
    it('should return an obect error when creating a Product with invalid id', () => {
      const product = ProductObjectMother.withInvalidId()
      const result = productValidator(product)
  
      const expected = {
        errors: ["id: invalid length, current[1]"],
        result: false
      }
  
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an obect error when creating a Product with invalid name', () => {
      const product = ProductObjectMother.withInvalidName()
      const result = productValidator(product)
  
      const expected = {
        errors: ["name: invalid name, current[abc123]"],
        result: false
      }
  
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an obect error when creating a Product with invalid price')
    it('should return an obect error when creating a Product with invalid category')
  })
})