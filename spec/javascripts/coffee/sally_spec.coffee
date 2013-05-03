describe 'Sally', ->
    describe '援軍', ->
        beforeEach ->
            @sally = new Sally({x: 100, y: 200}, {"騎兵": 100, "弩兵": 200, "斥候": 300}, "援軍")

        describe 'validate', ->
            it 'should be true', ->
                expect(@sally.validate()).toEqual true

        describe 'params', ->
            beforeEach ->
                @params = @sally.params()
                console.log @params

            it 'position', ->
                expect(@params.village_x_value).toEqual 100
                expect(@params.village_y_value).toEqual 200
            it 'move type', ->
                expect(@params.radio_move_type).toEqual 301
            it 'resereve_type', ->
                expect(@params.radio_reserve_type).toEqual 0
            it "soldiers", ->
                console.log @params
                expect(@params.infantry_count).toEqual null
                expect(@params.spear_count).toEqual null
                expect(@params.archer_count).toEqual null
                expect(@params.cavalry_count).toEqual 100
                expect(@params.halbert_count).toEqual null
                expect(@params.crossbow_count).toEqual 200
                expect(@params.cavalry_guards_count).toEqual null
                expect(@params.scout_count).toEqual 300
                expect(@params.cavalry_scout_count).toEqual null
                expect(@params.ram_count).toEqual null
                expect(@params.catapult_count).toEqual null

    describe '強襲', ->
        beforeEach ->
            @sally = new Sally({x: 100, y: 200}, {"騎兵": 100}, "強襲", 'hoge')

        describe 'validate', ->
            it 'should be true', ->
                expect(@sally.validate()).toEqual true

            it 'should be false without chara', ->
                @sally.chara = null
                expect(@sally.validate()).toEqual false
