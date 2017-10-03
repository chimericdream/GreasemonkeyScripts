// ==UserScript==
// @name        Auto-Download Instructables
// @version     1.1.1
// @description Greasemonkey script to automatically navigate to the download page for an Instructable and trigger the download.
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/auto-download-instructables/auto-download-instructables.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/auto-download-instructables/auto-download-instructables.user.js
// @include     http://instructables.com/id/*
// @include     https://instructables.com/id/*
// @include     http://www.instructables.com/id/*
// @include     https://www.instructables.com/id/*
// @require     https://raw.githubusercontent.com/chimericdream/JS-URL-Helpers/master/qsvar.js
// @require     https://raw.githubusercontent.com/chimericdream/JS-URL-Helpers/master/absurl.js
// @grant       none
// ==/UserScript==
!function(n,o,t){"use strict";n(document).ready(function(){var e=function(){function e(){var t=n("#ible-header-actions-bar #download-pdf-btn-top").attr("href");"undefined"!=typeof t&&(window.location=o(t))}function a(){var t=n("#pdf-content > .pdf-download-available > p > a"),e=t.attr("href");"undefined"!=typeof e&&(t.css("text-decoration","line-through"),window.location=o(e))}var d=n("#you-menu > a.name").length>0;if(d){var i="pdf"===t("download");i?a():e()}};window.setTimeout(e,1e4)})}(jQuery,window.fnGetAbsUrl,window.fnGetQueryVar);