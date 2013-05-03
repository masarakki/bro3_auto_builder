class Status
    constructor: ->
        @wood = parseInt jQuery("#wood").text()
        @stone = parseInt jQuery("#stone").text()
        @iron = parseInt jQuery("#iron").text()
        @rice = parseInt jQuery("#rice").text()
        [@current_famous, @max_famous] = (->
            text = jQuery("#status_left img[src$='ico_fame.gif']").get(0).nextSibling.nodeValue
            matches = text.match /\s*(\d+)\s*\/\s*(\d+)\s*/
            [parseInt(matches[1]), parseInt(matches[2])]
        )()

