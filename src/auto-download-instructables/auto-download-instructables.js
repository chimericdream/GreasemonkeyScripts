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