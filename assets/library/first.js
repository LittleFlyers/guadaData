var count = 0;//计数图标快的数量
var which = "";
var _offset = localStorage.getItem("user");//用户名
var listf = JSON.parse(localStorage.getItem("list"));//加载文件列表
var charts = new Array();//图表数组
var chartsname = new Array();//图表名称数组
var configdata = new Array();//配置信息数组
var chartlist = new Array();//图表id数组
/****生成画布 */
function gecanvas(i) {
    var div = document.createElement("div");
    div.innerHTML =
        "<div id=\"" + i + "\" class=\"col-md-7\" onclick=\"change(id)\" >" +
        "<div class=\"panel\">" +
        "<div class=\"panel-heading\">" +
        "<div class=\"right\">" +
        "<button type=\"button\" class=\"btn-toggle-collapse\"><i class=\"lnr lnr-chevron-up\"></i></button>" +
        // "<button type=\"button\" onclick=\"deleteDiv(" + count + ")\" class=\"btn-remove\"><i class=\"lnr lnr-cross\"></i></button>" +
        "<button id=\"btn" + i + "\" type=\"button\" onclick=\"deleteDiv(id)\" class=\"btn-remove\"><i class=\"lnr lnr-cross\"></i></button>" +
        "</div>" +
        "</div>" +
        "<div class=\"panel-body\">" +
        "<div id=\"myChart" + i + "\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" style=\"width:400px;height:400px\"></div>" +
        "</div>" +
        "</div>" +
        "</div>"
        ;

    document.getElementById("dragTarget").appendChild(div);
}
/*****加载组件库数据 */
function loadFirst() {
    for (var n = 0; n < listf.length; n++) {
        console.log(listf[n] + 1);
        document.write("<script type=\"text/javascript\" src=\"assets/library/" + listf[n] + ".js\"></script>");
    }
    var show = angular.module('myApp', []);

    show.controller('siteCtrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'http://mogujie.kuanxy.com/plain/chartsall.php',
        }).then(function successCallback(response) {
            $scope.types = new Array();
            // $scope.types = response.data.type;
            var test = new Array();
            chartlist.splice(0, chartlist.length);
            for (var i = 0; i < response.data.type.length; i++) {
                // $scope.types.push(response.data.type[i],1);
                var get = new Array();
                get["type"] = response.data.type[i].type;
                get["typeid"] = "#" + response.data.type[i].type;
                var temp = new Array();
                for (var l = 0; l < response.data.charts.length; l++) {
                    if (response.data.charts[l].type == response.data.type[i].type) {
                        var to = new Array();
                        to.push(response.data.charts[l].chart_name);
                        to.push(response.data.charts[l].chart_id);
                        chartlist.push(response.data.charts[l].chart_id);
                        temp.push(to);
                    }
                }
                get["charts"] = temp;
                $scope.types.push(get);
                $scope.username = _offset;
                console.log($scope.types);
                console.log(chartlist);
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
        });

    });
}
/*****加载已保存的 */
function loadSave() {
    loadFirst();
    var savename = localStorage.getItem("name");//'root的新画板';//
    console.log(savename);

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = JSON.parse(JSON.parse(xmlhttp.responseText)[0].map);
            for (var i = 0; i < list.length; i++) {
                //var loadconfig = JSON.parse(JSON.parse(xmlhttp.responseText)[0].config)[i];
                var clist = JSON.parse(JSON.parse(xmlhttp.responseText)[0].config);
                for (var j = 0; j < clist.length; j++) {
                    if (clist[j][0] == i) {
                        var loadconfig = clist[j];
                    }
                }
                loadconfig[4] = 1;
                if (list[i][4] == "add4") {
                    document.getElementById("titleC").value = loadconfig[1];
                    document.getElementById("linecolor").value = loadconfig[2];
                    document.getElementById("datapush").value = loadconfig[3];
                }
                configdata.push(loadconfig);
                console.log(loadconfig);
                gecanvas(i);
                var tempname = "myChart" + count;
                charts.push(count);
                chartsname.push(list[i][4]);
                window[list[i][4]](tempname, loadconfig, 0);
                count++;
                var setChart = document.getElementById("myChart" + i);
                var setDiv = document.getElementById(i);
                setDiv.style.position = "absolute"
                setDiv.style.top = list[i][0] + "px";
                setDiv.style.left = list[i][1] + "px";
                setChart.style.width = list[i][2] + "px";
                setChart.style.height = list[i][3] + "px";
            }
            console.log(configdata[1])
        }
    }
    xmlhttp.open("GET", "http://mogujie.kuanxy.com/plain/getsave.php?user='" + _offset + "'&name='" + savename + "'", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("contentType", "text/html;charset=uft-8");
    xmlhttp.send();
}

/**********拖动添加 */
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    console.log(ev.target.id);
    which = ev.target.id;
    ev.dataTransfer.setData("Text", ev.target.id);
}
function drop(ev) {
    for (var i = 0; i < chartlist.length; i++) {
        // if (which == "add1" || which == "add2") {
        if (which == chartlist[i]) {
            ev.preventDefault();

            /* var div = document.createElement("div");
             div.innerHTML =
                 "<div id=\"" + count + "\" class=\"col-md-7\" onclick=\"change(id)\" >" +
                 "<div class=\"panel\">" +
                 "<div class=\"panel-heading\">" +
                 "<div class=\"right\">" +
                 "<button type=\"button\" class=\"btn-toggle-collapse\"><i class=\"lnr lnr-chevron-up\"></i></button>" +
                 // "<button type=\"button\" onclick=\"deleteDiv(" + count + ")\" class=\"btn-remove\"><i class=\"lnr lnr-cross\"></i></button>" +
                 "<button id=\"btn" + count + "\" type=\"button\" onclick=\"deleteDiv(id)\" class=\"btn-remove\"><i class=\"lnr lnr-cross\"></i></button>" +
                 "</div>" +
                 "</div>" +
                 "<div class=\"panel-body\">" +
                 "<div id=\"myChart" + count + "\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" style=\"width:400px;height:400px\"></div>" +
                 "</div>" +
                 "</div>" +
                 "</div>"
                 ;
             document.getElementById("dragTarget").appendChild(div);*/
            gecanvas(count);
            var temp = "myChart" + count;
            charts.push(count);
            chartsname.push(which);
            window[which](temp);
            count++;
            which = "";
        }
    }
}
/******拖动 */
function change(id) {
    console.log(id);
    $("#" + id).draggable({ opacity: 0.3, containment: "#dragTarget", scroll: true, delay: 500 });
};
/********数据加载停止 */
function stop() {
    shell = 1;
};
/****打开配置面板*/
function openconfig() {
    document.getElementById("edit").style.display = "block";
    stop();
}
/*******关闭配置面板 */
function kill(id) {
    shell = 0;
    if (id == 0) {
        document.getElementById("edit").style.display = "none";
    } else if (id == 1) {
        document.getElementById("editsave").style.display = "none";
    }
};
/**********配置信息提交 */
function config() {
    var temp = new Array();
    console.log(localStorage.getItem("id"));
    var canvaid = localStorage.getItem("id");
    var titleC = document.getElementById("titleC").value;
    var linecolor = "#" + document.getElementById("linecolor").value;
    var obj = document.getElementById("datapush"); //定位id
    var index = obj.selectedIndex; // 选中索引
    var datapush = obj.options[index].value; // 选中值
    console.log(datapush);
    if (titleC == "" || linecolor == "") {
        alert("输入值不能为空");
    } else {
        temp.push(canvaid, titleC, linecolor, datapush, 0);
        for (var i = 0; i < configdata.length; i++) {
            if (canvaid == configdata[i][0]) {
                configdata.splice(i, 1);
            }
        }
        configdata.push(temp);
        var divname = "myChart" + charts[canvaid];
        window[chartsname[canvaid]](divname, temp, 1);
        localStorage.setItem("configlist", configdata);
        console.log(localStorage.getItem("configlist")[1]);
        kill(1);
        kill(0);
    }

}
var parameCount = 1;
/**
 * 删除分块
 */
function deleteDiv(id) {
    id = id.replace(/[^0-9]/ig, "");
    id = parseInt(id);
    console.log("删除" + id);
    $("#" + id).remove();
    count--;

    for (var i = 0; i < configdata.length; i++) {
        if (id == configdata[i][0]) {
            configdata.splice(i, 1);
        }
    }
    for (var i = id + 1; i < charts.length; i++) {
        document.getElementById(i).id = i - 1;
        var temp = i - 1;
        document.getElementById("btn" + i).id = "btn" + temp;
        document.getElementById("myChart" + i).id = "myChart" + temp;
        console.log(i - 1);
        for (var j = 0; j < configdata.length; j++) {
            if (i == configdata[j][0]) {
                configdata[j][0] = i - 1;
            }
        }
    }
    chartsname.splice(id, 1);
    charts.splice(id, 1);
    for (var i = 0; i < charts.length; i++) {
        charts[i] = i;
    }
}

/*******保存 */
function save(id) {
    if (configdata.length >= count) {
        if (id == 1) {
            var savename = localStorage.getItem("name");
        } else if (id == 0) {
            var savename = localStorage.getItem("panelname");
        }
        console.log(charts);
        var savemap = new Array();
        var im = new Array();
        for (var i = 0; i < charts.length; i++) {
            var temp = new Array();
            temp.push(document.getElementById(i).offsetTop);
            temp.push(document.getElementById(i).offsetLeft);
            temp.push(document.getElementById("myChart" + i).offsetWidth);
            temp.push(document.getElementById("myChart" + i).offsetHeight);
            temp.push(chartsname[i]);
            im.push(temp);
        }
        savemap.push(_offset);
        savemap.push(savename);
        savemap.push(im);
        savemap.push(JSON.stringify(configdata));
        console.log(savemap);
        var data = JSON.stringify(savemap);
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
                if (xmlhttp.responseText == 0) {
                    kill(1);
                }
                if (id == 1) {
                    location.reload();
                } else if (id == 0) {
                    getpage(savename);
                }
            }
        }
        if (id == 1) {

            xmlhttp.open("POST", "http://mogujie.kuanxy.com/plain/updata.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("contentType", "text/html;charset=uft-8");
            xmlhttp.send("data=" + data);

        } else if (id == 0) {
            xmlhttp.open("POST", "http://mogujie.kuanxy.com/plain/usersave.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("contentType", "text/html;charset=uft-8");
            xmlhttp.send("data=" + data);
        }
    } else {
        alert("尚有未配置的图表");
        //alert(configdata);
    }

}
/*****跳转页面 */
function getpage(name) {
    console.log(name);
    localStorage.setItem("name", name);
    window.location.href = "http://mogujie.kuanxy.com/datashow/saveshow.html";
}

/***获取用户列表
 */
function getlist() {
    //_offset = localStorage.getItem("user");
    console.log(_offset);
    var app = angular.module('myApp', []);

    app.controller('siteCtrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'http://mogujie.kuanxy.com/plain/getsave.php?user=\'' + _offset + '\'',
        }).then(function successCallback(response) {
            $scope.names = new Array();
            for (var i = 0; i < response.data.length; i++) {
                $scope.names.push(response.data[i].name);
            }
            $scope.username = _offset;
            console.log($scope.names);
        }, function errorCallback(response) {
            // 请求失败执行代码
        });

    });
}
/****返回 */
function backtolist() {
    window.location.href = "http://mogujie.kuanxy.com/datashow/userlist.html";
}