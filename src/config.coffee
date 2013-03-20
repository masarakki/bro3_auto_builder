class Config
    constructor: ->
        @auto_reload_key = HOST + PGNAME + "AutoFlg"
        @stay_mode_key = HOST + "_stay_mode" + PGNAME
        @round_time_key = HOST + PGNAME + "OPT_ROUND_TIME1"
    auto_reload: ->
        GM_getValue @auto_reload_key, true
    update_auto_reload: (value) ->
        GM_setValue @auto_reload_key, value
        value
    toggle_auto_reload: ->
        this.update_auto_reload !this.auto_reload()

    stay_mode: ->
        GM_getValue @stay_mode_key, true

    update_stay_mode: (value) ->
        GM_setValue @stay_mode_key, value

    toggle_stay_mode: ->
        this.update_stay_mode !this.stay_mode()

    round_time: ->
        GM_getValue @round_time_key, 60

    update_round_time: (value) ->
        GM_setValue @round_time_key, value
