'use strict';

angular.module('adf.widget.dash')
  .controller('cpubusyCtrl', function($scope) {

    $scope.memData=[];
    $scope.cpuData=[];

    var initDate=1422662400000;
    var cpu0=[];
    var cpu1=[];
    for (var i = 0; i < 10; i++) {
      $scope.memData.push([initDate, Math.floor(Math.random() * 20) + 1]);

      cpu0.push([initDate, Math.floor(Math.random() * 20) + 1]);
      cpu1.push([initDate, Math.floor(Math.random() * 20) + 1]);
      initDate += 86400000;
    }

    $scope.cpuData.push(cpu0);
    $scope.cpuData.push(cpu1);

    $scope.selSeries="busy";
    $scope.chartInfo = [
      {value: 'busy', displayName: '% Busy'},
      {value: 'qlen', displayName: 'Queue length'},
      {value: 'mem', displayName: 'Memory used (MB)'},
      {value: 'disp', displayName: 'Dispatch rate / second'}
    ]

    function pad(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }
    $scope.chartConfig = {
      options: {
        chart: {
          zoomType: 'x'

        },
        plotOptions:{
        scatter:{
          lineWidth:1
        }
        },
        tooltip: {
          hideDelay: 1000,
          useHTML: true,
          headerFormat: "<div id='my-tooltip'>",
          pointFormat: "{point.x} x {point.y} y",
          footerFormat: "<a href='http://google.com' target='_blank'>Example HyperLink</a></div>",
          valueDecimals: 2
        },
        xAxis:{
          gapGridLineWidth: 30,
          type: 'datetime',
          dateTimeLabelFormats: {
            second: '%d %b %Y<br/>%H:%M:%S',
            minute: '%d %b %Y<br/>%H:%M',
            hour: '%d %b %Y<br/>%H:%M',
            day: '%d %b %Y<br/>%H:%M',
            week: '%d %b %Y',
            month: '%b %Y',
            year: '%Y'
          }
        },
        yAxis: [

          { // Primary yAxis

            min: 0,
            allowDecimals: false,
            title: {
              text: 'Busy %'
            },
            labels: {
              format: '{value}',
              style: {
                color: '#80a3ca'
              }
            },
            opposite:false

          },
          { // Secondary yAxis
            min: 0,
            allowDecimals: false,
            title: {
              text: 'Disk IO/Sec'
            },
            labels: {
              format: '{value}'
            },
            opposite: true

          }
        ],
        rangeSelector: {
          buttons: [{
            type: 'hour',
            count: 3,
            text: '3h'
          }, {
            type: 'day',
            count: 1,
            text: '1d'
          }, {
            type: 'week',
            count: 1,
            text: '1w'
          }, {
            type: 'all',
            text: 'All'
          }],
          selected:2,
          inputEnabled: false
        },
        navigator: {
          enabled: true
        } ,
        legend: {
          enabled: true
        }
      },
      series: [],
      title: {
        text: 'CPU'
      },
      useHighStocks: true
    };

    $scope.updateChart=function() {

      $scope.chartConfig.series.push({
          id: 1,
          name:'CPU 00',
          type:'scatter',
          data: [
            [1147651200000, 23.15],
            [1147737600000, 23.01],
            [1147824000000, 22.73],
            [1147910400000, 22.83],
            [1147996800000, 22.56],
            [1148256000000, 22.88],
            [1148342400000, 22.79],
            [1148428800000, 23.50],
            [1148515200000, 23.74],
            [1148601600000, 23.72],
            [1148947200000, 23.15],
            [1149033600000, 22.65]
          ]
        },   {
          id: 2,
          name: 'CPU 01',
          type:'scatter',
          data: [
            [1147651200000, 25.15],
            [1147737600000, 25.01],
            [1147824000000, 25.73],
            [1147910400000, 25.83],
            [1147996800000, 25.56],
            [1148256000000, 25.88],
            [1148342400000, 25.79],
            [1148428800000, 25.50],
            [1148515200000, 26.74],
            [1148601600000, 26.72],
            [1148947200000, 26.15],
            [1149033600000, 26.65]
          ]

        }

      );

    }
    $scope.updateChart();
  });
