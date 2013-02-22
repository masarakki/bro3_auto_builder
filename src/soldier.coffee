class Soldier
    constructor: (@name, @highclass, @id, @builder, @no_weapon = false, @current = 0, @unit_max = 0, @add_unit = 0) ->
    unit_id: ->
        @id + 300

init_soldiers = ->
    soldiers = [
        new Soldier '剣兵', false, 1, '練兵所'
        new Soldier '槍兵', false, 3, '兵舎'
        new Soldier '弓兵', false, 8, '弓兵舎'
        new Soldier '騎兵', false, 5, '厩舎'
        new Soldier '矛槍兵', true, 4, '兵舎'
        new Soldier '弩兵', true, 9, '弓兵舎'
        new Soldier '近衛騎兵', true, 7, '厩舎'
        new Soldier '斥候', false, 10, '練兵所', true
        new Soldier '斥候騎兵', true, 11, '厩舎', true
        new Soldier '衝車', false, 12, '兵器工房'
        new Soldier '投石機', true, 13, '兵器工房'
    ]

    high_soldiers = (soldier for soldier in soldiers when soldier.highclass)

    [soldiers, high_soldiers]

[soldiers, high_soldiers] = init_soldiers()

get_soldiers = ->
    [soldiers, high_soldiers] = init_soldiers()
    high_soldiers

