define(function(require) {
    'use strict';

    var mainGrid;

    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!../templates/mainView.html');
    var MainGrid = require('views/mainGrid');

    return Backbone.View.extend({
        template: template,
        el: '#main',
        config: {
            gridDimension: 8,
            totalMines: 10
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.config));

            // applying sub-views
            mainGrid = new MainGrid({el: '.grid_wrapper', config: this.config});

            return this;
        }
    });
});