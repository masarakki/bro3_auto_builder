count_soldiers = (callback) ->
    total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    keys = for soldier in soldiers()
        soldier.name
    add_soldier_count = (add) ->
        for num, i in add
            total[i] += parseInt jQuery(num).text()

    jQuery.ajax {
        type: "GET"
        url: "http://#{HOST}/facility/unit_status.php"
        success: (res) ->
            tables = jQuery '#all table.commonTablesNoMG', res

            for table in tables
                tables2 = jQuery 'tr td.digit', table
                add_soldier_count tables2
            res = {}
            for count, i in total
                res[keys[i]] = count
            callback res
    }

is_greedy = (builder, using_skill) ->
    using_skill == '強兵の檄文' && builder.name != '兵器工房' || using_skill == '攻城の檄文' && builder.name == '兵器工房'

try_create_soldier = (builder, soldier, request_num, using_skill, callback) ->
    builder.html (html) ->
        tables = jQuery(".commonTables", html)
        if !is_greedy(builder, using_skill) && tables.length > 2
            callback()
        else
            soldier_types = jQuery(".mainTtl", tables[1])
            for soldier_type in soldier_types
                key = soldier_type.textContent
                if key == soldier.name
                    enable_soldier_count = parseInt(sumMaxSoldier(make_no[key][1]));
                    if enable_soldier_count > request_num
                        console.log "request to create #{soldier.name} #{request_num}"
                        return jQuery.ajax {
                            url: "http://#{HOST}/facility/facility.php"
                            type: "POST"
                            data: { x: builder.x, y: builder.y, unit_id: soldier.unit_id, count: request_num }
                            success: (res) ->
                                update_creating_soldiers res
                                callback jQuery(res)
                        }
                    else
                        return callback()
            return callback()

try_create_soldiers = (soldiers, village, current_soldier_counts, using_skill, capacity, succeeded = false) ->
    next_tick = (soldiers, current_soldier_counts, capacity, succeeded) ->
        if soldiers.length > 0
            try_create_soldiers soldiers, village, current_soldier_counts, using_skill, capacity, succeeded
        else if succeeded
            make_all_soldiers current_soldier_counts

    soldier = soldiers.pop()
    builder = village.hash[soldier.builder]

    require_count = OPT_SOL_MAX[soldier.id] - current_soldier_counts[soldier.name]
    balk_count = OPT_SOL_ADD[soldier.id]
    balk_count = 50 if balk_count == 0

    if builder && require_count > 0
        request_count = Math.min(balk_count, require_count)
        try_create_soldier builder, soldier, request_count, using_skill, (html = null) ->
            if html
                capacity -= request_count
                current_soldier_counts[soldier.name] -= request_count
                succeeded = true
            next_tick soldiers, current_soldier_counts, capacity, succeeded
    else
        next_tick soldiers, current_soldier_counts, capacity, succeeded

make_all_soldiers = (current_soldier_counts) ->
    capacity = ( ->
        matches = jQuery(".status.village-bottom").text().match /(\d+)\/(\d+)/
        parseInt(matches[2]) - parseInt(matches[1]);
    )()

    using_skill = get_using_skill()
    return unless capacity > 0

    village = new Village
    try_create_soldiers soldiers(), village, current_soldier_counts, using_skill, capacity, false
