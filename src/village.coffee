class Village
    class Building
        constructor: (@name, @x, @y, @level) ->
        html: (callback) ->
            j$.ajax {
                method: 'GET'
                url: "http://#{HOST}/facility/facility.php"
                data: { x: @x, y: @y }
                headers: { "Content-type": "text/html" }
                overrideMimeType: 'text/html; charset=utf-8'
                success: (res) ->
                    callback j$(res)
            }

    constructor: ->
        [_, @x, @y] = for num in trim(j$("#basepoint .xy").text()).match /\((\d+),(\d+)\)/
            parseInt num

        @id = parseInt getVillageID("(#{@x},#{@y})")

        results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        len = results.snapshotLength
        @hash = {}
        buildings = for num in [0..(len - 1)]
            item = results.snapshotItem(num)
            if item.alt.match(/(.*?)\s.*?(\d+)/)
                url = item.href
                name = RegExp.$1
                level = parseInt RegExp.$2

                url.match(/x=(\d)&y=(\d)/)
                x = parseInt RegExp.$1
                y = parseInt RegExp.$2
                building = new Building name, x, y, level
                @hash[name] = building
                building
        @buildings = (building for building in buildings when building)

    build_at: (building_id, x, y) ->
        j$.ajax {
            url: "http://#{HOST}/facility/build.php"
            method: "POST"
            data: {village_id: @id, x: x, y: y, id: building_id, ssid: j$.cookie('SSID') }
            success: (res) ->
                location.reload false
        }
    build: (building_id) ->
        position = @hash['平地']
        build_at building_id, position.x, position.y
    find: (name) ->
        (building for building in @buildings when building.name is name)
    has: (name) ->
        @hash[name] == null ? false : true
    enable_suzume: ->
        (building for building in find('畑') when building.level >= 5).length >= 1


update_creating_soldiers = (res) ->
    htmldoc = document.createElement "html"
    htmldoc.innerHTML = res
    getTrainingSoldier htmldoc
    reopen() if is_stay_mode()
