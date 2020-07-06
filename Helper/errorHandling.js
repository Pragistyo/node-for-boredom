const replaceErrors = (key, value) =>{
    if (value instanceof Error) {
        var error = {};

        Object.getOwnPropertyNames(value).forEach(function (key) {
            error[key] = value[key];
        });

        return error;
    }

    return value;
}

exports.getPureError = (error) => {
    return JSON.parse(JSON.stringify(error, replaceErrors));
}