const models = {
    usersModel: require('./mysql/users'),
    productsModel: require('./mysql/products'),
    ordersModel: require('./mysql/orders'),
    orderItemsModel: require('./mysql/orderItems'),
    cartsModel: require('./mysql/carts'),
    cartItemsModel: require('./mysql/cartItems')
  }
  
  module.exports = models;
  