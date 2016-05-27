// ==UserScript==
// @name        Comic Rocket Science
// @description Greasemonkey script to add more comic management features to Comic Rocket.
// @version     0.0.1a
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/comic-rocket-science/comic-rocket-science.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/comic-rocket-science/comic-rocket-science.user.js
// @include     http://comic-rocket.com/
// @include     http://www.comic-rocket.com/
// @include     https://comic-rocket.com/
// @include     https://www.comic-rocket.com/
// @grant       none
// ==/UserScript==
(function($) {
    'use strict';

    $(document).ready(function(){
        $('.comics-item').each(function(){
            var comic = $(this);
            var title = comic.find('.comics-item-image span').text();
                var rating = comic.find('.comics-item-rating abbr').text();
            
            comic.attr('data-title', title);
            comic.attr('data-rating', rating);
        });
    });
}(jQuery));