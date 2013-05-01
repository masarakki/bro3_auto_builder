class MainView
    constructor: (@left = 0, @top = 0) ->
        @config = new Config
        @visible = @config.stay_mode()
        this.generate()

    toggle_reload_button: (button) ->
        if @config.toggle_auto_reload()
            button.text("巡回中")
        else
            button.text("停止中")

    generate: ->
        moving = false
        main_template    = GM_getResourceText('main_template')
        village_template = GM_getResourceText('village_row')
        updates_template = GM_getResourceText('village_updates')

        template_values = {
            reload_status: if @config.auto_reload() then '巡回中' else '停止中'
        }

        main = jQuery.tmpl(main_template, template_values).css {
            top: @top
            left: @left
        }
        if @visible
            main.css "display", "block"
        else
            main.css "display", "none"

        before = {x: 0, y: 0}
        self = this
        main.mousedown (e) ->
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
            main.css({left: left, top: top})
            GM_setValue(location.hostname + PGNAME + "_popup_left", left);
            GM_setValue(location.hostname + PGNAME + "_popup_top", top);
            false

        jQuery(document).mouseup (e) ->
            moving = false
            false

        jQuery(".button-box #bab-main-reload-status", main).click (e) ->
            self.toggle_reload_button(jQuery(this))
        jQuery(".button-box #bab-main-confirm", main).click (e) ->
            confirmTimer()
        jQuery(".button-box #bab-main-close", main).click (e) ->
            main.hide()
        jQuery(".button-box #bab-main-stay-mode", main).attr("checked", "checked") if @config.stay_mode()
        jQuery(".button-box #bab-main-stay-mode", main).change (e) ->
            self.config.update_stay_mode this.checked

        jQuery(".button-box #bab-main-round-time", main).val(@config.round_time()).change (e) ->
            self.config.update_round_time jQuery(this).val()

        soldier_type_select = jQuery(".button-box #bab-main-soldier-type", main)
        for soldier_type in Soldier.types
            soldier_type_select.append jQuery("<option>").val(soldier_type.id).text(soldier_type.desc)
        soldier_type_select.val(@config.soldier_type()).change (e) ->
            self.config.update_soldier_type jQuery(this).val()

        now = new Date
        next_time = getNextTime(location.hostname, now);
        if next_time
            jQuery("#next-at", main).text generateDateString2(next_time)
            jQuery("#after-by", main).text generateWaitTimeString(next_time, now)
        else
            jQuery("#next-time", main).hide()

        villages = newLoadVillages()
        trigger_enable_checkbox = (checkbox, x, y) ->
            checkbox.click (e) ->
                GM_setValue "enable_auto_build_#{x}_#{y}", this.checked
        for village, i in villages
            actions = for action in village.actions
                name = "#{action.action}:#{action.target}"
                name += " / #{action.user} #{action.skill_name}" if action.user && action.skill_name
                name += "(LV#{action.level})" if action.level
                finish_at = Date.parse action.at
                status = 'working'
                if action.action == '削除'
                    if finish_at < now
                        status = 'deleted'
                    else
                        status = 'deleting'
                else
                    status = 'finished' if finish_at < now

                {
                    name: name
                    at: action.at
                    status: status
                }
            updates = jQuery.tmpl(updates_template, actions)
            village_params = {
                name: village.name
            }

            village_info = jQuery.tmpl(village_template, village_params)
            enable_checkbox = jQuery(".name input:eq(0)", village_info).attr("village_index", i)
            enable_checkbox.attr("checked", "checked") if GM_getValue("enable_auto_build_#{village.position.x}_#{village.position.y}", false)
            trigger_enable_checkbox(enable_checkbox, village.position.x, village.position.y)
            jQuery(".updates", village_info).append(updates)
            ((village) ->
                jQuery(".actions button:eq(0)", village_info).click (e) ->
                    openInifacBox "(#{village.position.x},#{village.position.y})"
            )(village)
            village_info.appendTo jQuery("#villages", main)

        del_list = (village) ->
            lists = cloadData HOST + "ReserveList", "[]", true, true
            for list, i in lists
                if list.x == village.x && list.y == village.y
                    lists.splice(i, 1);
                    csaveData HOST + "ReserveList", lists, true, true

        reserved_villages = cloadData HOST + "ReserveList", "[]", true, true

        for village in reserved_villages
            village_params = {
                name: "(#{village.x}, #{village.y})"
            }
            village_info = jQuery.tmpl(village_template, village_params)
            type = if village.kind == 220 then '村' else '砦'
            status = switch village.status
                when 0 then '作成失敗'
                when 1 then '作成予約'
                when 2 then '作成中'
                when 3 then '作成完了'
                when 4 then '破棄中'
            village_info.attr("id", "reserved_#{village.x}_#{village.y}")
            enable_checkbox = jQuery(".name input:eq(0)", village_info).attr("village_index", i)
            trigger_enable_checkbox(enable_checkbox, village.x, village.y)
            jQuery(".updates", village_info).text "#{status}: #{type}"
            ((village) ->
                jQuery(".updates", village_info).append jQuery("<button>").text("削除").click (e) ->
                    del_list(village)
                    jQuery("#reserved_#{village.x}_#{village.y}").remove()
            )(village)

            jQuery(".actions button:eq(0)", village_info).click (e) ->
                openInifacBox "(#{village.x},#{village.y})"
            village_info.appendTo jQuery("#villages", main)

        main.appendTo jQuery("body")

