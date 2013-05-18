class SettingView
    constructor: (@left, @top) ->
        @template = jQuery("<div>").append GM_getResourceText('setting_template')

        politics_buildings_template = jQuery("#bab-setting-politics #building-template", @template)
        politics = jQuery.tmpl(politics_buildings_template.html(), Facility.all)
        politics_buildings_template.replaceWith politics

#        @skill_template = jQuery("", src)

    show: (village_data) ->
        before = {x: 0, y: 0}
        moving = false
        view = jQuery.tmpl(@template, village: village_data).css {
            top: @top
            left: @left
        }
        jQuery("#bab-setting").remove()
        self = this
        view.mousedown (e) ->
            return true unless jQuery.inArray(e.target.tagName, ['SELECT', 'INPUT', 'BUTTON']) == -1
            moving = true
            before = {
                x: e.pageX - parseInt(this.style.left, 10)
                y: e.pageY - parseInt(this.style.top, 10)
            }
            e.preventDefault()
            false

        jQuery(document).mousemove (e) ->
            return true unless moving
            left = e.pageX - before.x
            top = e.pageY - before.y
            view.css({left: left, top: top})
            GM_setValue(location.hostname + PGNAME + "_setting_left", left);
            GM_setValue(location.hostname + PGNAME + "_setting_top", top);
            false

        jQuery(document).mouseup (e) ->
            moving = false
            false

        view.appendTo jQuery("body")
