const _schema = {
    Longitude: {
        type: Number,
        required: true
    },
    Latitude: {
        type: Number
    }
};

export default class Location {
    constructor(data) {
        Object.assign(this, data);
    }
    schema() {
        return _schema;
    }
}
