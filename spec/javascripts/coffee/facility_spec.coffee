describe 'Facility', ->
    describe '.all', ->
        beforeEach ->
            @facilities = Facility.all
        it 'list buildings', ->
            expect(@facilities.length).toEqual 23

    describe '.find', ->
        beforeEach ->
            @facility = Facility.find('伐採所')
        it 'should return find building', ->
            expect(@facility.name).toEqual '伐採所'

        it 'should return null if cant find', ->
            expect(Facility.find('unko')).toEqual null
