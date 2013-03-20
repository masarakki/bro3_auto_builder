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

main_view = ->
    j$("#bab-main").show()
    return false

    villages = loadVillages HOST + PGNAME

    firstboot = false;
    firstboot = true if villages == ""
    firstboot = true if villages.length > 0 && villages[0][IDX_URL] == ""

    if firstboot
        message = j$("<span>").text("<br>インストールありがとうございます。<br>" +
            "まずは、プロフィール画面を開いて<br>" +
            "拠点情報を取得してください。<br>").css {
                "font-size": "15px"
                "margin": "3px"
                "color": "#FFFFFF"
            }
        table.append j$("<tr>").append(j$("<td>").css("padding", "3px").append(message))
    else
        land_elms =j$("li.on span")
        color = "#71C4F9"

        village_line = (village, i) ->
            village_name = village[IDX_BASE_NAME]
            village_tr = j$("<tr>").css("font-weight", "bold")
            td = j$("<td>").css {
                "padding": "2px"
                "border": "solid 1px black"
                "background-color": "#E6CF88"
            }

            village_tr.append(td);
            unless village_name == ""
                village_id = village[IDX_XY]
                td00 = j$("<div>").css("width", "140px")
                jcreateCheckBox0(td00, "OPT_CHKBOX_AVC_#{i}", loadAVCBox2(i), village[IDX_BASE_NAME], "", 0, villages);

                opfac_link = j$("<span>").css {
                    padding: "3px"
                }
                td00.append opfac_link
                unless village[IDX_URL] == ""
                    opfac_link.append j$("<a>").text(village[IDX_BASE_NAME]).attr("href", village[IDX_URL]).css {
                        "color": "#654634"
                        "text-decoration": "none"
                    }

                td.append td00
                actions_td = j$("<td>").css {
                    "background-color": COLOR_BACK
                    "border": "solid 1px black"
                    "padding": "3px"
                    "width": "380px"
                }
                village_tr.append actions_td

                actions = sortAction(village[IDX_ACTIONS]);
                now = new Date;
                for action in actions
                    actionDiv = jcreateActionDiv(action, now, village[IDX_XY], location.hostname);
                    if !actionDiv
                         continue
                    # 完了済みフラグのチェック

                    actionDiv = jcreateActionDiv(action, now, village[IDX_XY], location.hostname);
                    actions_td.append actionDiv

                # 設定ボタン
                setting_td = j$("<td>").css {
                    "background-color": "#E6CF88"
                    "border": "solid 1px black"
                    "padding": "3px"
                    "width": "20px"
                }
                village_tr.append setting_td

                config_button = j$("<input>").attr("type", "button").css("padding": "1px").val("設定")
                config_button.click (e) ->
                    openInifacBox(village[IDX_XY])
                setting_td.append config_button
            village_tr
        for village, i in villages
            table.append village_line(village, i)

        saveVillages(HOST+PGNAME, villages);

    del_list = (x, y) ->
        lists = cloadData HOST + "ReserveList", "[]", true, true
        for list, i in lists
            if list.x == x && list.y == y
                lists.splice(i, 1);
                csaveData HOST + "ReserveList", lists, true, true
                reopen()
                break;

    list_of_building_village = ->
        # 拠点作成状況の表示 2012.04.09
        tbl2 = j$("<table>").css("border", "0px")

        lists = cloadData HOST + "ReserveList", "[]", true, true
        for list in lists
            vId = "(#{list.x},#{list.y})"
            tr = j$("<tr>")
            td = j$("<td>")

            tbl2.append tr

            td00 = j$("<div>")
            td.append td00
            tr.append td

            actions_td = j$("<td>").css {
                "background-color": COLOR_BACK
                "border": "solid 1px black"
                "padding": "3px"
                "width": "525px"
            }

            tr.append actions_td
            action_div = j$("<span>").css {
                padding: "3px"
            }

            village_text = "座標#{vId} に"
            if list.kind == 220
                village_text += "村"
            else if list.kind == 222
                village_text += "砦"


            if list.status == 0
                village_text += "作成失敗"
            else if list.status == 1
                village_text += "作成予約"
            else if list.status == 2
                village_text += "作成中"
            else if list.status == 3
                village_text += "作成完了"
            else if list.status == 4
                village_text += "破棄中"

            if list.status == 2 || list.status == 4
                village_text += " (" + list.time + " 完了予定)";
            action_div = action_div.text(village_text)

            del_td = j$("<td>").css {
                "background-color": "#E6CF88"
                "border": "solid 1px black"
                "padding": "3px"
                "width": "34px"
            }
            tr.append del_td

            if list.status == 1 || list.status == 0 || list.status == 3 || list.status == 5
                del_button = j$("button").val("削除").css {
                    "padding": "1px"
                }
                del_td.append del_button.click (e) ->
                    del_list(list.x, list.y)
            actions_td.append action_div
        tbl2
    tbl2 = list_of_building_village()
    container.append table
    container.append tbl2


