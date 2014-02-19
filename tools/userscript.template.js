// ==UserScript==
// @name          <%= pkg.name %>
// @namespace     http://github.com/Billiam
// @description   Admin entry timesheet helper for mainframe
// @include       https://mainframe.nerdery.com/timesheet.php*
// @version       <%= pkg.version %>
// @run-at        document-end
// @icon          http://billiam.github.io/admin-helper/icon-128.png
// @updateUrl     http://billiam.github.io/admin-helper/admin-helper.user.js
// ==/UserScript==
GM_addStyle('<%= css %>');
<%= script %>