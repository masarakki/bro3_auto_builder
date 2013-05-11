###
// ==UserScript==
// @name         bro3_auto_builder
// @namespace    http://np-complete-doj.in/
// @description  automaticaly building feature for Browser Sangoku-shi
// @include      http://*.3gokushi.jp/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js
// @resource     style http://bro3-autobuilder.herokuapp.com/style.css
// @resource     main_template http://bro3-autobuilder.herokuapp.com/main.html?mode=partial
// @resource     village_template http://bro3-autobuilder.herokuapp.com/village.html?mode=partial
// @resource     village_row http://bro3-autobuilder.herokuapp.com/village_row.html?mode=partial
// @resource     village_updates http://bro3-autobuilder.herokuapp.com/village_updates.html?mode=partial
// @resource     setting_template http://bro3-autobuilder.herokuapp.com/setting.html?mode=partial
// @version      2013.05.12
// ==/UserScript==
###

jQuery.noConflict()
j$ = jQuery
