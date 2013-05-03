class Soldier
    constructor: (@name, @en, @type_flag, @id, @builder, @no_weapon = false) ->
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
        new Soldier '剣兵', "infantry", @TYPE_KEN, 1, '練兵所'
        new Soldier '槍兵', "spear", @TYPE_ALL, 3, '兵舎'
        new Soldier '弓兵', "archer", @TYPE_ALL, 8, '弓兵舎'
        new Soldier '騎兵', "cavalry", @TYPE_ALL, 5, '厩舎'
        new Soldier '矛槍兵', "halbert", @TYPE_HIGH, 4, '兵舎'
        new Soldier '弩兵', "crossbow", @TYPE_HIGH, 9, '弓兵舎'
        new Soldier '近衛騎兵', "cavalry_guards", @TYPE_HIGH, 7, '厩舎'
        new Soldier '斥候', "scout", @TYPE_ALL, 10, '練兵所', true
        new Soldier '斥候騎兵', "cavalry_scout", @TYPE_HIGH, 11, '厩舎', true
        new Soldier '衝車', "ram", @TYPE_CAR, 12, '兵器工房'
        new Soldier '投石機', "catapult", @TYPE_HIGH, 13, '兵器工房'
    ]
    @soldiers: (type = Soldier.TYPE_ALL)->
        (soldier for soldier in @_soldiers when soldier.type_flag >= type)
    @all: ->
        this.soldiers()

soldiers = ->
    config = new Config
    Soldier.soldiers config.soldier_type()

