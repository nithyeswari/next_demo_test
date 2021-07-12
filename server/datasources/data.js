const casual = require('casual');
casual.define('profile', function () {
    return {
        id: casual.integer(from = 0, to = 9999999),
        name: casual.first_name,
        address: {
            addressLine1: casual.address1,
            addressLine2: casual.address2,
            addressLine3: casual.address2,
            country: casual.country,
            zipcode: casual.zip
        },
        email: casual.email,
        Phone: casual.phone
    };
});
const array_of = (times) => {
    var result = [];
    for (var i = 0; i < times; ++i) {
        result.push(casual.profile);
    }
    return result;
};

exports.array_of_profile = array_of;