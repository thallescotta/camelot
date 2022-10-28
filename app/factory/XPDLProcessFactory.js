/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('XPDLProcess', function () {

        var task = [];

        function XPDLProcess(task) {
            this.task = task;
        }

        return XPDLProcess;
});