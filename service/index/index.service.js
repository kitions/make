/**
 * Created by lcx on 2017/4/25.
 */
angular.module('serviceIndex')
    .service('indexCourseService',function ($http,serverUrl) {
        this.getValues = function () {
            return $http.get(serverUrl+'/course/index');
        }
    })

    // .factory('indexCourseService',['$http','$state','$rootScope','serverUrl',function ($http,$state,$rootScope,serverUrl) {
    //
    //     return{
    //         values:function (data) {
    //             console.log(data);
    //             $http.get( serverUrl+'/course/index')
    //                 .then(function successCallback(response) {
    //                     // 请求成功执行代码
    //                     console.log(response.data );
    //                 }, function errorCallback(response) {
    //                     // 请求失败执行代码
    //
    //                 });
    //         }
    //     }
    //
    //
    // }])
    .factory('logout',function () {
       return{
           logout:function () {
               localStorage.removeItem('isLogin');
               localStorage.removeItem('user_tel');
               localStorage.removeItem('user_password');
               localStorage.removeItem('checkbox');
           }
       }
    })
