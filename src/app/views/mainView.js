define(function(require) {
    'use strict';

    var mainGrid;

    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!templates/mainView.html');
    var MainGrid = require('views/mainGrid');

    return Backbone.View.extend({
        template: template,
        el: '#main',
        config: {
            gridDimension: 8,
            totalMines: 10
        },

        events: {
            'click .new_game': 'initiateReloadGame',
            'click .check_mines': 'initiateCheckMines'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.config));

            // applying sub-view
            mainGrid = new MainGrid({el: '.grid_wrapper', config: this.config, mainView: this});

            return this;
        },

        initiateReloadGame: function() {
            this.trigger('reloadGame');
        },

        initiateCheckMines: function() {
            this.trigger('checkMines');
        }
    });
});