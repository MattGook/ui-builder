"use strict";
angular.module('myBuilderApp')
    .factory('userProfile', function (LxNotificationService) {
        var myColor = [
            "#F44336",
            "#448AFF",
            "#FF9800",
            "#00BCD4",
            "#FF4081"
        ];
        var handle = {
            getMyColor: function () {
                return myColor;
            },
            addMyColor: function (color) {
                if (myColor.length >= 9) {
                    LxNotificationService.info('最多只能添加九个颜色');
                    return;
                } else {
                    myColor.unshift(color);
                }
            }
        };
        return handle;
    })
    .factory('siteConfig', function () {
        var data = {
            themeColor: [
                { type: "darkPrimaryColor", value: "#0288D1" },
                { type: "primaryColor", value: "#03A9F4" },
                { type: "lightPrimaryColor", value: "#B3E5FC" },
                { type: "text", value: "#ffffff" },
                { type: "accentColor", value: "#00BCD4" },
                { type: "primaryText", value: "#212121" },
                { type: "secondaryText", value: "#727272" },
                { type: "divider", value: "#B6B6B6" }
            ]
        };
        var handle = {
            getThemeColor: function () {
                return data.themeColor;
            },
            setThemeColor: function (colors) {
                data.themeColor = colors;
            }
        };
        return handle;
    })
    .factory('fontList', function () {
        var data = {
            en: ["Candara", "Helvetica"],
            cn: ["微软雅黑", "华文细黑"]
        };

        var handle = {
            getList: function (type) {
                return data[type];
            }
        };
        return handle;
    })
    .factory('shearPlate', function () {
        var data = {
            type: "",
            pageID: "",
            value: null
        };
        var handle = {
            setData: function (type, pageID, value) {
                data.type = type;
                data.pageID = pageID;
                data.value = value;
            },
            getData: function () {
                var returnData = jQuery.extend(true, {}, data);
                if (data.type == 'cut') {
                    data.type = "";
                    data.value = null;
                    data.ID = "";
                } else {
                }
                return returnData;
            },
            getHandle: function () {
                return data;
            }
        };
        return handle;
    })
    .factory('activeEleService', function (eleMenuServices) {
        var data = { ID: "ele", value: {} };
        var handle = {
            getEle: function () {
                return data;
            },
            setEle: function (data) {
                data.value = data;
                if(data.state=="edit"){
                    //隐藏menu
                    eleMenuServices.hideDom();                    
                }else{
                    //切换显示menu
                    eleMenuServices.showDom(data.ID,data.type);
                }
            },
            clear: function () {
                data.value = {};
                //隐藏menu 
                eleMenuServices.hideDom();                                    
            }
        };
        return handle;
    })
    .factory('activeSessionService', function () {
        var data = { ID: "session", value: {} };
        var handle = {
            getSession: function () {
                return data;
            },
            setSession: function (session) {
                data.value = session;
            },
            check: function (session) {
                if (session != data.value) {
                    return data.value;
                } else {
                    return false;
                }
            }
        };
        return handle;
    })
    
    /**
     * 计算元素的真实坐标
     */
    .factory('elePosition', function () {
        var handle = {
            getLeft: function (e) {
                var offset = e.offsetLeft;
                if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
                return offset;
            },
            getTop: function (e) {
                var offset = e.offsetTop;
                if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
                return offset;
            }
        };
        return handle;
    })
    .factory('activePageService', function () {
        var data = { ID: "page", value: {} };
        var handle = {
            getActivePage: function () {
                return data;
            },
            setActivePage: function (activePage) {
                data.value = activePage;
            }
        };
        return handle;
    })
    .factory('rotateEleCalculate', function () {
        var handle = {
            getSizeAndPosition: function (left, top, width, height, rotate) {
                /*
                * 获取真实的高度和位置
                * */
                var obj = { left: 0, top: 0, width: 0, height: 0 };

                obj.width = Math.abs(Math.cos(rotate * Math.PI / 180)) * width + Math.abs(Math.sin(rotate * Math.PI / 180)) * height;
                obj.height = Math.abs(Math.sin(rotate * Math.PI / 180)) * width + Math.abs(Math.cos(rotate * Math.PI / 180)) * height;

                obj.left = left + (width - obj.width) / 2;
                obj.top = top + (height - obj.height) / 2;

                obj.originalLeft = left;
                obj.originalTop = top;

                return obj;
            },
            getRotate: function (element) {
                var rotateText = $(element).css("transform");
                var rotate = 0;
                if (rotateText == "none") {
                    rotate = 0;
                } else {
                    rotateText = rotateText.substring(7, rotateText.length - 1);
                    rotate = Math.acos(parseFloat(rotateText.split(",")[0])) * 180 / Math.PI;
                    if (parseFloat(rotateText.split(",")[1]) < 0) {
                        rotate = 360 - rotate;
                    }
                }

                return rotate;

            }
        };
        return handle;
    })
    ;
