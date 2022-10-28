'use strict';
angular
    .module('myApp.factories')
    .factory('Comment', function () {

        Comment.prototype.getType = function () {
            return this.type;
        };
        Comment.prototype.setType = function (newType) {
            this.type = newType;
        };

        Comment.prototype.getText = function () {
            return this.text;
        };
        Comment.prototype.setText = function (newText) {
            this.text = newText;
        };


        function Comment(type, text) {
            this.type = type;
            this.text = text;
        }

        return Comment;
    });