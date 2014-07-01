define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('jst!../templates/mainGrid.html');
    var GridItem = require('views/gridItem');
    var Mines = require('collections/mines');

    return Backbone.View.extend({
        template: template,
        tiles: [],
        endGameFlag: false,

        initialize: function(config) {
            this.config = config;
            this.render();
        },

        render: function() {
            this.mines = new Mines(this.config);
            this.mines.reset(this.mines.populateListWithMines());
            this.renderWrapper()
                .renderGrid(this.config);
            $('#new_game').click(this.reloadGame.bind(this));
            $('#check_mines').click(this.checkMines.bind(this));
        },

        renderWrapper: function() {
            this.$el.html(this.template({}));
            return this;
        },

        renderGrid: function(config) {
            var i, j, el, index = 0,
                $gridWrapper = this.$el.find('.main-grid'),
                gridDim = config.gridDimension || 8,
                gridItemDim = parseInt($gridWrapper.width()*0.8/gridDim),
                gridItem = new GridItem();

            for (i = 1; i <= gridDim; i += 1) {
                for (j = 1; j <= gridDim; j += 1) {
                    el = $(gridItem.renderEmptyItem({dim: gridItemDim}));
                    this.tiles.push(el); // save the ref to the tile
                    $gridWrapper.append(el);
                    el.click(this.checkTile.bind(this, index));
                    index++;
                }
                $gridWrapper.append('<br>');
            }
        },

        checkTile: function(index, evt) {
            var stat = this.mines.howManyMinesAroundTile(index);
            var $tile = this.tiles[index];

            $tile.off('click'); // remove event handler
            $tile.removeClass('closed'); // to know the tile is clicked

            if (stat.own.mine === false) {
                // no mine in the tile
                $tile.addClass('no-mines-discovered').text(stat.count);
                if (stat.count === 0) {
                    // recursive click neighbour tiles
                    this.clickNeighbourTiles(stat.list);
                }
            } else {
                // END GAME (mine exploded)
                $tile.addClass('mines-discovered');
                if (this.endGameFlag === false) {
                    this.endGame();
                }
            }
        },

        clickNeighbourTiles: function(list) {
            var that = this;
            list.forEach(function(index) {
                var $tile = that.tiles[index];
                var event = jQuery.Event('click');

                $tile.trigger(event);
            })
        },

        endGame: function(msg) {
            this.endGameFlag = true;
            msg = msg || 'Game over! You failed :(';
            this.tiles.forEach(function($tile) {
                var event = jQuery.Event('click');
                $tile.trigger(event);
            });
            alert(msg);
        },

        reloadGame: function() {
            this.tiles = [];
            this.endGameFlag = false;
            this.render();
        },

        checkMines: function() {
            var res = 0;
            this.tiles.forEach(function($tile) {
                if ($tile.hasClass('closed')) res++;
            });
            if (res === this.config.totalMines) {
                this.endGame('You WON!');
            } else {
                this.endGame('You LOOSE! Bang!')
            }
        }
    });
});