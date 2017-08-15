/**
 * Created by hp on 2017-5-6.
 */
angular.module('pageModule')
    .directive('doPage', function () {
        return{
            restrict : 'E',
            templateUrl : 'pages/page.html',
            replace : true,
            transclude : true,
            link: function (scope,ele,attr) {
                //首页
                scope.prevPage= function () {
                    scope.curpage=0;
                    if(scope.totalPage>2){
                        scope.pages = [
                            scope.curpage ,
                            scope.curpage + 1,
                        ]
                    }
                }
                //上一页
                scope.prev= function () {
                    if(scope.curpage >1 && scope.totalPage>2){
                        scope.curpage--;
                        scope.pages = [
                            scope.curpage-1,
                            scope.curpage,
                            scope.curpage + 1
                        ];
                    }else if(scope.curpage=0){

                        //scope.curpage--;

                        scope.pages = [
                            scope.curpage,
                            scope.curpage + 1
                        ];
                    }
                }
                //下一页
                scope.next= function () {

                    if(scope.curpage<scope.totalPage-2){
                        scope.curpage++;
                        scope.pages = [
                            scope.curpage - 1,
                            scope.curpage,
                            scope.curpage + 1
                        ];
                    }
                    else if(scope.curpage==scope.totalPage-2){

                        scope.curpage++;

                        scope.pages = [
                            scope.curpage-1,
                            scope.curpage
                        ];
                    }
                }
                //尾页
                scope.nextPage= function () {
                    scope.curpage=scope.totalPage-1;
                    // console.log(scope.curpage)
                    if(scope.curpage>1){
                        scope.pages = [
                            scope.curpage - 1,
                            scope.curpage,
                        ];}
                }

//当前页
                scope.setPage= function (page,l) {
                    scope.curpage=page;
                    if(scope.curpage>0&&scope.curpage<l-1){
                        scope.pages = [
                            scope.curpage - 1,
                            scope.curpage,
                            scope.curpage + 1
                        ];
                    }else if(scope.curpage==0&&l>1){
                        scope.pages = [
                            scope.curpage,
                            scope.curpage + 1]
                    }else if (scope.curpage == l && l > 1) {
                        scope.pages = [
                            scope.curpage - 1,
                            scope.curpage
                        ];
                    }
                }
            }
        }
    })
