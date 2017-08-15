/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeEditModule')
.directive('makeEditDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-edit/make-edit-template.html",
        controller:['$scope',function ($scope) {
        }],
        link : function(scope, element, attrs){
            var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineNumbers: true,
                matchBrackets: true,
                mode: "text/x-java",
                indentUnit: 4,
                indentWithTabs: true,
                fontSize:20

            });
            editor.setSize(700,600);
             scope.runCode=function () {
                 var s = editor.getValue();
                 var win = window.open('', "_blank", '');
                 win.document.open('text/html', 'replace');
                 win.opener = null;
                 win.document.write(s);
                 win.document.close();
             }
        }


    }
})



