class Status
    constructor: ->
        @wood = parseInt j$("#wood").text()
        @stone = parseInt j$("#stone").text()
        @iron = parseInt j$("#iron").text()
        @rice = parseInt j$("#rice").text()
        [@current_famous, @max_famous] = (->
            text = $x('id("status_left")/img[contains(@src,"ico_fame.gif")]').nextSibling
            matches = text.nodeValue.match /\s*(\d+)\s*\/\s*(\d+)\s*/
            [parseInt(matches[1]), parseInt(matches[2])]
        )()

