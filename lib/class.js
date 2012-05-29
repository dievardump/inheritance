/*!
 * Class 
 *
 * @author Simon FREMAUX <simon.fremaux@gmail.com>
 */
/**
* Class implemetation
* More than inspired by the MooTools' and John Resig's Class implementation
*/
var Die = require('./die.js');
var Class = module.exports = function (imp) {
    var klass = implement.call((function() {
        // clone arrays and objects from instance 
        // to prevent shared properties between different instances
        // of a same class
        var clean = function(object) {
            for (var key in object){
                var value = object[key];
                if (Die.array.is(value)) {
                    object[key] = Die.array.clone(value);
                } else if (typeof value === 'object') {
                    var F = function(){};
                    F.prototype = value;
                    object[key] = clean(new F);
                } 
            }
            return object;
        };

        return function() {
            clean(this);
            if ( !klass.initializing && this.initialize ) {
                this.initialize.apply(this, arguments);
            }
        }
    })(), imp);

    klass.prototype = new klass;
    klass.prototype.constructor = Class;

    return klass;
}   

Class.Mutators = {
    Implements : function(items) {
        items = Die.array.is(items) ? items : [items];
        for(var i = 0, len = items.length; i<len; i++){
            var instance = new items[i];
            implement.call(this, instance);
        }
    },

    Extends : function(parent) {
        parent.initializing = true;
        var proto = new parent;
        delete parent.initializing;
        this.prototype = proto;
    }
};

var implement = function(object) {
    var value = null,
        proto = null;
    for(var key in object) {
        value = object[key];
        if (Class.Mutators.hasOwnProperty(key)){
            Class.Mutators[key].call(this, value);
            continue;
        }

        proto = this.prototype;

        if (typeof value === 'function' 
            && typeof proto[key] == 'function') { // overloading a function ?
            proto[key] = (function(method, parent) {
                return function() {
                    // save super
                    var tmp = this.parent;
                    // make function accessible with this._super()
                    this.parent = parent;
                    // make the new function available
                    var res = method.apply(this, arguments);
                    // restore super if exists
                    if (tmp) { 
                        this.parent = tmp;
                    } else {
                        delete this.parent;
                    }

                    return res;
                };
            })(value, proto[key]);
        } else if (typeof value === 'function') {
            proto[key] = value;
        } else if (typeof value === 'object') {
            proto[key] = Die.clone(value);
        } else {
            proto[key] = value;
        }
    }
    return this;
};