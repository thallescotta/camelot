angular
    .module('myApp.directives')
    .directive('onReadFile', function ($parse) {
        return {
            restrict: 'A',
            scope: {
                onReadFile : "&"
            },
            link: function(scope, element, attrs) {
                element.on('change', function(e) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        scope.$apply(function() {
                            scope.onReadFile({$content:e.target.result});
                        });
                    };
                    reader.readAsText((e.srcElement || e.target).files[0]);
                });
            }
        };
    });


/*
angular
    .module('myApp.directives')
    .directive('jrFileChooser', ['jrFileReader', function (jrFileReader){
        return{
            replace: true,
            template: '<input type="file"/>',
            link: function($scope, element, attrs){
                element.on('change', function () {


                    //TODO: Uncaught TypeError: Failed to execute 'readAsText' on 'FileReader': parameter 1 is not of type 'Blob'.
                    jrFileReader.readAsText($scope.file,$scope)
                        .then(function(result){
                            var data = result;
                        });
                    //jrFileReader
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( data );
                    console.log("PORRAAAAAAAAAA");
                    console.log(json);
                });
            }
        };
}]);
*/