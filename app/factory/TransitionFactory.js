'use strict';
angular
    .module('myApp.factories')
    .factory('Transition', function () {

        Transition.prototype.getFromID = function () {
            return this.fromID;
        };
        Transition.prototype.setFromID = function (fromID) {
            this.fromID = fromID;
        };

        Transition.prototype.getToID = function () {
            return this.toID;
        };
        Transition.prototype.setToID = function (toID) {
            this.fromID = toID;
        };


        function Transition(fromID, toID) {
            this.fromID = fromID;
            this.toID = toID;
        }

        return Transition;
    });
