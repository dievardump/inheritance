// Utils
var utils = module.exports = {};


utils.clone = function(val) {
    if (utils.array.is(val)){
        return utils.array.clone(val);
    } else {
        return utils.object.clone(val);
    }
}

// Array
utils.array = {};
utils.array.is = function(arg) {
    return arg && Object.prototype.toString.call(arg) === "[object Array]";
};

utils.array.clone = function(arr) {
    var i = arr.length,
        clone = new Array(i);
    while(i--) clone[i] = arr[i];
    return clone;
};

// Objects
utils.object = {};
utils.object.clone = function(object) {
    var clone = {};
    for (var key in object) {
        clone[key] = (typeof object[key] === 'object') ? utils.object.clone(object[key]) : object[key];
    }
    return clone;
};

utils.object.merge = (function() {
    var merge = function(merged, key, value) {
        if (typeof value === 'object') {
            if (typeof merged[key] === 'object') {
                merged[key] = utils.object.merge(merged[key], value);
            } else {
                merged[key] = utils.object.clone(value);
            }
        } else {
            merged[key] = value;
        }
    };

    return function() {
        if (arguments.length == 1) {
            if (typeof arguments[0] === 'undefined') {
                return {};
            }
            return arguments[0];
        } else if (arguments.length == 0) {
            return {};
        }

        var merged = arguments[0], 
            args = Array.prototype.slice.call(arguments, 1);

        if (args.length == 2 && typeof args[0] === 'string') {
            merge.apply(this, [merged, args[0], args[1]]);
        } else {
            for(var i = args.length, rec = {};i--; ) {
                rec = utils.object.merge.apply(this, args);
            }

            for(var key in rec) {
                merge(merged, key, rec[key]);
            }
        }
        return merged;
    }
})();

