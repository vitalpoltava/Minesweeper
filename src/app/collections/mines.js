define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    return Backbone.Collection.extend({
        initialize: function(config) {
            this.totalMines = config.totalMines || 10;
            this.gridDim = config.gridDimension || 8;
        },

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

        howManyMinesAroundTile: function(index) {
            var res = 0;
            var neighbours = this._neighboursTiles(index);
            neighbours.list.forEach(function(el) {
                if (el.mine) res++;
            });
console.log(neighbours.list, res);
            return {
                own: neighbours.own,
                count: res,
                tiles: neighbours,
                list: _.pluck(neighbours.list, 'index')
            };
        },

        _neighboursTiles: function(index) {
            var i, el;
            var dataList = [];
            var data = this.toJSON();
            var L = this.gridDim;
            var list = [index + 1, index - 1, index + L, index + L - 1, index + L + 1, index - L, index - L - 1, index - L + 1];

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