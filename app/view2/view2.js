'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('sentMailCntrl',function($scope, $http){

    $scope.sendMail = function(a) {

        if(a.fromMail == null){
            a.fromMail = "daniel.oliveira@uniriotec.br"
        }

        console.log(a.toEmail);
        var mailJSON = {
            "key": "549uFtxrpJxLAMZiveoq7g",
            "message": {
                "html": "" + a.mailBody,
                "text": "" + a.mailBody,
                "subject": "" + a.subject,
                "from_email": a.fromMail,
                "from_name": "BPMN Translation Contact -  ". a.fromName,
                "to": [
                    {
                        "email": "daniel.oliveira@uniriotec.br",
                        "name": "Daniel Villaça",
                        "type": "to"
                    }
                ],
                "important": false,
                "track_opens": null,
                "track_clicks": null,
                "auto_text": null,
                "auto_html": null,
                "inline_css": null,
                "url_strip_qs": null,
                "preserve_recipients": null,
                "view_content_link": null,
                "tracking_domain": null,
                "signing_domain": null,
                "return_path_domain": null
            },
            "async": false,
            "ip_pool": "Main Pool"
        };

        var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";

        $http.post(apiURL, mailJSON).success(function (data, status, headers, config) {
            alert('successful email send.');
            $scope.form = {};
            console.log('successful email send.');
            console.log('status: ' + status);
            console.log('data: ' + data);
            console.log('headers: ' + headers);
            console.log('config: ' + config);
        }).error(function (data, status, headers, config) {
            console.log('error sending email.');
            console.log('status: ' + status);
        });
    };
});