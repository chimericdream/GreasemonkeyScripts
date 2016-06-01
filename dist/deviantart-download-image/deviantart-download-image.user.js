// ==UserScript==
// @name        DeviantArt Download Current Image
// @description Adds a download button to all DeviantArt images
// @version     1.0.1
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/deviantart-download-image/deviantart-download-image.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/deviantart-download-image/deviantart-download-image.user.js
// @include     /^https?://([^.]+\.)?deviantart\.com/.*$/
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       none
// ==/UserScript==
!function(e,t){"use strict";function a(t){var a=e('<a class="dev-page-button dev-page-button-with-text dev-page-download" href="'+t+'"> <i></i> <span class="label">Download Image</span></a>');e(".dev-meta-actions").append(a)}e("a").removeAttr("onclick").removeAttr("data-ga_click_event");var n=e(".dev-view-meta-content .dev-meta-actions .dev-page-download");if(n.length<=0){var i;if(i=e("#gmi-ResViewSizer_fullimg"),0!==i.length)return void a(i.attr("src"));if(i=e(".dev-page-view .dev-view-deviation .dev-content-full"),0!==i.length)return void a(i.attr("src"))}}(window.jQuery);