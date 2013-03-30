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

        main = j$.tmpl(main_template, template_values).css {
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
            return true unless j$.inArray(e.target.tagName, ['SELECT', 'INPUT', 'BUTTON']) == -1
            moving = true
            before = {
                x: e.pageX - parseInt(this.style.left, 10)
                y: e.pageY - parseInt(this.style.top, 10)
            }
            e.preventDefault()
            false

        j$(document).mousemove (e) ->
            return true unless moving
            left = e.pageX - before.x
            top = e.pageY - before.y
            main.css({left: left, top: top})
            GM_setValue(location.hostname + PGNAME + "_popup_left", left);
            GM_setValue(location.hostname + PGNAME + "_popup_top", top);
            false

        j$(document).mouseup (e) ->
            moving = false
            false

        j$(".button-box button:eq(0)", main).click (e) ->
            self.toggle_reload_button(j$(this))
        j$(".button-box button:eq(1)", main).click (e) ->
            confirmTimer()
        j$(".button-box button:eq(2)", main).click (e) ->
            main.hide()
        j$(".button-box input", main).attr("checked", "checked") if @config.stay_mode()
        j$(".button-box input", main).change (e) ->
            self.config.update_stay_mode this.checked
        j$(".button-box select", main).val @config.round_time()
        j$(".button-box select", main).change (e) ->
            self.config.update_round_time j$(this).val()

        now = new Date
        next_time = getNextTime(location.hostname, now);
        if next_time
            j$("#next-at", main).text generateDateString2(next_time)
            j$("#after-by", main).text generateWaitTimeString(next_time, now)
        else
            j$("#next-time", main).hide()

        villages = newLoadVillages()

        for village, i in villages
            actions = for action in village.actions
                name = "#{action.action}:#{action.target}"
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
            updates = j$.tmpl(updates_template, actions)
            village_params = {
                name: village.name
            }

            village_info = j$.tmpl(village_template, village_params)
            enable_checkbox = j$(".name input:eq(0)", village_info).attr("village_index", i)
            enable_checkbox.attr("checked", "checked") if GM_getValue("#{HOST}#{PGNAME}OPT_CHKBOX_AVC_#{i}", false)
            enable_checkbox.click (e) ->
                village_index = j$(this).attr 'village_index'
                GM_setValue "#{HOST}#{PGNAME}OPT_CHKBOX_AVC_#{village_index}", this.checked
            j$(".updates", village_info).append(updates)
            j$(".actions button:eq(0)", village_info).click (e) ->
                openInifacBox "(#{village.position.x},#{village.position.y})"
            village_info.appendTo j$("#villages", main)

        del_list = (village) ->
            lists = cloadData HOST + "ReserveList", "[]", true, true
            for list, i in lists
                if list.x == village.x && list.y == village.y
                    lists.splice(i, 1);
                    csaveData HOST + "ReserveList", lists, true, true

        reserved_villages = cloadData HOST + "ReserveList", "[]", true, true
        for village in reserved_villages
            console.log village.kind
            village_params = {
                name: "(#{village.x}, #{village.y})"
            }
            village_info = j$.tmpl(village_template, village_params)
            type = if village.kind == 220 then '村' else '砦'
            status = switch village.status
                when 0 then '作成失敗'
                when 1 then '作成予約'
                when 2 then '作成中'
                when 3 then '作成完了'
                when 4 then '破棄中'
            village_info.attr("id", "reserved_#{village.x}_#{village.y}")
            j$(".updates", village_info).text "#{status}: #{type}"
            j$(".updates", village_info).append j$("<button>").text("削除").click (e) ->
                del_list(village)
                j$("#reserved_#{village.x}_#{village.y}").remove()

            j$(".actions button:eq(0)", village_info).click (e) ->
                openInifacBox "(#{village.x},#{village.y})"
            village_info.appendTo j$("#villages", main)

        main.appendTo j$("body")

