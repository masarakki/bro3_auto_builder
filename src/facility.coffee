class Facility
    constructor: (@name, @id = null) ->

    @all = [
        new Facility '拠点'
        new Facility '伐採所', 209
        new Facility '石切り場', 211
        new Facility '製鉄所', 213
        new Facility '畑', 215
        new Facility '倉庫', 233
        new Facility '銅雀台', 216
        new Facility '鍛冶場'
        new Facility '防具工場'
        new Facility '練兵所'
        new Facility '兵舎'
        new Facility '弓兵舎'
        new Facility '厩舎'
        new Facility '宿舎'
        new Facility '兵器工房'
        new Facility '市場'
        new Facility '訓練所'
        new Facility '水車'
        new Facility '工場'
        new Facility '研究所'
        new Facility '大宿舎'
        new Facility '遠征訓練所'
        new Facility '見張り台'
    ]

    @find: (name) ->
        for facility in @all
            return facility if facility.name == name
        null
