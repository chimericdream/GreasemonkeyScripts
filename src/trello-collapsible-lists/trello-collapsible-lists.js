(function($, debounce) {
    'use strict';

    var $board = $('board');

    var listener = function() {
        $board.children('.js-list.list-wrapper').addClass('gmjs-collapsible-list');
    };

    document.body.addEventListener('DOMNodeInserted', listener);
}(jQuery, window.fnDebounce));
