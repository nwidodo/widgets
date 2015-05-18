(function(window, undefined) {'use strict';
/*
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular.module('adf.widget.dash', ['adf.provider', 'highcharts-ng'])
  .value('dashApiUrl', '/NewBrowser/api/')
  .config(["dashboardProvider", function(dashboardProvider){
    // template object for dash widgets
    var widget = {
      reload: true,
      edit: {
        templateUrl: 'widgets/dash/src/edit.html'
      }
    };

    // register dash template by extending the template object
    dashboardProvider
      .widget('cpubusy', angular.extend({
        title: 'CPU Info',
        description: 'Chart of CPU trend data',
        templateUrl: 'widgets/dash/src/view2.html',
        controller: 'cpubusyCtrl'
      }, widget))
      .widget('ipubusy', angular.extend({
        title: 'IPU Info',
        description: 'Chart of IPU trend data',
        templateUrl: 'widgets/dash/src/view.html',
        controller: 'ipubusyCtrl'
      }, widget))
    .widget('diskinfo', angular.extend({
      title: 'Disk Info',
      description: 'Chart of Disk Info trend data',
        templateUrl: 'widgets/dash/src/view2.html',
      controller: 'diskCtrl'
    }, widget));

  }]);

angular.module("adf.widget.dash").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/dash/src/edit.html","<form role=form><div class=form-group><label for=systemserial>System Serial</label> <input type=text class=form-control id=systemserial ng-model=config.systemserial placeholder=\"Enter System Serial\"></div></form>");
$templateCache.put("{widgetsPath}/dash/src/view.html","<div><highchart id=chart1 config=highchartsNG></highchart></div>");
$templateCache.put("{widgetsPath}/dash/src/view2.html","<div><select ng-model=selSeries ng-change=updateChart()><option ng-repeat=\"info in chartInfo\" value={{info.value}}>{{info.displayName}}</option></select><highchart id=chart1 config=chartConfig></highchart></div>");}]);



angular.module('adf.widget.dash').service('dashService', ['$http', function($http){

    var urlCPUMain = dashApiUrl+"/processinfodata";

    this.getCPUBusy=function(systemserial){
      return $http.post(urlCPUMain, systemserial)
        .then(function(response){
          return response.data;
        },
        function(data) {
          console.log('CPU Busy data retrieval failed.');
        });
    }

    this.getIPUBusy=function(systemserial){
      return $http.post(urlCPUMain, systemserial)
        .then(function(response){
          return response.data;
        },
        function(data) {
          console.log('CPU Busy data retrieval failed.');
        });
    }

    this.getDiskInfo=function(systemserial){
      return $http.post(urlCPUMain, systemserial)
        .then(function(response){
          return response.data;
        },
        function(data) {
          console.log('CPU Busy data retrieval failed.');
        });
    }
  }]);



angular.module('adf.widget.dash')
  .controller('ipubusyCtrl', ["$scope", function($scope) {

    $scope.highchartsNG = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'IPU Busy'
      },
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: 'Temperature',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        }

      }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Sea-Level Pressure',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          format: '{value} mb',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Sea-Level Pressure',
        type: 'area',
        yAxis: 1,
        data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
        marker: {
          enabled: false
        },
        tooltip: {
          valueSuffix: ' mb'
        }

      },
        {
        name: 'Rainfall',
        type: 'line',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: 'Temperature',
        type: 'line',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    }

  }]);



angular.module('adf.widget.dash')
  .controller('diskCtrl', ["$scope", function($scope) {

    $scope.highchartsNG = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Disk IO'
      },
      yAxis: [{ // Primary yAxis
        labels: {
          format: 'IO',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: 'Temperature',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        }

      }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Sea-Level Pressure',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          format: '{value} mb',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Sea-Level Pressure',
        type: 'area',
        yAxis: 1,
        data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
        marker: {
          enabled: false
        },
        tooltip: {
          valueSuffix: ' mb'
        }

      },
        {
        name: 'Rainfall',
        type: 'line',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: 'Temperature',
        type: 'line',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    }

  }]);



angular.module('adf.widget.dash')
  .controller('cpubusyCtrl', ["$scope", function($scope) {

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
  }]);
})(window);