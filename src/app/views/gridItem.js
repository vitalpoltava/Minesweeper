define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!../templates/gridItem.html');

    return Backbone.View.extend({
        template: template,

        renderEmptyItem: function(o) {
            return this.template(o || {});
        }
    });
});