const _schema = {
    Line1: {
        type: String
    },
    Line2: {
        type: String
    },
    Area: {
        type: String
    },
    County: {
        type: String
    },
    TownCity: {
        type: String
    },
    PostCode: {
        type: String
    },
    Country: {
        type: String,
        default: 'United Kingdom'
    },
    Location: {}
};

export default class Address {
    constructor(data) {
        Object.assign(this, data);
        if (this) {
            this._Summary = this.getAddressSummary();
        }
    }
    schema() {
        return _schema;
    }
    getAddressSummary() {
        let summary = '';
        if (this && this !== '') {
            summary += this.Line1 ? this.Line1 + '\n' : '';
            summary += this.Line2 ? this.Line2 + '\n' : '';
            summary += this.TownCity ? this.TownCity + '\n' : '';
            summary += this.County ? this.County + '\n' : '';
            summary += this.PostCode ? this.PostCode + '\n' : '';
            summary += this.Country ? this.Country : '';
        }
        return summary || '-';
    }
}
