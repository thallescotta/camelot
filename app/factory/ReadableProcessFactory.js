'use strict';

angular
  .module('myApp.factories')
  .factory('ReadableProcess', function () {

    ReadableProcess.prototype.addTask = function (newTask) {
      let index = this.tasks.indexOf(newTask);

      if (index == -1) {
        this.tasks.push(newTask);

        this.addActor(newTask.getActor());
        let indexActor = this.actors.indexOf(newTask.getActor());
      }
    };

    ReadableProcess.prototype.getTasks = function () {
      return this.tasks;
    };

    ReadableProcess.prototype.getTask = function (index) {
      return this.tasks[index];
    };

    ReadableProcess.prototype.getDisabledTasks = function () {
      return this.disabledTasks;
    };

    ReadableProcess.prototype.getDisabledTask = function (index) {
      return this.disabledTasks[index];
    };

    ReadableProcess.prototype.getActors = function () {
      return this.actors;
    };

    ReadableProcess.prototype.getActor = function (index) {
      return this.actors[index];
    };

    ReadableProcess.prototype.deleteTask = function (readableTask) {
      let index = this.tasks.indexOf(readableTask);

      if (index > -1) {
        this.disabledTasks.push(this.tasks[index]);
        this.tasks.splice(index, 1);
      }
    };

    ReadableProcess.prototype.activateTask = function (readableTask) {
      console.log(this.actors);
      console.log(readableTask);

      let indexTask = this.disabledTasks.indexOf(readableTask);
      let indexActor = this.actors.indexOf(readableTask.actor);

      if (indexActor == -1) {
        this.actors.unshift(readableTask.actor);
      }

      if (indexTask > -1) {
        this.tasks.push(this.disabledTasks[indexTask]);
        this.disabledTasks.splice(indexTask, 1);
      }
    };

    ReadableProcess.prototype.deleteActor = function (actor) {
      let tasksToBeDeleted = this.getTasksByActor(actor);
      let index = this.actors.indexOf(actor);

      for (let task of tasksToBeDeleted) {
        this.deleteTask(task);
      }

      this.disabledActors.push(this.actors[index]);
      this.actors.splice(index, 1);

    };

    ReadableProcess.prototype.addActor = function (newActor) {
      let index = this.actors.indexOf(newActor);

      if (index == -1) {
        this.actors.push(newActor);
      }
    };

    ReadableProcess.prototype.getTasksByActor = function (actor) {
      let tasks = [];

      for (let task of this.tasks) {
        let taskActors = task.getActor();

        if ((actor == "none") && (taskActors == "")) {
          tasks.push(task);
        }
        else {
          let actorIndex = taskActors.indexOf(actor);

          if (actorIndex != -1) {
            tasks.push(task);
          }
        }
      }
      return tasks;
    };

    ReadableProcess.prototype.setActorName = function (newActorName, oldActorName) {
      let index = this.actors.indexOf(oldActorName);

      if (index != -1) {
        this.actors[index] = newActorName;

        for (let task of this.getTasksByActor(oldActorName)) {
          task.setActor(newActorName);
        }
      }
    };

    ReadableProcess.prototype.setActorColor = function (actor, color) {
      let index = this.actors.indexOf(actor);

      if (index != -1) {
        for (let task of this.getTasksByActor(this.actors[index])) {
          task.setColor(color);
        }
      }
    };

    ReadableProcess.prototype.addTransition = function (newTransition) {
      let index = this.transitions.indexOf(newTransition);

      if (index == -1) {
        this.transitions.push(newTransition);
      }
    };

    ReadableProcess.prototype.getTransitions = function () {
      return this.transitions;
    };

    ReadableProcess.prototype.getTransition = function (index) {
      return this.transitions[index];
    };

    ReadableProcess.prototype.getTasksOrdered = function () {
      let orderedTasks = [];

      for (let transition of this.transitions) {
        for (let task of this.tasks) {
          if (task.getID() == transition.getToID()) {
            orderedTasks.push(task);
          }
        }
      }

      return orderedTasks;
    };


    ReadableProcess.prototype.draw = function (context) {
      function roundRect(ctx, x, y, width, height, radius, fill, stroke, taskColor) {
        if (typeof stroke == 'undefined') {
          stroke = true;
        }
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
          var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        if (fill) {
          ctx.fillStyle = taskColor;
          ctx.fill();
        }

        if (stroke) {
          ctx.stroke();
        }
      }

      function arrow(ctx, x, y) {

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y);
        ctx.lineTo(x + 10, y + 10);
        ctx.lineTo(x + 25, y - 8);
        ctx.lineTo(x + 10, y - 26);
        ctx.lineTo(x + 10, y - 16);
        ctx.lineTo(x, y - 16);
        ctx.lineTo(x, y);
        ctx.closePath();

        ctx.stroke();
      }

      var coordinateX = 25;
      var coordinateY = 50;
      var actorWidth = 130;
      var actorHeight = 20;
      var taskWidth = 130;
      var taskHeight = 130;
      var commentWidth = 130;
      var commentHeight = 40;
      var maxTextWidth = 120;
      var textHeight = 20;
      var spaceBetweenBoxes = 20;
      var taskIndex = 0;
      let tasks = this.getTasksOrdered();
      var widthCanvas = 150;
      var heightCanvas = 650;

      var initialTaskHeight = taskHeight;

      if (tasks.length > 0) {
        $(".drawing").css("overflow", "scroll");

        for (var i = 0; i < tasks.length; i++) {
          widthCanvas += 180;
        }
        $("#processCanvas").attr("width", widthCanvas);
        $("#processCanvas").attr("height", heightCanvas);
      }

      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, widthCanvas, heightCanvas);

      for (let task of tasks) {
        context.font = "bold 15px Arial";
        var textCount = 0;
        taskIndex++;

        let actor = task.getActor(0);

        let actorName = actor.split(' ');

        if ((actor == null) || (actor == "")) {
          actor = "Nenhum ator!";
        }

        if (actorName.length >= 3 || (actorName.length == 2 && actorName[0].length + actorName[1].length > 10)) {
          for (let i = 0; i < actorName.length; i++) {
            textCount += actorName[i].length;
          }

          textCount -= 10;
        }

        let comments = task.getAllComment();
        context.fillStyle = "#FFFFFF";

        context.beginPath();
        context.arc(coordinateX + actorWidth / 2 + (textCount * 7.5), coordinateY - 25, 10, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.fillStyle = "#111111";
        if (taskIndex >= 10) {
          this.wrapText(context, taskIndex + "", coordinateX + actorWidth / 2 - 6 + (textCount * 7.5), coordinateY - 22, maxTextWidth, textHeight);
        }
        else {
          this.wrapText(context, taskIndex + "", coordinateX + actorWidth / 2 - 3 + (textCount * 7.5), coordinateY - 22, maxTextWidth, textHeight);
        }

        context.closePath();

        context.fillStyle = "#FFFFFF";

        if (actorName.length == 1 || actorName.length == 2 && (actorName[0].length + actorName[1].length <= 10)) {
          roundRect(context, coordinateX, coordinateY, actorWidth, actorHeight, 12, true, true, task.getColor());
          if (isTooDark(task.getColor())){
            context.fillStyle = "#FFFFFF";
          } else {
            context.fillStyle = "#111111";
          } 
          context.fillText(actor, coordinateX + 10, coordinateY + 13);
        } else {
          roundRect(context, coordinateX, coordinateY, actorWidth + (textCount * 15), actorHeight, 12, true, true, task.getColor());
          if (isTooDark(task.getColor())){
            context.fillStyle = "#FFFFFF";
          } else {
            context.fillStyle = "#111111";
          } 
          context.fillText(actor, coordinateX + 10, coordinateY + 13);
        }

        coordinateY += actorHeight + spaceBetweenBoxes;
        coordinateX += textCount * 15;

        var words = task.getDefinition().split(' ');
        var line = '';
        var height = 0;
        let linesNumber = -0.5;

        for (let n = 0; n < words.length; n += 2) {
          let fstWordWidth = context.measureText(line + words[n] + ' ').width;
          let sndWordWidth = context.measureText(line + words[n + 1] + ' ').width;

          if (fstWordWidth + sndWordWidth < maxTextWidth) {
            linesNumber += 1;
          } else {
            linesNumber += 2;
          }
        }

        // console.log("Lines: " + linesNumber);
        // console.log("Task Height: " + taskHeight);
        // console.log("Height: " + linesNumber * textHeight);

        if (taskHeight < linesNumber * textHeight) {
          taskHeight = linesNumber * textHeight + 15;
        }

        context.fillStyle = "#FFFFFF";

        roundRect(context, coordinateX - textCount * 7.5, coordinateY, taskWidth, taskHeight, 15, true, true, task.getColor());

        if (isTooDark(task.getColor())){
          context.fillStyle = "#FFFFFF";
        } else {
          context.fillStyle = "#111111";
        }        

        this.wrapText(context, task.getDefinition(), coordinateX + 10 - textCount * 7.5, coordinateY + 20, maxTextWidth, textHeight);

        if (taskIndex != this.tasks.length) {
          arrow(context, coordinateX + 10 + taskWidth, coordinateY + initialTaskHeight / 2 + 5);
        }

        for (let comment of comments) {
          context.font = "14px Arial";

          if ((comment != null) && (comment.getText() != "")) {
            coordinateY += taskHeight + spaceBetweenBoxes;
            context.beginPath();
            context.moveTo(coordinateX + actorWidth / 2 - textCount * 7.5, coordinateY - spaceBetweenBoxes);
            context.lineTo(coordinateX + actorWidth / 2 - textCount * 7.5, coordinateY);
            context.stroke();
            context.closePath();

            var commentText = "";
            if (comment.getType() == "rule") {
              context.fillStyle = "#1FFFD1";
              commentText = "Regra: " + comment.getText();
            }
            if (comment.getType() == "flux") {
              context.fillStyle = "#FFFFFF";
              context.setLineDash([3, 3]);
              commentText = comment.getText();
            }
            if (comment.getType() == "remark") {
              context.fillStyle = "#25FF63";
              commentText = comment.getText();
            }

            let commentWords = comment.getText().split(' ');

            if (commentWords.length > 1) {
              for (let word in commentWords) {
                commentHeight += 10;
              }
            }

            context.strokeRect(coordinateX - textCount * 7.5, coordinateY, commentWidth, commentHeight);
            context.fillRect(coordinateX - textCount * 7.5, coordinateY, commentWidth, commentHeight);

            context.setLineDash([]);
            context.fillStyle = "#111111";
            //context.fillText(comment, coordinateX + 10, coordinateY + 15);
            this.wrapText(context, commentText, coordinateX + 10 - textCount * 7.5, coordinateY + 15, maxTextWidth, textHeight);
          }

          coordinateY += commentHeight - taskHeight;
          commentHeight = 40;
        }

        coordinateY = 50;
        coordinateX += 180;
        textCount = 0;
        taskHeight = initialTaskHeight;
      }

    }

    var isTooDark = function (c) {
      var c = c.substring(1);      // strip #
      var rgb = parseInt(c, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >> 8) & 0xff;  // extract green
      var b = (rgb >> 0) & 0xff;  // extract blue

      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

      if (luma < 40) {
        return true;
      }

      return false;
    }

    ReadableProcess.prototype.wrapText = function (context, text, x, y, maxWidth, lineHeight) {
      var words = text.split(' ');
      var line = '';

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }

      context.fillText(line, x, y);
    }

    function ReadableProcess() {
      this.tasks = [];
      this.disabledTasks = [];
      this.actors = [];
      this.disabledActors = [];
      this.transitions = [];
    }

    return ReadableProcess;
  });