Class Inheritance implementation
================================

Class Inheritance implementation for Node.js

Really inspired by the MooTools' 1.x and John Resig's Class implementation

Alias are the same as the Mootools 1.x Class 
- `Implements` : Mixin - Array of Class to implement
- `Extends` : Class to extend
- `initialize` : constructor, method called when an object of this Class is instantiate
- `parent` : used to call the same method in the Extended Class.

The package also provide the Class.Extras.Options from MooTools 1.x

## Basic Example 
    var Class = require('inheritance').Class;
    var Animal = new Class({ 
        type : '',

        initialize : function(type) {
            this.type = type;
        },

        toString: function() {
            return "I'm a " + this.type;
        }
    });

    var cat = new Animal('cat');
    console.log(cat.toString()); // -» I'm a cat

## Extends Example
    var inher = require('inheritance')
        Class = inher.Class;

    var Animal = new Class({
        type : '',

        initialize : function(type) {
            this.type = type;
        },

        toString: function() {
            return "I'm a " + this.type;
        }
    });

    var Cat = new Class({
        Extends : Animal,

        name : '',

        initialize : function(name) {
            this.parent('cat');
            this.name = name;
        },

        toString : function() {
            return this.parent() + ' and my name is ' + this.name;
        }

    });

    var cat = new Cat('Kitty');
    console.log(cat.toString()); // -» I'm a cat and my name is Kitty



## Implements Example 

    var inher = require('inheritance')
        Class = inher.Class,
        Options = inher.Options;

    var Animal = new Class({
        Implements : [Options],
        options : {},

        type : '',

        initialize : function(type, options) {
            this.setOptions(options);
            this.type = type;
        },

        toString: function() {
            return "I'm a " + this.type;
        }
    });

    var Cat = new Class({
        Extends : Animal,

        name : '',

        initialize : function(name, options) {
            this.parent('cat', options);
            this.name = name;
        },

        toString : function() {
            return this.parent() + ', my name is ' + this.name + (this.options.color ? ' and my color is ' + this.options.color : '');
        }

    });
    
    var options = { color : 'Black&White' };
    var cat = new Cat('Kitty', options);
    console.log(cat.toString()); // -» I'm a cat, my name is Kitty and my color is Black&White
    console.log(cat.options == options); // -» false


## Contributors

 - DieVarDump

## MIT Licenced