'use strict';
angular
    .module('myApp.factories')
    .factory('Actor', function () {

        Actor.prototype.getName = function () {
            return this.name;
        }
        Actor.prototype.setName = function (newName) {
            this.name = newName;
        }

        Actor.prototype.getColor = function () {
            return this.color;
        }
        Actor.prototype.setColor = function (newColor) {
            this.color = newColor;
        }

        Actor.prototype.getTasks = function () {
            return this.tasks;
        }
        Actor.prototype.addTask = function (newTask) {
            let index = this.tasks.indexOf(newTask);

            if (index == -1) {
                this.tasks.push(newTask);
            }
        }


        function Actor(name, tasks, color) {
            this.name = name;

            if(color == null){
                this.color = '#ffffff';
            }
            else {
                this.color = color;
            }

            this.tasks = [];
            this.tasks.push(tasks);
        }

        return Actor;
});