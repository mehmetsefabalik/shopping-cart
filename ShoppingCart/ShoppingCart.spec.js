const expect = require('chai').expect;

const Category = require('../Category/Category');
const Product = require('../Product/Product');
const ShoppingCart = require('./ShoppingCart');
const Campaign = require('../Campaign/Campaign');
const DiscountType = require('../DiscountType');
const Coupon = require('../Coupon/Coupon');

it('should create ShoppingCart instance and set its products', () => {
    const category = new Category('food');

    const apple = new Product('Apple', 100.0, category);
    const almond = new Product('Almond', 150.0, category);

    const shoppingCart = new ShoppingCart();

    shoppingCart.addItem(apple, 3);
    shoppingCart.addItem(almond, 1);

    expect(shoppingCart.items).to.deep.equal([
        {
            price: 300,
            product: apple,
            quantity: 3
        },
        {
            price: 150,
            product: almond,
            quantity: 1
        }
    ])
});

it('should create print ShoppingCart and calculate amounts', () => {
    const category = new Category('food');

    const apple = new Product('Apple', 100.0, category);
    const almond = new Product('Almond', 150.0, category);

    const shoppingCart = new ShoppingCart();

    shoppingCart.addItem(apple, 3);
    shoppingCart.addItem(almond, 1);

    new Campaign(category, 20.0, 2, DiscountType.Rate);
    new Campaign(category, 50.0, 5, DiscountType.Rate);
    new Campaign(category, 5.0, 5, DiscountType.Rate);

    const coupon = new Coupon(100, 10, DiscountType.Rate);

    shoppingCart.applyCoupon(coupon);

    shoppingCart.applyDiscounts();

    expect(shoppingCart.getTotalAmount()).to.equal(450);
    expect(shoppingCart.getTotalAmountAfterDiscounts()).to.equal(324);
    expect(shoppingCart.getCouponDiscount()).to.equal(36);
    expect(shoppingCart.getCampaignDiscount()).to.equal(90);
    expect(shoppingCart.getDeliveryCost()).to.equal(13.99);

    shoppingCart.print();
});