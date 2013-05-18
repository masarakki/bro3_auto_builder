describe 'SettingView', ->
    beforeEach ->
        @setting_view = new SettingView

    it 'have template string', ->
        expect(jQuery(".facility", @setting_view.template).length).toEqual Facility.all.length
