// ==UserScript==
// @name        Clickable Instagram Pictures
// @description Greasemonkey script to make Instagram images clickable to view the original.
// @version     1.0.0
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/clickable-instagram-pictures/clickable-instagram-pictures.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/clickable-instagram-pictures/clickable-instagram-pictures.user.js
// @match       https://instagram.com/p/*
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
(function($) {
    'use strict';

    $(document).ready(function(){
        $('.-cx-PRIVATE-Photo__clickShield').remove();
        var img = $('#pImage_0');
        img.parent().wrap('<a href="' + img.attr('src') + '"></a>');
    });
}(jQuery));