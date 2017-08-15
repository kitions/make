/**
 * Created by hp on 2017-4-23.
 */
angular.module('makeZhishiPathModule')
    .directive('makeZhishiPathDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"cmake-zhishi-path/make-zhishi-path.template.html",
            controller:['$scope','$http',function ($scope,$http) {
            }]
        }
    })