const DiscountType = require('../DiscountType');

class Coupon {
    constructor(minimumAmount, discount, type) {
        if (arguments.length !== 3) {
            throw new Error('wrong arguments')
        }

        this.minimumAmount = minimumAmount;
        this.discount = discount;
        this.type = type;
    }

    getDiscountedAmount(price) {
        if (this.type === DiscountType.Rate) {
            return (price * this.discount / 100)
        } else if (this.type === DiscountType.Amount) {
            return this.discount
        }
    }
}

module.exports = Coupon;