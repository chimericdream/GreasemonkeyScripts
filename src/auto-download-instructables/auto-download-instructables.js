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
                var link = $('#pdf-content > .pdf-download-available > p > a');
                var href = link.attr('href');
                if (typeof href !== 'undefined') {
                    link.css('text-decoration', 'line-through');
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