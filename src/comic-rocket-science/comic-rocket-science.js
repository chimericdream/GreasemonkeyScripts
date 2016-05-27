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