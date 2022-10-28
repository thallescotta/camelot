'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableTask', function () {

        ReadableTask.prototype.addComment = function (newComment){
            let index = this.actor.indexOf(newComment);

            if(index == -1){
                this.comment.push(newComment);
            }
            else{
                alert("This comment already exists!")
            }
            if(typeof this.comment[0] == 'undefined'){
                this.comment.splice(0, 1);
            }
        }

        ReadableTask.prototype.addDefinition = function (newTaskDefinition){
            this.taskDefinition = newTaskDefinition;
        }

        ReadableTask.prototype.getActor = function () {
            return this.actor;
        }

        ReadableTask.prototype.getAllComment = function () {
            return this.comment;
        }
        
        ReadableTask.prototype.getComment = function (index) {
            return this.comment[index];
        }
        
        ReadableTask.prototype.setComment = function (newComment, oldComment) {
            let index = this.comment.indexOf(oldComment);

            if (index != -1) {
                this.comment[index] = newComment;
            }
        }

        ReadableTask.prototype.getDefinition = function () {
            return this.taskDefinition;
        }

        ReadableTask.prototype.getNumberOfComments = function () {
            return this.comment.length;
        }

        ReadableTask.prototype.setActor = function(newActor){
            this.actor = newActor;
        }

        ReadableTask.prototype.getColor = function(){
            return this.color;
        }
        ReadableTask.prototype.setColor = function(newColor){
            this.color = newColor;
        }

        ReadableTask.prototype.getID = function(){
            return this.id;
        }
        ReadableTask.prototype.setID = function(newID){
            this.id = newID;
        }

        function ReadableTask(newActor, newTaskDefinition, id, newComment, newColor) {
            this.actor = newActor;
            this.taskDefinition = newTaskDefinition;

            if(newColor == null){
                this.color = "#ffffff";
            }
            else {
                this.color = newColor;
            }

            this.comment = [];
            this.comment.push(newComment);
            this.id = id;
        }

        return ReadableTask;
});