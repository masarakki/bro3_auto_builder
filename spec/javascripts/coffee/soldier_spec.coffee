describe "Soldier", ->
    describe 'instance methods', ->
        beforeEach ->
            @soldier = new Soldier('剣兵', Soldier.TYPE_KEN, 10, '練兵所')

        it '#name', ->
            expect(@soldier.name).toEqual '剣兵'
        it '#type_flag', ->
            expect(@soldier.type_flag).toEqual Soldier.TYPE_KEN
        it '#id', ->
            expect(@soldier.id).toEqual 10
        it '#unit_id', ->
            expect(@soldier.unit_id).toEqual 310
        it '#buildier', ->
            expect(@soldier.builder).toEqual '練兵所'
        it '#no_weapon', ->
            expect(@soldier.no_weapon).toEqual false

    describe 'class methods', ->
        it '.soldiers', ->
            expect(Soldier.soldiers().length).toEqual 11
            expect(Soldier.soldiers(Soldier.TYPE_HIGH).length).toEqual 5
            expect(Soldier.soldiers(Soldier.TYPE_CAR).length).toEqual 6
            expect(Soldier.soldiers(Soldier.TYPE_KEN).length).toEqual 7

        it '.types', ->
            expect(Soldier.types.length).toEqual 4
