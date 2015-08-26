(function($) {
    'use strict';

    $(document).ready(function(){
        $('.-cx-PRIVATE-Photo__clickShield').remove();
        var img = $('#pImage_0');
        img.parent().wrap('<a href="' + img.attr('src') + '"></a>');
    });
}(jQuery));