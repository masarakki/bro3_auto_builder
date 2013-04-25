build_village = (x, y, type, funcs) ->
    jQuery.ajax {
        url: "/facility/select_type.php"
        data: {x: x, y: y}
        success: (res) ->
            if res.match /この領地を拠点にする/
                jQuery.ajax {
                    url: "/facility/select_type.php"
                    data: {x: x, y: y, mode: 'build', type: type}
                    success: (res2) ->
                        unless res2.match /名声が不足しています/
                            htmldoc = document.createElement 'html'
                            htmldoc.innerHTML = res2
                            getAddingVillage htmldoc
                            if is_stay_mode()
                                reopen()
                }
            else
                funcs()
    }
