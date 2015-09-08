;(function($, window, document, undefined){
    'use strict';

    $(document).ready(function() {
        var imgsrc = $('[data-card-type="photo"] .media.media-thumbnail').attr('data-resolved-url-large');
        if (typeof imgsrc == 'string') {
            window.location = imgsrc;
            return;
        }
    });
})(jQuery, window, document);