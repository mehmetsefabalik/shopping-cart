const ShoppingCart = require('../ShoppingCart/ShoppingCart');

class DeliveryCostCalculator {
    constructor(costPerDelivery, costPerProduct, fixedCost) {
        if (arguments.length !== 3) {
            throw new Error('wrong arguments')
        }

        this.costPerDelivery = costPerDelivery;
        this.costPerProduct = costPerProduct;
        this.fixedCost = fixedCost;
    }

    calculateFor(cart) {
        const distinctCategories = cart.getDistinctCategories();
        const numberOfDeliveries = distinctCategories.length;

        const numberOfProducts = cart.items.length;

        return (this.costPerDelivery * numberOfDeliveries) + (this.costPerProduct * numberOfProducts) + this.fixedCost;
    }
}

module.exports = DeliveryCostCalculator;