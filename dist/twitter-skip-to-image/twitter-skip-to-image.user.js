// ==UserScript==
// @name        Twitter Skip to Image
// @version     1.0.1
// @description 
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/twitter-skip-to-image/twitter-skip-to-image.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/twitter-skip-to-image/twitter-skip-to-image.user.js
// @include     /^https?://([^.]+\.)?twitter\.com/.*/status/\d+/photo.*$/
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
!function(t,a,e,r){"use strict";t(e).ready(function(){var e=t('[data-card-type="photo"] .media.media-thumbnail').attr("data-resolved-url-large");if("string"==typeof e)return void(a.location=e)})}(jQuery,window,document);