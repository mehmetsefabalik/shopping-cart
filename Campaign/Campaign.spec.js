const expect = require('chai').expect;

const Category = require('../Category/Category');
const Product = require('../Product/Product');
const ShoppingCart = require('../ShoppingCart/ShoppingCart');
const Campaign = require('./Campaign');
const DiscountType = require('../DiscountType');

it('should create Campaign instances and add them to category', () => {
    const category = new Category('food');

    const apple = new Product('Apple', 100.0, category);
    const almond = new Product('Almond', 150.0, category);

    const shoppingCart = new ShoppingCart();

    shoppingCart.addItem(apple, 3);
    shoppingCart.addItem(almond, 1);

    const campaign1 = new Campaign(category, 20.0, 3, DiscountType.Rate);
    const campaign2 = new Campaign(category, 50.0, 5, DiscountType.Rate);
    const campaign3 = new Campaign(category, 5.0, 5, DiscountType.Rate);

    expect(category.campaigns).to.deep.equal([campaign1, campaign2, campaign3]);
});