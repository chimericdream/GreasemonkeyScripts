(function($, w, d, undefined) {
    'use strict';

    var $comics     = [];
    var $container  = null;

    var readStrips  = 0;
    var totalStrips = 0;

    var filter      = {
        'title':  '',
        'rating': ''
    };

    $(d).ready(function(){
        var rules = [
            '#comic-rocket-science-controls {background-color: #51493d; color: #FFF; margin: 0 auto 20px; width: 552px; padding: 10px;}',
            '#comic-rocket-science-controls .comics-item-image span {height: auto; padding: 0 0 1ex 0;}',
            '#comic-rocket-science-controls label {color: #FFF; display: inline-block;}',
            '#comic-rocket-science-controls label + label {margin-left: 5px;}',
            '#comic-rocket-science-controls label input {display: inline;}'
        ];
        var styles = '<style>' + rules.join('') + '</style>';

        $('head').append(styles);

        $('.comics-item').each(function(){
            var $comic   = $(this);
            var title    = $comic.find('.comics-item-image span').text();
            var rating   = $comic.find('.comics-item-rating abbr').text();
            var dt       = $comic.find('.comics-item-date div').text().replace('Updated: ', '');
            var progress = $comic.find('.progress-label').text().split('/');
            
            readStrips  += parseInt(progress[0]);
            totalStrips += parseInt(progress[1]);

            $comic.attr('data-title', title);
            $comic.attr('data-rating', rating);
            $comic.attr('data-date', dt);
            $comic.attr('data-read', progress[0]);
            $comic.attr('data-total', progress[1]);

            if ($container === null) {
                $container = $comic.parent();
            }
            $comics.push($comic);
        });
        $container.attr('id', 'comics-container');

        var aside = $('#comic-rocket-sidebar').parent().children()[0];
        var div = $(aside).children()[0];
        var pct = (readStrips / totalStrips) * 100;
        $(div).append('<p>Overall progress: ' + readStrips + '/' + totalStrips + ' (' + pct.toFixed(2) + '%)</p>');

        var $controls = $(d.createElement('div'));
        $controls.attr('id', 'comic-rocket-science-controls');

        var header = '<span class="comics-item-image"><span>Comic Rocket <strong>Science</strong></span></span>';
        var search = '<div class="form-search"><input name="crs-title-search" placeholder="Filter by title"/><button id="crs-search"><img src="/media/img/icon-search.png" alt="" height="14" width="15"/></button></div>';
        var filterButtons = [
            '<label><input type="checkbox" name="crs-rating-filter-all" value="all" checked> All</label>',
            '<label><input type="radio" name="crs-rating-filter" value="PG"> PG</label>',
            '<label><input type="radio" name="crs-rating-filter" value="R"> R</label>',
            '<label><input type="radio" name="crs-rating-filter" value="NC-17"> NC-17</label>'
        ];

        var content = [
            header,
            search,
            '<strong>Filter by rating:</strong>',
            filterButtons.join('')
        ];

        $controls.append(content.join('<br>'));
        $container.prepend($controls);
    });

    $('.span8').on('click', '#comic-rocket-science-controls input', function(e) {
        e.stopPropagation();

        var $el = $(this);
        switch ($el.attr('type')) {
            case 'checkbox':
                $('input[name="crs-rating-filter"]').attr('checked', false);
                filter.rating = '';
                break;
            case 'radio':
                $('input[name="crs-rating-filter-all"]').attr('checked', false);
                filter.rating = $el.val();
                break;
            default:
                // no-op
                break;
        }
        filterComics();
    });

    function filterComics() {
        for (var i = 0; i < $comics.length; i++) {
            var $c = $comics[i];
            if (filter.rating !== '' && $c.attr('data-rating') !== filter.rating && $c.is(':visible')) {
                $c.slideUp();
                continue;
            }
            if (filter.rating !== '' && $c.attr('data-rating') === filter.rating && !$c.is(':visible')) {
                $c.slideDown();
                continue;
            }
            if (filter.rating === '' && !$c.is(':visible')) {
                $c.slideDown();
            }
        }
    }
}(window.jQuery, window, document));
