// ==UserScript==
// @name        Clickable Instagram Pictures
// @version     1.0.1
// @description Greasemonkey script to make Instagram images clickable to view the original.
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/clickable-instagram-pictures/clickable-instagram-pictures.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/clickable-instagram-pictures/clickable-instagram-pictures.user.js
// @include     https://instagram.com/p/*
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
!function(e){"use strict";e(document).ready(function(){e(".-cx-PRIVATE-Photo__clickShield").remove();var r=e("#pImage_0");r.parent().wrap('<a href="'+r.attr("src")+'"></a>')})}(jQuery);