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
