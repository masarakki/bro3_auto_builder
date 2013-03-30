g_MD = g_MX = g_MY = null

is_stay_mode = ->
    GM_getValue HOST + "_stay_mode" + PGNAME, true

changeStayMode = (value) ->
    GM_setValue HOST + "_stay_mode" + PGNAME, value

create_box = (header_func, body_func) ->
    box = d.createElement 'table'
    box.style.border = 'solid 2px black'
    box.style.marginBottom = '4px'
    box.style.width = '100%'

    header_tr = d.createElement 'tr'
    header_tr.style.border = 'solid 1px black'
    header_tr.style.backgroundColor = COLOR_TITLE

    header_td = d.createElement 'td'
    header_tr.appendChild header_td

    body_tr = d.createElement 'tr'
    body_tr.style.border = 'solid 1px black'
    body_tr.style.backgroundColor = COLOR_BACK

    body_td = d.createElement 'td'
    body_td.style.padding = '3px'
    body_tr.appendChild body_td

    body_inner_tr = d.createElement 'tr'
    body_td.appendChild body_inner_tr

    header_func header_td
    body_func body_inner_tr

    box.appendChild header_tr
    box.appendChild body_tr
    box

j$(document).ready ->
    left = Math.max GM_getValue(location.hostname + PGNAME + "_popup_left", 150), 0
    top  = Math.max GM_getValue(location.hostname + PGNAME + "_popup_top", 150), 0

    main_view = new MainView left, top
