class MainView
    constructor: (@left = 0, @top = 0, @visible = false) ->
        this.generate()

    generate: ->
        moving = false
        template = GM_getResourceText('main_template')
        main = j$.tmpl(template).css {
            top: @top
            left: @left
        }
        if @visible
            main.css "display", "block"
        else
            main.css "display", "none"

        before = {x: 0, y: 0}

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

        main.appendTo j$("body")
