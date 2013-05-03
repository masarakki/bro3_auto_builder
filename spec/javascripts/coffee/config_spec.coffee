describe 'Config', ->
    beforeEach ->
        @config = new Config
        GM_reset()

    describe 'auto_reload', ->
        it 'default is true', ->
            expect(@config.auto_reload()).toEqual true
        it 'togglable', ->
            @config.toggle_auto_reload()
            expect(@config.auto_reload()).toEqual false
            @config.toggle_auto_reload()
            expect(@config.auto_reload()).toEqual true

    describe 'stay_mode', ->
        it 'default is true', ->
            expect(@config.stay_mode()).toEqual true
        it 'togglable', ->
            @config.toggle_stay_mode()
            expect(@config.stay_mode()).toEqual false
            @config.toggle_stay_mode()
            expect(@config.stay_mode()).toEqual true

    describe 'round_time', ->
        it 'default is 60', ->
            expect(@config.round_time()).toEqual 60
        it 'update with int', ->
            @config.update_round_time("60")
            expect(@config.round_time()).toEqual 60

    describe 'soldier_type', ->
        it 'default is 0', ->
            expect(@config.soldier_type()).toEqual 0
        it 'update with int', ->
            @config.update_soldier_type("2")
            expect(@config.soldier_type()).toEqual 2
