"use strict";
angular.module('addSession', [])
    .directive('addSessionBox', function () {
        return {
            restrict: 'A',
            templateUrl: "views/addSession/sessionList.html",
            link: function (scope, element, attrs) {
                var mySwiper = $(element).find(".swiper-container").swiper({
                    direction: 'horizontal',
                    slidesPerView: "auto"
                });
            }
        };
    })
    .directive('addSessionHandle', function ($compile, $timeout, elePosition, levelScroll,$rootScope) {
        return {
            restrict: 'A',
            scope: {},
            template: '<div class="add-session-handle bottom z-depth-2" onmousedown="event.stopPropagation()" ng-class="{true:\'open\'}[showFlag]"><i class="mdi mdi-plus"></i></div>',
            replace: true,
            link: function (scope, element, attrs) {
                //记录高度 由于动画的原因无法正常获取高度                
                var addSessionBoxHeight = 200;

                //存储滚动条到handle
                var mainScrollHandle = $('#main-editor-scroll');

                var parentSessionDom = $(element).parent(".ele-session-box");
                scope.showFlag = false;
                var template = "<div class='add-session-box' add-session-box></div>";
                var dom = "";

                //用来捕捉鼠标点击事件 如果不是在可触范围内 则隐藏按钮
                var mouseDownEvent = function (e) {
                    if (scope.showFlag === true) {
                        var target = e.target;
                        if (target === dom[0] || dom[0] === $(target).parents(".add-session-box")[0] || target === element[0] || $(target).parents(".add-session-box")[0] === element[0]) {
                            //不需要隐藏
                        } else {
                            //隐藏
                            $timeout(function () {
                                //开始形变
                                $rootScope.$emit("addSessionOpenStart");
                                dom.removeClass("in");
                                dom.one("webkitTransitionEnd otransitionend transitionend",function(){
                                    //形变结束
                                    $rootScope.$emit("addSessionOpenEnd");                                    
                                });
                                $timeout(function () {
                                    scope.showFlag = false;
                                    
                                },300);
                            }, 100);
                        }

                    }
                };

                $("body").on("mousedown", mouseDownEvent);

                $(element).on("click", function (e) {
                    if (!scope.showFlag) {
                        scope.showFlag = true;
                        //插入dom到session下面
                        if (dom === "") {
                            dom = $compile(template)(scope);
                            parentSessionDom.after(dom);
                        }

                        $timeout(function () {

                            //计算绝对位置 滚动滚动条到屏幕中间
                            var y = elePosition.getTop(dom[0]);
                            var start = mainScrollHandle.scrollTop();

                            var scrollEnd = 0;
                            scrollEnd = y + addSessionBoxHeight / 2 - $("body").height() / 2;

                            levelScroll.scrollTop(mainScrollHandle, scrollEnd);

                            dom.addClass("in");
                            
                        });
                    } else {
                        //隐藏
                        $timeout(function () {
                            scope.showFlag = false;
                        },300);
                        //形变开始
                        $rootScope.$emit("addSessionOpenStart");                        
                        dom.removeClass("in");
                        dom.one("webkitTransitionEnd otransitionend transitionend",function(){
                            //形变结束
                            $rootScope.$emit("addSessionOpenEnd");                                    
                        });
                    }
                });

                scope.$on("$destroy", function () {
                    $("body").off("mousedown", mouseDownEvent);
                    if (dom !== "") {
                        dom.remove();
                    }
                });

            }
        };
    });