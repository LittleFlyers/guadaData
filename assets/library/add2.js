function add2(name) {
    var fresh = 1000;
    var title = "";
    var add = document.getElementById(name);
    var myChart;
    add.ondblclick = function () {
        console.log(name.replace(/[^0-9]/ig, ""));
        localStorage.setItem("id", name.replace(/[^0-9]/ig, ""));
        document.getElementById("edit").style.display = "block";
        stop();
    }
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
    var shell = 0;
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }
    option = {
        backgroundColor: '#2c343c',

        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 274, name: '联盟广告' },
                    { value: 235, name: '视频广告' },
                    { value: 400, name: '搜索引擎' }
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
   if(configlist!=undefined){
        option.title.text = configlist[1];
    }

    setInterval(function () {
        $("#" + name).resizable();
        myChart.resize();

    }, fresh);
    myChart.setOption(option);
}