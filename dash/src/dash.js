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

'use strict';

angular.module('adf.widget.dash', ['adf.provider', 'highcharts-ng'])
  .value('dashApiUrl', '/NewBrowser/api/')
  .config(function(dashboardProvider){
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

  });
