'use strict';

angular.module('adf.widget.dash')
  .controller('diskCtrl', function($scope) {

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

  });
