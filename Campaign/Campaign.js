const DiscountType = require('../DiscountType');

class Campaign {
    constructor(category, amount, minimumQuantity, type) {
        this.minimumQuantity = minimumQuantity;
        this.type = type;
        this.amount = amount;
        category.setCampaign(this);
        this.category = category;
    }

    getDiscountedAmount(price) {
        if (this.type === DiscountType.Rate) {
            return (price * this.amount / 100)
        } else if (this.type === DiscountType.Amount) {
            return this.amount
        }
    }
}

module.exports = Campaign;