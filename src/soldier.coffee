class Soldier
    constructor: (@name, @highclass, @id, @no_weapon = false, @current = 0, @unit_max = 0, @add_unit = 0) ->


init_soldiers = ->
    soldiers = [
        new Soldier '剣兵', false, 1
        new Soldier '槍兵', false, 3
        new Soldier '弓兵', false, 8
        new Soldier '騎兵', false, 5
        new Soldier '矛槍兵', true, 4
        new Soldier '弩兵', true, 9
        new Soldier '近衛騎兵', true, 7
        new Soldier '斥候', false, 10, true
        new Soldier '斥候騎兵', true, 11, true
        new Soldier '衝車', false, 12
        new Soldier '投石機', true, 13
    ]

    high_soldiers = (soldier for soldier in soldiers when soldier.highclass)

    [soldiers, high_soldiers]
