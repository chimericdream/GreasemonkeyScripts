// ==UserScript==
// @name        Clickable Instagram Pictures
// @description Greasemonkey script to make Instagram images clickable to view the original.
// @version     1.0.0
// @match       https://instagram.com/p/*
// @grant       none
// @require     http://code.jquery.com/jquery-latest.js
// ==/UserScript==
(function($) {
    'use strict';

    $(document).ready(function(){
        $('.-cx-PRIVATE-Photo__clickShield').remove();
        var img = $('#pImage_0');
        img.parent().wrap('<a href="' + img.attr('src') + '"></a>');
    });
}(jQuery));