/**
 *  Main Collection
 */
define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Mine = require('models/mine');

    return Backbone.Collection.extend({
        model: Mine,

        initialize: function(config) {
            this.totalMines = config.totalMines || 10;
            this.gridDim = config.gridDimension || 8;
        },

        /**
         * Initial population of tiles data list (array of objects with mines specs)
         *
         * @returns {*}
         */
        populateListWithMines: function() {
            var i;
            var mines = this.totalMines;
            var tiles = this.gridDim*this.gridDim;
            var res = [];
            // populate the list with mines
            for (i = 1; i <= tiles; i += 1) {
                res.push({
                    mine: mines > 0 ? true : false
                });
                mines--;
            }
            return _.shuffle(res);
        },

        /**
         * Analyze neighbouring tiles for mines and returns stat object
         *
         * @param index
         * @returns {{own: *, count: number, tiles: {own: *, list: Array}, list: *}}
         */
        howManyMinesAroundTile: function(index) {
            var res = 0;
            var neighbours = this._neighboursTiles(index);
            neighbours.list.forEach(function(el) {
                if (el.mine) res++;
            });

            return {
                own: neighbours.own,
                count: res,
                tiles: neighbours,
                list: _.pluck(neighbours.list, 'index')
            };
        },

        /**
         * Extract all neighbouring tiles (data objects)
         *
         * @param index
         * @returns {{own: *, list: Array}}
         * @private
         */
        _neighboursTiles: function(index) {
            var i, el, list;
            var dataList = [];
            var data = this.toJSON();
            var L = this.gridDim;

            // left-edge tiles
            if (index % L === 0) {
                list = [index + 1, index + L, index + L + 1, index - L, index - L + 1];
            // right-edge tiles
            } else if (index % L === L - 1) {
                list = [index - 1, index + L, index + L - 1, index - L, index - L - 1];
            // inside tiles
            } else {
                list = [index + 1, index - 1, index + L, index + L - 1, index + L + 1, index - L, index - L - 1, index - L + 1];
            }

            // extract neighbours
            for (i = 0; i < list.length; i += 1) {
                if (data[list[i]]) {
                    el = data[list[i]];
                    el.index = list[i];
                    dataList.push(el);
                }
            }

            return {
                own: data[index],
                list: dataList
            };
        }
    });
});