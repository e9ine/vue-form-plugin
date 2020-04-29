import Address from './Address';

const _schema = {
    Name: {
        type: String
    },
    Description: {
        type: String,
        textarea: 4
    },
    Address: Address
};

export default class Project {
    constructor(data) {
        Object.assign(this, data);
    }
    schema() {
        return _schema;
    }
}
