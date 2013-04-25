class Village
    constructor: ->
        [_, @x, @y] = for num in trim(jQuery("#basepoint .xy").text()).match /\((-?\d+),(-?\d+)\)/
            parseInt num

        @id = parseInt getVillageID("(#{@x},#{@y})")

        @building_ids = {
            '畑': 215
            '伐採所': 209
            '石切り場': 211
            '製鉄所': 213
            '倉庫': 233
            '銅雀台': 216
        }

        results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        len = results.snapshotLength
        @hash = {}

        areas = for num in [0..(len - 1)]
            item = results.snapshotItem(num)
            coords = jQuery(item).attr('coords').match(/(-?\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+)/)
            x = Math.min(Math.min(coords[1], coords[3]), Math.min(coords[5], coords[7]))
            y = Math.min(Math.min(coords[2], coords[4]), Math.min(coords[6], coords[8]))
            y_index = (y + 1) / 25
            x_index = x + y_index * 50
            {x: x_index, y: y_index, item: item}

        areas.sort (a, b) ->
            if a.x < b.x || a.x == b.x && a.y < b.y
                return -1
            return 1

        buildings = for area, num in areas
            item = area.item
            if item.alt.match(/(.*?)\s.*?(\d+)/)
                name = RegExp.$1
                level = parseInt RegExp.$2
            else
                name = item.alt
                level = 0
            x = Math.floor(num / 7)
            y = Math.floor(num % 7)
            building = new Building name, x, y, level
            @hash[name] = building unless @hash[name]
            building
        @buildings = (building for building in buildings when building)
    at: (x, y) ->
        (building for building in @buildings when building.x == x and building.y == y)[0]
    build_at: (building_id, x, y) ->
        building_id = @building_ids[building_id] unless typeof building_id is 'number'
        jQuery.ajax {
            url: "http://#{HOST}/facility/build.php"
            method: "POST"
            data: {village_id: @id, x: x, y: y, id: building_id, ssid: jQuery.cookie('SSID') }
            success: (res) ->
                location.reload false
        }
    build: (building_id) ->
        position = @hash['平地']
        @build_at building_id, position.x, position.y
    find: (name) ->
        (building for building in @buildings when building.name is name)
    has: (name) ->
        @hash[name] == null ? false : true
    enable_suzume: ->
        (building for building in @find('畑') when building.level >= 5).length >= 1
    build_shigen: ->
        for building in @find('平地')
            console.log building
            neighers = []
            for diff in [[-1, 0], [1, 0], [0, -1], [0, 1]]
                x = building.x + diff[0]
                y = building.y + diff[1]
                if 0 <= x < 7 and 0 <= y < 7
                    neighers.push @at(x, y)
            shigens = (neigher.name for neigher in neighers when neigher.name is '森林' or neigher.name is '岩山' or neigher.name is '鉄鉱山')
            shigen = jQuery.unique shigens
            if shigen.length == 1
                building_id = switch shigen[0]
                    when '森林' then '伐採所'
                    when '岩山' then '石切り場'
                    when '鉄鉱山' then '製鉄所'
                return @build_at building_id, building.x, building.y if building_id > 0

class Building
    constructor: (@name, @x, @y, @level) ->
    html: (callback) ->
        jQuery.ajax {
            method: 'GET'
            url: "/facility/facility.php"
            data: { x: @x, y: @y }
            success: (res) ->
                callback jQuery(res)
        }
    destroy: ->
        html (html) ->
            ssid = jQuery("[name=ssid]", html)[0].value
            jQuery.ajax {
                url: "/facility/facility.php"
                method: 'POST'
                data: {x: @x, y: @y, ssid: ssid, remove: '建物を壊す'}
                success: (res) ->
                    location.reload false
            }

update_creating_soldiers = (res) ->
    htmldoc = document.createElement "html"
    htmldoc.innerHTML = res
    getTrainingSoldier htmldoc
    reopen() if is_stay_mode()
