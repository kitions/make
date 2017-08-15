/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeQuestionIndexModule')
.directive('makeQuestionIndexDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-question-index/make-question-index-template.html",
        controller:['$scope','$http','serverUrl',function ($scope,$http,serverUrl) {
            $scope.count=1;
            //var maxwidth=2;
            //if($(".answer-content").text().length>maxwidth){
            //    $(".answer-content").text($(".answer-content").text().substring(0,maxwidth));
            //    $(".answer-content").html($(".answer-content").html()+'...');
            //}
            //请求猿问主页
            var pages=10;
            $scope.curpage=0;//默认第一页下标为0
            $http.get(serverUrl+'question/getIndexquestionData')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.questionData = response.data;
                    $scope.itemx=[];//存放分页的
                    for(var i=0,len=$scope.questionData.length;i<len;i+=pages){
                        $scope.itemx.push($scope.questionData.slice(i,i+pages));
                    }
                    $scope.totalPage=Math.ceil(($scope.questionData).length/pages)//总页数从1开始
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
                    console.log("nosuccess")
                });
            //猿问全部
            $http.get(serverUrl+'question/getAllquestion')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.questionAllData = response.data;
                    for(var i = 0;i<$scope.questionAllData.length;i++){
                        $scope.date=new Date($scope.questionAllData[i].qtime);
                        $scope.questionAllData[i].qtime=$scope.date.toLocaleString();
                    }
                    $scope.itemx1=[];//存放分页的
                    for(var i=0,len=$scope.questionAllData.length;i<len;i+=pages){
                        $scope.itemx1.push($scope.questionAllData.slice(i,i+pages));
                    }
                    $scope.totalPage=Math.ceil(($scope.questionAllData).length/pages)//总页数从1开始
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
                    // console.log(questionIndexData)
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            //等待回答
            $http.get(serverUrl+'question/getwaitquetion')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getwaitquetion = response.data;
                    $scope.itemx2=[];//存放分页的
                    for(var i=0,len=$scope.getwaitquetion .length;i<len;i+=pages){
                        $scope.itemx2.push($scope.getwaitquetion .slice(i,i+pages));
                    }
                    $scope.totalPage=Math.ceil(($scope.getwaitquetion ).length/pages)//总页数从1开始
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
                    // console.log(questionIndexData)
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
        }]
    }
})
$(document).on('click','.navs a',function () {
    $(this).addClass('reda').siblings().removeClass('reda');
});
//$(document).ready(function(){
//    $(".answer-content").each(function()
//    { var maxwidth=2;
//        if($(this).text().length>maxwidth){
//            $(this).text($(this).text().substring(0,maxwidth));
//            $(this).html($(this).html()+'...');
//        }
//    });
//});


