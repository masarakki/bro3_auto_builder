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
                    callback(j$(res))
            }

    constructor: ->
        results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        len = results.snapshotLength
        @hash = {}
        @buildings = for num in [0..(len - 1)]
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
