(function($, w, d, undefined) {
    'use strict';

    var antares = new ComicRocketScience();

    $(d).ready(function(){
        var rules = [
            '#comic-rocket-science-controls {background-color: #51493d; color: #FFF; margin: 0 auto 20px; width: 552px; padding: 10px;}',
            '#comic-rocket-science-controls .comics-item-image span {height: auto; padding: 0 0 1ex 0;}',
            '#comic-rocket-science-controls .form-search input {border-radius: 3px; padding-left: 10px; width: calc(100% - 14px);}',
            '#comic-rocket-science-controls label {color: #FFF; display: inline-block;}',
            '#comic-rocket-science-controls label + label {margin-left: 5px;}',
            '#comic-rocket-science-controls label input {display: inline;}',
            '#comic-rocket-science-controls .btn-primary {padding: 5px 10px; background-image: none;}',
            '#comic-rocket-science-controls .btn-primary span {display: none;}',
            '#comic-rocket-science-controls .btn-primary.sorted-asc {font-weight: bold;}',
            '#comic-rocket-science-controls .btn-primary.sorted-desc {font-weight: bold;}',
            '#comic-rocket-science-controls .btn-primary.sorted-asc .asc {display: inline;}',
            '#comic-rocket-science-controls .btn-primary.sorted-desc .desc {display: inline;}',
            '#comic-rocket-science-controls .btn-primary + .btn-primary {margin-left: 5px;}',
            '#comic-status-text {margin: 0 auto 10px; width: 572px;}'
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
            if (rating === '') {
                $comic.attr('data-rating', 'UR');
            } else {
                $comic.attr('data-rating', rating);
            }
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

        var header = '<span class="comics-item-image" title="v{{VERSION}}"><span>Comic Rocket <strong>Science</strong></span></span>';
        var search = '<div class="form-search"><input id="crs-title-search" placeholder="Filter by title"/></div>';
        var filterButtons = [
            '<label><input type="checkbox" name="crs-rating-filter" value="PG" checked> PG</label>',
            '<label><input type="checkbox" name="crs-rating-filter" value="R" checked> R</label>',
            '<label><input type="checkbox" name="crs-rating-filter" value="NC-17" checked> NC-17</label>',
            '<label><input type="checkbox" name="crs-rating-filter" value="UR" checked> Unrated</label>'
        ];

        var arrows = '<span class="asc"> &uparrow;</span><span class="desc"> &downarrow;</span>';
        var sortingButtons = [
            '<a class="btn btn-primary sort-btn sorted-asc" id="crs-sort-title" href="#">Title' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-rating" href="#">Rating' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-unread" href="#"># Unread' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-read" href="#"># Read' + arrows + '</a>',
            '<a class="btn btn-primary sort-btn" id="crs-sort-percent-read" href="#">% Read' + arrows + '</a>',
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

        $container.before($status);

        $comics.sort(ComicSort.title);
        renderComics();
    });

    $('.span8').on('keyup', '#crs-title-search', function(e) {
        e.preventDefault();
        e.stopPropagation();

        filter.title = $(this).val().toLowerCase();
        filterComics();
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
        $comics.sort(ComicSort[sortMethod]);

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
        if ($el.attr('checked')) {
            filter.rating.push($el.val());
        } else {
            var idx = filter.rating.indexOf($el.val());
            filter.rating.splice(idx, 1);
        }
        filterComics();
    });

    function ComicRocketScience() {
        this.list = new ComicList();
    }

    function ComicList() {
        this.$wrapper    = null;
        this.$container  = $(d.createElement('div'));
        this.$comics     = [];
        this.$status     = $(d.createElement('div')).attr('id', 'comic-status-text');
        this.comicFilter = {
            'title':  '',
            'rating': ['PG', 'R', 'NC-17', 'UR']
        };
    }

    ComicList.prototype.render = function() {
        this.$container.empty();
        this.$container.append(this.$comics);
        this.updateStatusText();
    };

    ComicList.prototype.filter = function() {
        this.$comics.forEach(function($c) {
            var title  = $c.attr('data-title').toLowerCase();
            var rating = $c.attr('data-rating');

            var matchesTitle = (this.comicFilter.title === '' || title.includes(this.comicFilter.title));
            var matchesRating = (this.comicFilter.rating.length === 4 || this.comicFilter.rating.indexOf(rating) !== -1);

            if (matchesTitle && matchesRating) {
                $c.show();
                return;
            }
            $c.hide();
        }, this);
        this.updateStatusText();
    };

    ComicList.prototype.updateStatusText = function() {
        var visible = this.$comics.filter(function($c) {
            return $c.is(':visible');
        }).length;
        this.$status.text('Showing ' + visible + ' of ' + this.$comics.length + ' comics.');
    };

    var RATINGS     = {
        'PG': 1,
        'R': 2,
        'NC-17': 3,
        'UR': 4
    };

    var readStrips  = 0;
    var totalStrips = 0;

    var ComicSort = {
        'title': function(a, b) {
            var r1 = a.attr('data-title').toLowerCase();
            var r2 = b.attr('data-title').toLowerCase();
            r1 = r1.replace(/^((an?|the) )/, '');
            r2 = r2.replace(/^((an?|the) )/, '');
            return ((r1 === r2) ? 0 : ((r1 > r2) ? 1 : -1));
        },

        'rating': function(a, b) {
            var r1 = RATINGS[a.attr('data-rating')];
            var r2 = RATINGS[b.attr('data-rating')];
            return parseInt(r1) - parseInt(r2);
        },

        'read': function(a, b) {
            var r1 = a.attr('data-read');
            var r2 = b.attr('data-read');
            return parseInt(r1) - parseInt(r2);
        },

        'total': function(a, b) {
            var r1 = a.attr('data-total');
            var r2 = b.attr('data-total');
            return parseInt(r1) - parseInt(r2);
        },

        'updated': function(a, b) {
            var r1 = a.attr('data-date');
            var r2 = b.attr('data-date');
            return parseInt(r1) - parseInt(r2);
        },

        'unread': function(a, b) {
            var r1 = parseInt(a.attr('data-total')) - parseInt(a.attr('data-read'));
            var r2 = parseInt(b.attr('data-total')) - parseInt(b.attr('data-read'));
            return parseInt(r1) - parseInt(r2);
        },

        'percent-read': function(a, b) {
            var r1 = (parseInt(a.attr('data-read')) / parseInt(a.attr('data-total'))) * 100;
            var r2 = (parseInt(b.attr('data-read')) / parseInt(b.attr('data-total'))) * 100;
            return r1 - r2;
        }
    };
}(window.jQuery, window, document));
