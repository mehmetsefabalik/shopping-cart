const Category = require('../Category/Category');

class Product {
    constructor(title, price, category) {
        if (arguments.length !== 3) {
            throw new Error('3 arguments should be provided')
        }
        this.title = title;
        this.price = price;
        if (!(category instanceof Category)) {
            throw new Error('not instance of category');
        } else {
            this.category = category;
        }
    }
}

module.exports = Product;