class Status
    constructor: ->
        @wood = parseInt jQuery("#wood").text()
        @stone = parseInt jQuery("#stone").text()
        @iron = parseInt jQuery("#iron").text()
        @rice = parseInt jQuery("#rice").text()
        [@current_famous, @max_famous] = (->
            text = $x('id("status_left")/img[contains(@src,"ico_fame.gif")]').nextSibling
            matches = text.nodeValue.match /\s*(\d+)\s*\/\s*(\d+)\s*/
            [parseInt(matches[1]), parseInt(matches[2])]
        )()

