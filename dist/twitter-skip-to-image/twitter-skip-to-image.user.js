// ==UserScript==
// @name        Twitter Skip to Image
// @description 
// @version     1.0.0
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/twitter-skip-to-image/twitter-skip-to-image.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/twitter-skip-to-image/twitter-skip-to-image.user.js
// @match       /^https?://([^.]+\.)?twitter\.com/.*/status/\d+/photo.*$/
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
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