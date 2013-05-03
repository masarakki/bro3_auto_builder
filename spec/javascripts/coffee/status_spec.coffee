describe 'Status', ->
    beforeEach ->
        loadFixtures 'layout.html'
        @status = new Status

    it '.wood', ->
        expect(@status.wood).toEqual 15041
    it '.stone', ->
        expect(@status.stone).toEqual 2625
    it '.iron', ->
        expect(@status.iron).toEqual 3432
    it '.rice', ->
        expect(@status.rice).toEqual 496071
    it '.current_famous', ->
        expect(@status.current_famous).toEqual 25
    it '.max_famous', ->
        expect(@status.max_famous).toEqual 224
