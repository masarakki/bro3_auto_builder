class SettingView
    constructor: ->
        @template = jQuery GM_getResourceText('setting_template')

        politics_buildings_template = jQuery("#bab-setting-politics #building-template", @template)
        politics = jQuery.tmpl(politics_buildings_template.html(), Facility.all)
        politics_buildings_template.replaceWith politics

#        @skill_template = jQuery("", src)

    show: (village_data) ->

