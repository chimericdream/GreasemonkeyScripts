// ==UserScript==
// @name        MyFitnessPal Tweaks
// @description Greasemonkey script to add a few minor features to MyFitnessPal
// @version     1.0.2
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/myfitnesspal-tweaks/myfitnesspal-tweaks.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/myfitnesspal-tweaks/myfitnesspal-tweaks.user.js
// @include     http://www.myfitnesspal.com/*
// @include     https://www.myfitnesspal.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant       none
// ==/UserScript==
;(function($, window, document, undefined) {
    'use strict';

    $(document).ready(function() {
        updateDashboard();
        updateFoodDiary();
    });

    function updateDashboard() {
        var goalSpan        = $('#summary-info .calorie-math .equation .value.goal .num');
        if (goalSpan.length === 0) {
            return;
        }
        var goalCount       = parseInt(goalSpan.first().html());

        var foodSpan        = $('#summary-info .calorie-math .equation .value + .value .num');
        var foodCount       = parseInt(foodSpan.first().html());

        var color;
        var actualLeftCount = goalCount - foodCount;
        if (actualLeftCount < 0) {
            color = '#f00';
        } else {
            color = '#197910';
        }
        var caloriesLeftDiv = $('#calories-remaining-number');
        var caloriesLeftMsg = caloriesLeftDiv.first().html();

        if (actualLeftCount === parseInt(caloriesLeftMsg)) {
            return;
        }
        caloriesLeftMsg    += ' <span style="color:' + color + ' !important; font-size:50% !important;">(' + actualLeftCount + ')</span>';
        caloriesLeftDiv.first().html(caloriesLeftMsg);
    }

    function updateFoodDiary() {
        var calorieMsgTd    = $('#main .food_container table tfoot tr:last-child td.extra');
        if (calorieMsgTd.length === 0) {
            console.log('no message');
            return;
        }
        var calRegex        = /((?:\d{1,3},)*\d{3}|\d{1,3})/;

        var calorieMsg      = calorieMsgTd.first().html() + '';
        var matches         = calorieMsg.match(calRegex);
        var calCount        = parseInt(matches[0].replace(',', ''));

        var dailyGoalTd     = $('#main .food_container table tbody tr.total.alt td + td');
        var dailyGoalMsg    = dailyGoalTd.first().html() + '';
        matches             = dailyGoalMsg.match(calRegex);
        var dailyGoalCount  = parseInt(matches[0].replace(',', ''));
        var actualGoalCount = new Intl.NumberFormat('en-US').format(dailyGoalCount - calCount);
        dailyGoalMsg       += '<br><span style="font-size:80% !important;">(' + actualGoalCount + ')</span>';
        dailyGoalTd.first().html(dailyGoalMsg);

        var dailyLeftTd     = $('#main .food_container table tbody tr.total.remaining td + td');
        var dailyLeftMsg    = dailyLeftTd.first().html() + '';
        matches             = dailyLeftMsg.match(calRegex);
        var dailyLeftCount  = parseInt(matches[0].replace(',', ''));
        var actualLeftCount = new Intl.NumberFormat('en-US').format(dailyLeftCount - calCount);
        var color           = '';
        if ((dailyLeftCount - calCount) < 0) {
            color = '#f00';
        } else {
            color = '#197910';
        }
        dailyLeftMsg   += '<br><span style="color:' + color + ' !important; font-size:80% !important;">(' + actualLeftCount + ')</span>';
        dailyLeftTd.first().html(dailyLeftMsg);
    }
})(jQuery, window, document);