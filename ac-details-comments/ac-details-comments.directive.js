/**
 * Created by hp on 2017-4-23.
 */
angular.module('acDetailsCommentsModule')
    .directive('acDetailsCommentsDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"ac-details-comments/ac-details-comments.template.html",
            controller:['$scope','$http',function ($scope,$http) {
            }]
        }
    })