function add1(name, configlist) {
    console.log(shell);
    var fresh = 1000;
    var title = "";
    var add = document.getElementById(name);
                add.ondblclick = function () {
                console.log(configlist);
                console.log(name.replace(/[^0-9]/ig, ""));
                localStorage.setItem("id", name.replace(/[^0-9]/ig, ""));
                document.getElementById("edit").style.display = "block";
                stop();
            }
    var myChart;
    /*add.ondblclick = function () {
        alert(123);
        document.getElementById("edit").style.display = "block";
        stop();
    }*/
    myChart = echarts.init(document.getElementById(name));
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }
    option = {
        title: {
            text: title
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: "#9A32CD"
                    }
                }
            }
        }]
    };
        if(configlist!=undefined){
        option.title.text = configlist[1];
    }


    
    var shell=0;
    setInterval(function () {
        if (shell == 0) {
            $("config").click(function () {
                alert("123");
            });
            add.ondblclick = function () {
                console.log(configlist);
                console.log(name.replace(/[^0-9]/ig, ""));
                localStorage.setItem("id", name.replace(/[^0-9]/ig, ""));
                document.getElementById("edit").style.display = "block";
                shell=1;
                stop();
            }
            for (var i = 0; i < 5; i++) {
                data.shift();
                data.push(randomData());
            }
            $("#" + name).resizable();
            myChart.resize();
            myChart.setOption({
                title: {
                    text: configlist[1]
                },
                series: [{
                    data: data
                }],
                grid: {
                    x: 50,
                    y: 50,
                    x2: 50,
                    y2: 50,
                    borderWidth: 1
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: data,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: configlist[2].toString()
                            }
                        }
                    }
                }]
            });
        }

    }, fresh); 

    myChart.setOption(option);
}