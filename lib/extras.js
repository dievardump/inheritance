var Class = require('./class.js'),
    Die = require('./die.js');
    
    
var Options = new Class({
    
    options : {},

    setOptions : function(options) {
        this.options = Die.object.merge(this.options, options);
    }
});
    
module.exports = {
    Options : Options
};
