(function($, w, d, undefined) {
    'use strict';

    var RATINGS     = {
        'PG': 1,
        'R': 2,
        'NC-17': 3
    };

    var $comics     = [];
    var $wrapper    = null;
    var $container  = $(d.createElement('div'));

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
            '#comic-rocket-science-controls .form-search input {width: calc(100% - 34px - 1em);}',
            '#comic-rocket-science-controls label {color: #FFF; display: inline-block;}',
            '#comic-rocket-science-controls label + label {margin-left: 5px;}',
            '#comic-rocket-science-controls label input {display: inline;}',
            '#comic-rocket-science-controls .btn-primary {padding: 5px 10px; background-image: none;}',
            '#comic-rocket-science-controls .btn-primary span {display: none;}',
            '#comic-rocket-science-controls .btn-primary.sorted-asc .asc {display: inline;}',
            '#comic-rocket-science-controls .btn-primary.sorted-desc .desc {display: inline;}',
            '#comic-rocket-science-controls .btn-primary + .btn-primary {margin-left: 5px;}'
        ];
        var styles = '<style>' + rules.join('') + '</style>';
        $('head').append(styles);

        $('.comics-item').each(function(){
            var $comic   = $(this);
            var title    = $comic.find('.comics-item-image span').text();
            var rating   = $comic.find('.comics-item-rating abbr').text();
            var dt       = $comic.find('.comics-item-date div').text().replace('Updated: ', '').replace('-', '');
            var progress = $comic.find('.progress-label').text().split('/');
            
            readStrips  += parseInt(progress[0]);
            totalStrips += parseInt(progress[1]);

            $comic.attr('data-title', title);
            $comic.attr('data-rating', rating);
            $comic.attr('data-date', dt);
            $comic.attr('data-read', progress[0]);
            $comic.attr('data-total', progress[1]);

            if ($wrapper === null) {
                $wrapper = $comic.parent();
            }
            $comics.push($comic);
        });
        $wrapper.attr('id', 'comics-wrapper');

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

        var arrows = '<span class="asc"> &uparrow;</span><span class="desc"> &downarrow;</span>';
        var sortingButtons = [
            '<a class="btn btn-primary sort-btn sorted-asc" id="crs-sort-title" href="#">Title' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-rating" href="#">Rating' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-read" href="#">Read' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-total" href="#">Total' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-updated" href="#">Updated' + arrows + '</a>'
        ];

        var content = [
            header,
            search,
            '<strong>Filter by rating:</strong>',
            filterButtons.join(''),
            '<strong>Sort by:</strong>',
            sortingButtons.join('')
        ];

        $wrapper.empty().prepend($controls).append($container);

        $controls.append(content.join('<br>'));
        $controls.after('<hr>');

        $comics.sort(compareTitles);
        renderComics();
    });

    $('.span8').on('click', '#comic-rocket-science-controls .sort-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var btn = $(this);
        var newSort = 1;

        if (btn.hasClass('sorted-asc')) {
            newSort = -1;
        } else if (btn.hasClass('sorted-desc')) {
            newSort = 1;
        }

        $('#comic-rocket-science-controls .sort-btn').removeClass('sorted-asc').removeClass('sorted-desc');

        var sortMethod = btn.attr('id').replace('crs-sort-', '');
        switch (sortMethod) {
            case 'title':
                $comics.sort(compareTitles);
                break;
            case 'rating':
                $comics.sort(compareRatings);
                break;
            case 'read':
                $comics.sort(compareReadComics);
                break;
            case 'total':
                $comics.sort(compareTotalComics);
                break;
            case 'updated':
                $comics.sort(compareLastUpdated);
                break;
        }
        if (newSort < 0) {
            $comics.reverse();
            btn.addClass('sorted-desc');
        } else {
            btn.addClass('sorted-asc');
        }
        renderComics();
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

    function renderComics() {
        $container.empty();
        for (var i = 0; i < $comics.length; i++) {
            $container.append($comics[i]);
        }
    }

    function compareTitles(a, b) {
        var r1 = a.attr('data-title').toLowerCase();
        var r2 = b.attr('data-title').toLowerCase();
        r1 = r1.replace(/^((an?|the) )/, '');
        r2 = r2.replace(/^((an?|the) )/, '');
        return ((r1 === r2) ? 0 : ((r1 > r2) ? 1 : -1));
    }

    function compareRatings(a, b) {
        var r1 = RATINGS[a.attr('data-rating')];
        var r2 = RATINGS[b.attr('data-rating')];
        return parseInt(r1) - parseInt(r2);
    }

    function compareReadComics(a, b) {
        var r1 = a.attr('data-read');
        var r2 = b.attr('data-read');
        return parseInt(r1) - parseInt(r2);
    }

    function compareTotalComics(a, b) {
        var r1 = a.attr('data-total');
        var r2 = b.attr('data-total');
        return parseInt(r1) - parseInt(r2);
    }

    function compareLastUpdated(a, b) {
        var r1 = a.attr('data-date');
        var r2 = b.attr('data-date');
        return parseInt(r1) - parseInt(r2);
    }

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
