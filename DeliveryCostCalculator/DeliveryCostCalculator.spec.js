const expect = require('chai').expect;

const Category = require('../Category/Category');
const Product = require('../Product/Product');
const ShoppingCart = require('../ShoppingCart/ShoppingCart');
const DeliveryCostCalculator = require('./DeliveryCostCalculator');

it('should calculate delivery cost of a ShoppingCart instance', () => {
    const category = new Category('food');

    const apple = new Product('Apple', 100.0, category);
    const almond = new Product('Almond', 150.0, category);

    const shoppingCart = new ShoppingCart();

    shoppingCart.addItem(apple, 3);
    shoppingCart.addItem(almond, 1);

    const deliveryCostCalculator = new DeliveryCostCalculator(3, 4, 2.99);

    expect(deliveryCostCalculator.costPerDelivery).to.equal(3);
    expect(deliveryCostCalculator.costPerProduct).to.equal(4);
    expect(deliveryCostCalculator.fixedCost).to.equal(2.99);

    const deliveryCost = deliveryCostCalculator.calculateFor(shoppingCart);

    expect(deliveryCost).to.equal(3 + 4 * 2 + 2.99);
});