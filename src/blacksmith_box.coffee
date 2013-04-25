create_blacksmith_box = (soldiers)->

    make_blacksmith_row = (soldier) ->
        td = d.createElement "td"
        td.style.padding = "3px"
        td.style.verticalAlign = "top"
        td.style.textAlign = "center"

        ccreateText td, "dummy", soldier.name, 0
        if soldier.no_weapon
            ccreateText td, "dummy", "　", 0
        else
            ccreateTextBox td, "OPT_BK_LV#{soldier.id}", OPT_BK_LV[soldier.id], "", "", 7, 0

        ccreateTextBox td, "OPT_BG_LV#{soldier.id}", OPT_BG_LV[soldier.id], "", "", 7, 0
        td

    titles = d.createElement 'td'
    controls = d.createElement 'td'

    titles.style.padding = '3px'
    titles.style.verticalAlign = 'bottom'

    ccreateText titles, "dummy", "　", 0
    ccreateText titles, "dummy", "武器レベル", 0
    ccreateText titles, "dummy", "防具レベル", 0

    controls.style.padding = '3px'
    controls.style.verticalAlign = 'bottom'

    ccreateText controls, "dummy", "　", 0
    ccreateButton controls, "初期化", "", ->
        for soldier in soldiers
            jQuery("#OPT_BG_LV#{soldier.id}").val(0)
            jQuery("#OPT_BK_LV#{soldier.id}").val(0)

    header = (td) ->
        ccreateCheckBox td, "OPT_BKBG_CHK", OPT_BKBG_CHK, " 自動武器・防具強化", "", 0
    content = (body) ->
        body.appendChild titles
        for soldier in soldiers
            body.appendChild make_blacksmith_row(soldier)
        body.appendChild controls

    create_box header, content

