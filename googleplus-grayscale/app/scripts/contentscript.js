// CHROME EXTENSION CONTENT SCRIPT

'use strict';

function greyScaleImage() {
    $('img').each( function(i, img) {
        $(img).css('webkitFilter', 'grayscale(100%)');
    });
}
