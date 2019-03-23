const expect = require('chai').expect;

const Category = require('./Category');

it('should create Category instance and set its title', () => {
    const category = new Category('food');
    expect(category.title).to.equal('food');
});