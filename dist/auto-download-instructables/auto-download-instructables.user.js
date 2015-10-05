// ==UserScript==
// @name        Auto-Download Instructables
// @description Greasemonkey script to automatically navigate to the download page for an Instructable and trigger the download.
// @version     1.0.1
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/auto-download-instructables/auto-download-instructables.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/auto-download-instructables/auto-download-instructables.user.js
// @include     http://instructables.com/id/*
// @include     https://instructables.com/id/*
// @include     http://www.instructables.com/id/*
// @include     https://www.instructables.com/id/*
// @require     https://raw.githubusercontent.com/chimericdream/JS-URL-Helpers/master/qsvar.js
// @require     https://raw.githubusercontent.com/chimericdream/JS-URL-Helpers/master/absurl.js
// @grant       none
// ==/UserScript==
(function($, getAbsoluteUrl, getQueryVariable) {
    'use strict';

    $(document).ready(function() {
        var delay = function() {
            var loggedin = ($('#you-menu > a.name').length > 0);
            if (!loggedin) {
                return;
            }

            function goToDownloadPage() {
                var href = $('#ible-header-actions-bar #download-pdf-btn-top').attr('href');
                if (typeof href !== 'undefined') {
                    window.location = getAbsoluteUrl(href);
                }
            }

            function downloadIble() {
                var href = $('#pdf-content > .pdf-download-available > p > a').attr('href');
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
        };
        window.setTimeout(delay, 2000);
    });
})(jQuery, window.fnGetAbsUrl, window.fnGetQueryVar);