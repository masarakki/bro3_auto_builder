create_soldier_box = (soldiers)->

    make_soldier_row = (soldier) ->
        td = d.createElement "td"
        td.style.padding = "3px"
        td.style.verticalAlign = "top"
        td.style.textAlign = "center"

        ccreateText td, "dummy", soldier.name, 0
        ccreateTextBox td, "OPT_SOL_MAX#{soldier.id}", OPT_SOL_MAX[soldier.id], "", "#{soldier.name}兵数上限", 7, 0
        ccreateTextBox td, "OPT_SOL_ADD#{soldier.id}", OPT_SOL_ADD[soldier.id], "", "#{soldier.name}作成単位", 7, 0
        td

    titles = d.createElement 'td'
    controls = d.createElement 'td'

    titles.style.padding = '3px'
    titles.style.verticalAlign = 'bottom'

    ccreateText titles, "dummy", "　", 0
    ccreateText titles, "dummy", "　兵数上限", 0
    ccreateText titles, "dummy", "　作成単位", 0

    controls.style.padding = '3px'
    controls.style.verticalAlign = 'bottom'

    ccreateText controls, "dummy", "　", 0
    ccreateButton controls, "作成中止", "", ->
        for soldier in soldiers
            j$("#OPT_SOL_ADD#{soldier.id}").val("0");

    header = (td) ->
        ccreateCheckBox td, "OPT_BLD_SOL", OPT_BLD_SOL, " 自動造兵", "", 0
    content = (body) ->
        body.appendChild titles
        for soldier in soldiers
            body.appendChild make_soldier_row(soldier)
        body.appendChild controls

    create_box header, content

