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
        window.setTimeout(delay, 10000);
    });
})(jQuery, window.fnGetAbsUrl, window.fnGetQueryVar);