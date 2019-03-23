const expect = require('chai').expect;

const Category = require('../Category/Category');
const Product = require('./Product');

it('should create Product instance and set its title, price and category', () => {
    const category = new Category('food');

    const apple = new Product('Apple', 100.0, category);
    const almond = new Product('Almond', 150.0, category);

    expect(apple.title).to.equal('Apple');
    expect(apple.price).to.equal(100.0);
    expect(apple.category).to.equal(category);

    expect(almond.title).to.equal('Almond');
    expect(almond.price).to.equal(150.0);
    expect(almond.category).to.equal(category);
});