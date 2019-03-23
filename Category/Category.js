const Campaign = require('../Campaign/Campaign');

class Category {
    constructor(title) {
        if (!arguments.length) {
            throw new Error('should provide arguments')
        }

        this.title = title
    }

    setCampaign(campaign) {
        if (!(campaign instanceof Campaign)) {
            throw new Error('not instance of Campaign')
        }

        if (!this.campaigns) {
            this.campaigns = []
        }

        this.campaigns.push(campaign)
    }
}

module.exports = Category;