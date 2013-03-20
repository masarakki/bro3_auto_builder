villages = [
    {name: 'Village1', updates: [
        {name: 'unko', at: '2012-01-01 00:00:00', pos: [-101, 100]}
        {name: 'chinko', at: '2012-01-01 01:00:00', pos: [-222, -222]}
        ]
    }
    {name: 'Village2', updates: [
        {name: 'hoge', at: '2012-01-01 00:00:00', pos: [200, 100]}
        {name: 'hage', at: '2012-01-01 00:00:00', pos: [210, 201]}
        ]}
]

$(document).ready ->
    template = $("#village-template")
    updates_template = $("#update-template")

    for village in villages
        updates = $.tmpl(updates_template, village.updates)
        village_info = $.tmpl(template, village)
        $(".updates", village_info).append(updates)
        village_info.appendTo $("#villages")

    main = $("#bab-main").css({left: 0, top: 0})
    moving = false
    before = {x: 0, y: 0}

    main.mousedown (e) ->
        return true unless $.inArray(e.target.tagName, ['SELECT', 'INPUT', 'BUTTON']) == -1
        moving = true
        before = {
            x: e.pageX - parseInt(this.style.left, 10)
            y: e.pageY - parseInt(this.style.top, 10)
        }
        e.preventDefault()
        false

    $(document).mousemove (e) ->
        return true unless moving
        left = e.pageX - before.x
        top = e.pageY - before.y
        main.css({left: left, top: top})
        false

    $(document).mouseup (e) ->
        moving = false
        false

    $(".button-box button:eq(2)").click (e) ->
        main.hide()

    $(".button-box input").change (e) ->
        console.log e
    $(".button-box select").change (e) ->
        console.log e
