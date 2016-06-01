;(function($, undefined){
    'use strict';

    $('a').removeAttr('onclick').removeAttr('data-ga_click_event');

    var download = $(".dev-view-meta-content .dev-meta-actions .dev-page-download");

    if (download.length <= 0) {
        var fullimg;

        fullimg = $("#gmi-ResViewSizer_fullimg");
        if (fullimg.length !== 0) {
            createDownloadButton(fullimg.attr('src'));
            return;
        }

        fullimg = $(".dev-page-view .dev-view-deviation .dev-content-full");
        if (fullimg.length !== 0) {
            createDownloadButton(fullimg.attr('src'));
            return;
        }
    }

    function createDownloadButton(url) {
        var dlbutton = $('<a class="dev-page-button dev-page-button-with-text dev-page-download" href="' + url + '"> <i></i> <span class="label">Download Image</span></a>');
        $(".dev-meta-actions").append(dlbutton);
    }
})(window.jQuery);