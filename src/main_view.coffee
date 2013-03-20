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
        template = GM_getResourceText('main_template')
        template_values = {
            reload_status: if @config.auto_reload() then '巡回中' else '停止中'
        }

        main = j$.tmpl(template, template_values).css {
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

        main.appendTo j$("body")
