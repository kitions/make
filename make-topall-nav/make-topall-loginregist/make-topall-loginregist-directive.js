/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeTopAllLoginRegistModule')
.directive('makeTopAllLoginRegistDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-topall-nav/make-topall-loginregist/make-topall-loginregist-template.html",
        controller:['$scope','$http','$rootScope','logout','serverUrl','$state','$window',function ($scope,$http,$rootScope,logout,serverUrl,$state,$window) {
            $scope.exit  =function () {
                $rootScope.isLogin = 'flase';

                $state.go("index",{},{reload: true})
                $window.location.reload();

                $rootScope.user_id = "";
                console.log($rootScope)
                logout.logout();

            }

        }]
    }
})