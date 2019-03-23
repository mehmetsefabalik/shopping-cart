const expect = require('chai').expect;

const ShoppingCart = require('../ShoppingCart/ShoppingCart');
const DiscountType = require('../DiscountType');
const Coupon = require('./Coupon');

it('should create Coupon', () => {
    const coupon = new Coupon(100, 10, DiscountType.Rate);

    expect(coupon.minimumAmount).to.equal(100);
    expect(coupon.discount).to.equal(10);
    expect(coupon.type).to.equal(DiscountType.Rate);
});

it('should apply a Coupon to ShoppingCart', () => {
    const shoppingCart = new ShoppingCart();

    const coupon = new Coupon(100, 10, DiscountType.Rate);

    shoppingCart.applyCoupon(coupon);

    expect(shoppingCart.coupon).to.equal(coupon);
});