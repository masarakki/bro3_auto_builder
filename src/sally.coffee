class Sally
    @url = "facility/castle_send_troop.php"
    @types = [
       {id: 301, name: "援軍"}
       {id: 302, name: "賊討伐"}
       {id: 303, name: "強襲"}
       {id: 306, name: "偵察"}
    ]
    constructor: (@target, @soldiers, @type, @chara = null, @skill = null) ->

    validate: ->
        return false if jQuery.inArray(@type, ["賊討伐", "強襲"]) != -1 && @chara == null
        return false if jQuery.inArray(@type, ["偵察"]) != -1 && @chara != null
        true

    params: ->
        move_type_id = (type.id for type in Sally.types when type.name == @type)[0]
        params = {
            village_x_value: @target.x
            village_y_value: @target.y
            radio_move_type: move_type_id
            radio_reserve_type: 0
            btn_send: "出兵"
            #unknowns...
            village_name: ""
            unit_assign_card_id: ""
            show_beat_bandit_flg: 1
            x: ""
            y: ""
            card_id: 204
        }

        for soldier in Soldier.all()
           params["#{soldier.en}_count"] = if @soldiers[soldier.name] then @soldiers[soldier.name] else null
        params

    execute: ->
        if @validate()
            params = @params()
            jQuery.ajax {
                url: "http://#{HOST}/#{Sally.url}"
                data: params
                type: "POST"
                success: (res) ->
            }

    @execute: (target, soldiers, type, chara = null, skill = null) ->
        sally = new Sally(target, soldiers, type, chara, skill)
        sally.execute()
