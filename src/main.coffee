global_status = null
URL_PARAMS = {}

init_url_params = ->
    matches = location.search.match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/g);
    if matches
        for match in matches
            params = match.match /(?:\?|&)?([^=]+)(?:=([^&]+))?/
            key = params[1];
            data = params[2];

            URL_PARAMS[key] = '';
            if params.length == 3 && typeof data == 'string'
                URL_PARAMS[key] = decodeURIComponent data

main = ->
    global_status = new Status

    # zIndex(重なり順序）の修正
    jQuery("div#status div#status_left").css({"z-index":"0"})
    jQuery("#menu_container").css({"z-index":"980"})
    jQuery("div#map-scroll").css({"z-index": "150"})
    jQuery("a#cur01, a#cur02, a#cur03, a#cur04, a#double-cur01, a#double-cur02, a#double-cur03, a#double-cur04").css({"z-index":"460"})

    init_url_params()

    jQuery("#mixi_ad_head").hide()
    jQuery("#mixi_ad_groups").hide()
    jQuery(".brNews").hide()

    addOpenLinkHtml()
    reopen() if is_stay_mode()

    # 領地画面なら拠点建設データ取得
    if location.pathname == "/land.php" && URL_PARAMS.x && URL_PARAMS.y
        getAddingVillage document.body

    # 拠点画面なら拠点削除データ取得
    if location.pathname == "/facility/castle.php"
        getDeletingVillage document.body

    # バグ回避 600000=5*60*1000
    # 領地画面や建築画面で停止した場合の処理
    # ５分間止まっていた場合拠点画面に移動する
    if location.pathname == "/land.php" || location.pathname == "/facility/facility.php"
       $w (-> location.href = "http://" + HOST + "/village.php"), 300000

    # 君主プロフィール画面なら都市画面URLを取得
    if (location.pathname == "/user/" || location.pathname == "/user/index.php") && getParameter("user_id") == ""
       getUserProf document
       reopen() if is_stay_mode()

    OPT_BUILD_VID = GM_getValue "#{HOST}#{PGNAME}OPT_BUILD_VID", ""

    if location.pathname == "/village.php"
        vId = trim jQuery("#basepoint .xy").text()

        Load_OPT vId
        if OPT_BUILD_VID != getVillageID(vId)
            GM_setValue HOST + PGNAME + "OPT_BUILD_VID" , ""
            OPT_BUILD_VID = "";

        getVillageActions()    # 建築情報の取得
        checkVillageLength()   # 拠点数チェック
        settleVillages(0)      # 自動拠点作成

        # 拠点画面なら対象建築物の建築チェック
        villages = loadVillages HOST + PGNAME
        for village, i in villages
            tChk1 = GM_getValue HOST + PGNAME + "OPT_CHKBOX_AVC_" + i, true
            if getVillageID(vId) == getParameter2(villages[i][IDX_URL], "village_id")
                break

        # 拠点にチェックがある場合建設処理を行う
        if tChk1
            Auto_Domestic()            # 自動内政処理 by nottisan
        else
            ichibaChange vId           # 市場処理
            autoDonate()               # 自動寄付処理

        # 研究所情報取得
        village = new Village
        lab = village.hash["研究所"]

        check_skill = ->
            skill_info = get_using_skill_all()
            nText = document.evaluate('//*[@class="base-skill"]/span/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            nName = nText.snapshotItem(0).innerHTML.split ":"
            if skill_info.chara
                # 内政武将がセットされている場合
                jQuery.get "http://#{HOST}/card/domestic_setting.php#ptop", (x) ->
                    htmldoc = document.createElement "html"
                    htmldoc.innerHTML = x
                    getDomesticSkill htmldoc   # 内政スキル使用チェック
                    forwardNextVillage(vId)       # 次の拠点へ移動
            else
                # 内政武将がセットされていない場合
                data = getMyVillage()
                data[IDX_ACTIONS] = []
                saveVillage(data, TYPE_DOMESTIC);
                reopen() if is_stay_mode()
                forwardNextVillage(vId)            # 次の拠点へ移動

        if lab
            try
                lab.html (res) ->
                    getTrainingSoldier(res);
                    check_skill()
            catch error
                forwardNextVillage(vId)
                check_skill()
        else
            check_skill()

    # 兵士作成画面なら作成中兵士を取得
    if location.pathname == "/facility/facility.php"
        update_creating_soldiers document.getElementById("container").innerHTML

