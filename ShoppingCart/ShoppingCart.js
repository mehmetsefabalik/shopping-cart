const Coupon = require('../Coupon/Coupon');
const Product = require('../Product/Product');
const DeliveryCostCalculator = require('../DeliveryCostCalculator/DeliveryCostCalculator');

class ShoppingCart {
    constructor() {
        this.items = []
    }

    getDistinctCategories() {
        return this.items.map(item => item.product.category)
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    addItem(product, quantity) {
        if (!(product instanceof Product)) {
            throw new Error('not instance of Product')
        }
        this.items.push({
            product: product,
            quantity: quantity,
            price: quantity * product.price,
        });
    }

    applyCoupon(coupon) {
        if (!(coupon instanceof Coupon)) {
            throw new Error('not instance of Coupon')
        }

        this.coupon = coupon;
    }

    getDeliveryCost() {
        return new DeliveryCostCalculator(3, 4, 2.99).calculateFor(this)
    }

    getTotalAmountAfterDiscounts() {
        return this.getTotalAmount() - this.getCampaignDiscount() - this.getCouponDiscount()
    }

    getCouponDiscount() {
        if (!this.coupon) {
            return 0
        }

        const totalAmountAfterCampaignDiscount = this.getTotalAmount() - this.getCampaignDiscount();

        if (totalAmountAfterCampaignDiscount >= this.coupon.minimumAmount) {
            return this.coupon.getDiscountedAmount(totalAmountAfterCampaignDiscount)
        } else {
            return 0
        }
    }

    getCampaignDiscount() {
        const eligibleCampaigns = this.getEligibleCampaigns();
        if (!eligibleCampaigns.length) {
            return 0
        }

        let discounts = [];
        eligibleCampaigns.forEach((eligibleCampaign) => {
            this.items.forEach((item) => {
                if (item.product.category === eligibleCampaign.category) {
                    const discount = discounts.find((discount) => discount.campaign === eligibleCampaign);
                    if (discount) {
                        discounts = discounts.filter((discount) => discount.campaign !== eligibleCampaign);
                        const discountAmount = discount.amount + eligibleCampaign.getDiscountedAmount(item.price);
                        discounts.push({
                            amount: discountAmount,
                            campaign: eligibleCampaign
                        });
                    } else {
                        const discountAmount = eligibleCampaign.getDiscountedAmount(item.price);
                        discounts.push({
                            amount: discountAmount,
                            campaign: eligibleCampaign
                        });
                    }
                }
            });
        });

        return discounts.reduce((prev, current) => (prev.amount > current.amount) ? prev : current).amount
    }

    getEligibleCampaigns() {
        const distinctCategories = this.getDistinctCategories();
        const eligibleCampaigns = [];
        distinctCategories.forEach((category) => {
            eligibleCampaigns.push(...category.campaigns.filter((campaign) => campaign.minimumQuantity <= this.getTotalQuantity()))
        });
        return eligibleCampaigns
    }

    getTotalQuantity() {
        return this.items.reduce((prev, current) => prev.quantity + current.quantity)
    }

    getTotalAmount() {
        return this.items.reduce((prev, current) => prev.price + current.price)
    }

    getTotalDiscountOfItem(item) {
        const couponDiscountPerItem = this.getCouponDiscount() / this.getTotalQuantity();
        return (item.discount || 0) + (couponDiscountPerItem * item.quantity);
    }

    print() {
        const distinctCategories = this.getDistinctCategories();
        distinctCategories.forEach((distinctCategory) => {
            const itemsOfCategory = this.items.filter((item) => item.product.category === distinctCategory);
            itemsOfCategory.forEach((item) => {
                console.log(`Category: ${item.product.category.title}, Product: ${item.product.title}, Quantity: ${item.quantity}, Unit Price: ${item.product.price}, Total Price: ${item.product.price * item.quantity}, Total Discount: ${this.getTotalDiscountOfItem(item)}`)
            })
        })
    }

    applyDiscounts() {
        const eligibleCampaigns = this.getEligibleCampaigns();
        if (!eligibleCampaigns.length) {
            return
        }

        eligibleCampaigns.forEach((eligibleCampaign) => {
            this.items.forEach((item) => {
                if (item.product.category === eligibleCampaign.category) {
                    item.discount = eligibleCampaign.getDiscountedAmount(item.price);
                }
            });
        });
    }
}

module.exports = ShoppingCart;