/**
 * Created by hp on 2017-4-23.
 */
angular.module('acDetailsChapterModule')
    .directive('acDetailsChapterDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"ac-details-chapter/ac-details-chapter.template.html",
            controller:['$scope','$http',function ($scope,$http) {

            }]
        }
    })