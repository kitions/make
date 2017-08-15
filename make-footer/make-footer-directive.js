/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeFooterModule')
.directive('makeFooterDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-footer/make-footer-template.html",
        controller:['$scope','$http',function ($scope,$http) {
            

        }]
    }
})