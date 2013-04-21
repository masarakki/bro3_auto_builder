describe "Soldier", ->
    describe 'instance', ->
        beforeEach ->
            @soldier = new Soldier('剣兵', false, 10, '練兵所')

        it 'name', ->
            expect(@soldier.name).toEqual '剣兵'
        it 'id', ->
            expect(@soldier.id).toEqual 10
        it 'unit_id', ->
            expect(@soldier.unit_id).toEqual 310
        it 'buildier', ->
            expect(@soldier.builder).toEqual '練兵所'
        it 'no_weapon', ->
            expect(@soldier.no_weapon).toEqual false
