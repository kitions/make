/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeShopcarMycartModule')
.directive('makeShopcarMycartDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-shopcar/make-shopcar-mycart/make-shopcar-mycart-template.html",
        controller:['$scope','$http',function ($scope,$http) {
            
        }]
    }
})