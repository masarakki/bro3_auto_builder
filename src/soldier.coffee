class Soldier
    constructor: (@name, @type_flag, @id, @builder, @no_weapon = false) ->
        @unit_id = 300 + @id
    @TYPE_ALL = 0
    @TYPE_KEN = 1
    @TYPE_CAR = 2
    @TYPE_HIGH = 3
    @types = [
        {id: @TYPE_HIGH, desc: '上級のみ'}
        {id: @TYPE_CAR,  desc: '上級+車'}
        {id: @TYPE_KEN,  desc: '上級+車+剣'}
        {id: @TYPE_ALL,  desc: '全て'}
    ]

    @_soldiers = [
        new Soldier '剣兵', @TYPE_KEN, 1, '練兵所'
        new Soldier '槍兵', @TYPE_ALL, 3, '兵舎'
        new Soldier '弓兵', @TYPE_ALL, 8, '弓兵舎'
        new Soldier '騎兵', @TYPE_ALL, 5, '厩舎'
        new Soldier '矛槍兵', @TYPE_HIGH, 4, '兵舎'
        new Soldier '弩兵', @TYPE_HIGH, 9, '弓兵舎'
        new Soldier '近衛騎兵', @TYPE_HIGH, 7, '厩舎'
        new Soldier '斥候', @TYPE_ALL, 10, '練兵所', true
        new Soldier '斥候騎兵', @TYPE_HIGH, 11, '厩舎', true
        new Soldier '衝車', @TYPE_CAR, 12, '兵器工房'
        new Soldier '投石機', @TYPE_HIGH, 13, '兵器工房'
    ]
    @soldiers: (type = Soldier.TYPE_ALL)->
        (soldier for soldier in @_soldiers when soldier.type_flag >= type)

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

