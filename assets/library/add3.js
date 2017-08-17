function add3(name, configlist) {
    var dom = document.getElementById(name);
    dom.ondblclick = function () {
        console.log(configlist);
        console.log(name.replace(/[^0-9]/ig, ""));
        localStorage.setItem("id", name.replace(/[^0-9]/ig, ""));
        document.getElementById("edit").style.display = "block";
        stop();
    }
    var myChart = echarts.init(dom);
    var app = {};
    var value = 0;
    var bvalue = [];
    var dateDb = "";
    var timeInput = 0;
    var step = "h";
    var control = 0;
    option = null;
    option = {
        title: {
            text: ""
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['']
        },
        toolbox: {
            show: false,
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: (function () {
                    var now = new Date();
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.unshift("....");
                        now = new Date(now);
                    }
                    return res;
                })()
            },
            {
                type: 'category',
                boundaryGap: true,
                data: (function () {
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.push(len + 1);
                    }
                    return res;
                })()
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '数据',
                max: 3000,
                min: 0,
                boundaryGap: [0.1, 0.1]
            },
            {
                type: 'value',
                scale: true,
                name: '数据',
                max: 3000,
                min: 0,
                boundaryGap: [0.1, 0.1]
            }
        ],
        series: [
            {
                name: '预购队列',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: (function () {
                    var res = [];
                    var len = 10;
                    while (len--) {

                        res.push(Math.round(Math.random() * 0));
                    }
                    return res;
                })()
            },
            {
                name: '数据点',
                type: 'line',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: "#00000"
                        }
                    }
                },
                data: (function () {
                    var res = [];
                    var len = 0;
                    var list = bloadXMLDoc();
                    while (len < 10) {
                        console.log(len);
                        res.push((list[0][0]).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    };

    app.count = 11;
    function bloadXMLDoc() {
        var xmlhttp;
        var arrayList = [[0]];
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                arrayList = JSON.parse(xmlhttp.responseText)["results"][0].series[0].values;
            }
        }
        xmlhttp.open("GET", "http://120.24.40.241/data.php", true);
        xmlhttp.send();
        return arrayList
    };



    function loadXMLDoc() {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var list = JSON.parse(xmlhttp.responseText)["results"][0].series;
                /*for(var i = arrayList.length-1;i>arrayList.length-4;i--){
                    var test = arrayList[i][0].slice(11,19);
                    if(string(test) == string(axisData)){
                        value=arrayList[i][2];
                        break;
                    }
                }*/
                if (list == undefined) {
                    value = 0;

                } else {
                    var arrayList = JSON.parse(xmlhttp.responseText)["results"][0].series[0].values;
                    value = arrayList[arrayList.length - 1][2];

                    //value = arrayList;
                }
            }
        }
        if (timeInput != 0) {
            var url = "http://120.24.40.241:8086/query?db=test&q=Select%20*%20from%20experience%20where%20time%20%3C%20now()-" + timeInput.toString() + step;
            xmlhttp.open("GET", url, true);
        } else {
            xmlhttp.open("GET", "http://120.24.40.241:8086/query?db=test&q=Select%20*%20from%20experience", true);
            //xmlhttp.open("GET", configlist[3], true);
        }
        //xmlhttp.open("GET","http://120.24.40.241/data.php",true);
        xmlhttp.send();
    };
    function loadControl() {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var arrayList = JSON.parse(xmlhttp.responseText)["results"][0].series[0].values;
                control = arrayList[arrayList.length - 1][1];


            }
        }

        xmlhttp.open("GET", "http://120.24.40.241:8086/query?db=control&q=select%20*%20from%20control", true);
        xmlhttp.send();
    };

    function loadGoback() {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var arrayList = JSON.parse(xmlhttp.responseText)["results"][0].series[0].values;
                timeInput = arrayList[arrayList.length - 1][2];
                step = arrayList[arrayList.length - 1][1];
            }
        }

        xmlhttp.open("GET", "http://120.24.40.241:8086/query?db=control&q=select%20*%20from%20goback", true);
        xmlhttp.send();
    };
    function goback() {
        timeInput = 0;
        step = "h";
    }
       if(configlist!=undefined){
        option.title.text = configlist[1];
    }
    setInterval(function () {
        dom.ondblclick = function () {
            console.log(configlist);
            console.log(name.replace(/[^0-9]/ig, ""));
            localStorage.setItem("id", name.replace(/[^0-9]/ig, ""));
            document.getElementById("edit").style.display = "block";
            stop();
        }
        loadGoback();
        loadXMLDoc();
        loadControl();
        if (control == 0) {
            var now = new Date();
            var min = now.getSeconds();
            if (step == "h") {
                now.setSeconds(min - timeInput * 3600);
            } else if (step == "s") {
                now.setSeconds(min - timeInput);
            } else if (step == "m") {
                now.setSeconds(min - timeInput * 60);
            } else if (step == "d") {
                now.setSeconds(min - timeInput * 3600 * 24);
            }
            axisData = (now).toLocaleTimeString().replace(/^\D*/, '');
            //document.getElementById("date").innerHTML = "监控日期：" + (now).toLocaleDateString();

            var data0 = option.series[0].data;
            var data1 = option.series[1].data;
            data0.shift();
            data0.push(Math.round(0));
            data1.shift();
            if (value == 0) {
                data1.push(0);
            } else {
                data1.push((value).toFixed(1) - 0);
            }
            option.xAxis[0].data.shift();
            option.xAxis[0].data.push(axisData);
            option.xAxis[1].data.shift();
            app.count = value;
            option.title.text = configlist[1];
            option.series[1].itemStyle.normal.lineStyle.color = configlist[2];
        } else {
            loadControl();
        }
        $("#" + name).resizable();
        myChart.resize();
        myChart.setOption(option);
        console.log(option.title.text);
    }, 1050);
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    };
}