// ==UserScript==
// @name        YouTube Playlist Duration
// @description Greasemonkey script to add the total duration for a playlist to the details section.
// @version     1.0.1
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/youtube-playlist-duration/youtube-playlist-duration.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/youtube-playlist-duration/youtube-playlist-duration.user.js
// @include     https://www.youtube.com/playlist*
// @require     https://raw.githubusercontent.com/chimericdream/JS-Debounce/master/debounce.js
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
!function(t,e){"use strict";function n(){return t("#pl-load-more-destination tr").length}function o(){return t("#pl-load-more-destination tr .timestamp span")}function r(){var e=n();if(e!==a){a=e,i={h:0,m:0,s:0};var r=o();r.each(function(){var e=t(this).text().split(":"),n=parseInt(e.pop(),10)||0,o=parseInt(e.pop(),10)||0,r=parseInt(e.pop(),10)||0;i.h+=r,i.m+=o,i.s+=n}),i.m+=Math.floor(i.s/60),i.s=i.s%60,i.h+=Math.floor(i.m/60),i.m=i.m%60,t("#pl-total-time").remove();var s=i.h>0?i.h+":":"",l=i.m>0?i.m+":":"0:",d=i.s>0?i.s<10?"0"+i.s:i.s:"00";t("#pl-header .pl-header-content .pl-header-details li:nth-child(2)").after('<li id="pl-total-time">'+s+l+d+"</li>")}}var a=-1,i={h:0,m:0,s:0};t(document).ready(function(){var t=e(r,250,!0),n=document.getElementById("pl-load-more-destination");r(),n.addEventListener("DOMNodeInserted",t)})}(jQuery,window.fnDebounce);