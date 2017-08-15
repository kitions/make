/**
 * Created by hp on 2017-4-22.
 */
angular.module('makeCourseModule')
    .directive('makeCourseDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"cmake-course/make-course.template.html",
            controller:['$scope','$http','serverUrl','$stateParams','$state',function ($scope,$http,serverUrl,$stateParams,$state) {
                $scope.column='';
                $scope.desc=false;
                $http.get(serverUrl+'course/index')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.courseData = response.data;
                        $scope.newcourse_type= $scope.courseData;
                        var pages=8;
                        $scope.curpage=0;//默认第一页下标为0
                        $scope.itemx=[];//存放分页的
                        for(var i=0,len=$scope.newcourse_type.length;i<len;i+=pages){
                            $scope.itemx.push($scope.newcourse_type.slice(i,i+pages));
                        }
                        $scope.totalPage=Math.ceil(($scope.newcourse_type).length/pages)//总页数从1开始
                        if($scope.curpage>0&&$scope.curpage< $scope.totalPage){
                            $scope.pages = [
                                $scope.curpage - 1,
                                $scope.curpage,
                                $scope.curpage + 1

                            ];

                        }else if($scope.curpage==0&& $scope.totalPage>1){
                            $scope.pages = [
                                $scope.curpage,

                                $scope.curpage + 1]
                        }else if ($scope.curpage ==  $scope.totalPage ) {
                            $scope.pages = [
                                $scope.curpage - 1,
                                $scope.curpage
                            ];
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                $http.get(serverUrl+'course/c_direction')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.directionData = response.data;
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                $http.get(serverUrl+'course/c_sort')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.sortData = response.data;
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                $http.get(serverUrl+'course/c_type')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.typeData = response.data;
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });

                $scope.conditions={
                    _direction:'',
                    _sort:0,
                    _type:''
                };
                $scope.Direction=function (d) {
                    $scope.conditions._direction=d;
                    $scope.filtercourse($scope.conditions);
                };
                $scope.Sort=function (s) {
                    $scope.conditions._sort=s;
                    $scope.filtercourse($scope.conditions);
                };
                $scope.Type=function (t) {
                    $scope.conditions._type=t;
                    $scope.filtercourse($scope.conditions);
                }

                $scope.filtercourse=function (conditions) {

                    // console.log($scope.conditions);

                    $scope.newcourse_direction=[];
                    if($scope.conditions._direction!=0){
                        for(var i=0;i<$scope.courseData.length;i++){
                            if($scope.courseData[i].c_directionno===$scope.conditions._direction){
                                $scope.newcourse_direction.push($scope.courseData[i])
                            }
                        }

                    }else {
                        $scope.newcourse_direction=$scope.courseData;
                    }
                    $scope.newcourse_sort=[];

                    if($scope.conditions._sort!=0){
                        for(var i=0;i<$scope.newcourse_direction.length;i++){
                            if($scope.newcourse_direction[i].c_sortno===$scope.conditions._sort){
                                $scope.newcourse_sort.push($scope.newcourse_direction[i])
                            }
                        }
                    }else {
                        $scope.newcourse_sort= $scope.newcourse_direction;
                    }
                    $scope.newcourse_type=[];
                    if($scope.conditions._type!=0){
                        for(var i=0;i<$scope.newcourse_sort.length;i++){
                            if($scope.newcourse_sort[i].c_typeno===$scope.conditions._type){
                                $scope.newcourse_type.push($scope.newcourse_sort[i])
                            }
                        }
                    }else {
                        $scope.newcourse_type= $scope.newcourse_sort;
                    }
                    var pages=8;
                    $scope.curpage=0;//默认第一页下标为0
                    $scope.itemx=[];//存放分页的
                    for(var i=0,len=$scope.newcourse_type.length;i<len;i+=pages){
                        $scope.itemx.push($scope.newcourse_type.slice(i,i+pages));
                    }
                    $scope.totalPage=Math.ceil(($scope.newcourse_type).length/pages)//总页数从1开始
                    if($scope.curpage>0&&$scope.curpage< $scope.totalPage){
                        $scope.pages = [
                            $scope.curpage - 1,
                            $scope.curpage,
                            $scope.curpage + 1

                        ];

                    }else if($scope.curpage==0&& $scope.totalPage>1){
                        $scope.pages = [
                            $scope.curpage,

                            $scope.curpage + 1]
                    }else if ($scope.curpage ==  $scope.totalPage ) {
                        $scope.pages = [
                            $scope.curpage - 1,
                            $scope.curpage
                        ];
                    }
                }
            }]
        }
    })
$(document).on('click','#direction li,#sort li,#type li',function () {
    $(this).addClass('ons').siblings().removeClass('ons');
})

