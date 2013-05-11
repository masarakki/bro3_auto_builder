class SettingView
    constructor: ->
        @setting_template = GM_getResourceText('setting_template')
        src = jQuery(@setting_template)
        @politics_buildings_template = jQuery("#bab-setting-politics #building-template", src).text()
#        @skill_template = jQuery("", src)

    show: (village_data) ->

