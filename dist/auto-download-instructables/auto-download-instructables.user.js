// ==UserScript==
// @name        Auto-Download Instructables
// @description Greasemonkey script to automatically navigate to the download page for an Instructable and trigger the download.
// @version     1.0.0
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/auto-download-instructables/auto-download-instructables.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/auto-download-instructables/auto-download-instructables.user.js
// @include     http://instructables.com/id/*
// @include     https://instructables.com/id/*
// @include     http://www.instructables.com/id/*
// @include     https://www.instructables.com/id/*
// @require     https://raw.githubusercontent.com/chimericdream/JS-URL-Helpers/master/qsvar.js
// @require     https://raw.githubusercontent.com/chimericdream/JS-URL-Helpers/master/absurl.js
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
(function($, getAbsoluteUrl, getQueryVariable) {
    'use strict';

    $(document).ready(function() {
        var loggedin = ($('#you-menu > a.name').size() > 0);
        if (!loggedin) {
            return;
        }

        function goToDownloadPage() {
            var href = $('#ible-header-inner .actionbar .fl .btn.download-btn').attr('href');
            if (typeof href !== 'undefined') {
                window.location = getAbsoluteUrl(href);
            }
        }

        function downloadIble() {
            var href = $('#main-content > .stepdescription > .txt > p > a.stepLabel.pdf_config_body_a_1').attr('href');
            if (typeof href !== 'undefined') {
                window.location = getAbsoluteUrl(href);
            }
        }

        var onDownloadPage = (getQueryVariable('download') === 'pdf');
        if (onDownloadPage) {
            downloadIble();
        } else {
            goToDownloadPage();
        }
    });
})(jQuery, window.fnGetAbsUrl, window.fnGetQueryVar);