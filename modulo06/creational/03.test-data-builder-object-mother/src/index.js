/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from zero to a thousand
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = []
  if(!(product.id.length >= 2 && product.id <= 20)) {
    errors.push(`id: invalid length, current[${product.id}]`)
  }

  if(/(\W|\d)/.test(product.name)) {
    errors.push(`name: invalid name, current[${product.name}]`)
  }

  return {
    result: errors.length === 0,
    errors,
  }
}

module.exports = {
  productValidator
}