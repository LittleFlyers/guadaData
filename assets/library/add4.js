function add4(name, configlist,control) {
    if(control==5){
    var shell = 0;
    var dom = document.getElementById(name);
    var myCharttest1 = echarts.init(dom);
    var app = {};
    var option1 = {
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: []
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
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                        now = new Date(now - 2000);
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
                name: '数值',
                max: 3000,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: '数值',
                max: 3000,
                min: 0,
                boundaryGap: [0.2, 0.2]
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
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            }
        ]
    };

    app.count = 11;
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
            xmlhttp.open("GET", configlist[3], true);
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
        option1.title.text = configlist[1];
    }
    setInterval(function () {
        $("#" + name).resizable();
            myCharttest1.resize();
        if (shell == 0) {
            dom.ondblclick = function () {
                console.log(configlist);
                console.log(name.replace(/[^0-9]/ig, ""));
                localStorage.setItem("id", name.replace(/[^0-9]/ig, ""));
                document.getElementById("edit").style.display = "block";
                shell=1;
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

                var data0 = option1.series[0].data;
                data0.shift();
                data0.push((value).toFixed(1) - 0);

                option1.xAxis[0].data.shift();
                option1.xAxis[0].data.push(axisData);
                option1.xAxis[1].data.shift();
                option1.title.text = configlist[1];
                app.count = value
                option1.xAxis[1].data.push(app.count);
            } else {
                loadControl();
            }
            
            myCharttest1.setOption(option1);
        }
    }, 1000);
    ;
}}