(function($, win, debounce, showdown) {
    'use strict';

    var parseMd = debounce(function() {
        var $parent = $('[class*="PrePlaySummary-summary-"] > [class*="CollapsibleText-contentTransition-"] > [class*="Measure-container-"]');

        if ($parent.length === 0) {
            $parent = $('[class*="PrePlaySummary-summary-"] > .false > [class*="Measure-container-"]');
        }

        if ($parent.length === 0) {
            return;
        }

        var text = $parent.html();

        text = text.replace(/<\/p><p>/ig, "\n")
                   .replace(/<\/?p>/ig, '')
                   .replace(/<div.+><\/div>/ig, '');

        if ($parent.hasClass('pmd-markdownified')) {
            return;
        }

        var converter = new showdown.Converter();
        var html = converter.makeHtml(text);

        $('p', $parent).remove();
        $parent.contents().filter(function() {
            return (this.nodeType == 3);
        }).remove();

        $parent.prepend(html);
        $parent.addClass('pmd-markdownified');
    }, 500);

    win.addEventListener('DOMNodeInserted', parseMd, false);
}(jQuery, window, window.fnDebounce, this.showdown));
