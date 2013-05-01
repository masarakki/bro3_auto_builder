var fontstyle = "bold 10px 'ＭＳ ゴシック'";

var DEBUG = false;

var COLOR_FRAME = "#333333";    // 枠背景色
var COLOR_BASE  = "#654634";    // 拠点リンク色
var COLOR_TITLE = "#FFCC00";    // 各BOXタイトル背景色
var COLOR_BACK  = "#FFF2BB";    // 各BOX背景色

var DomesticFlg = false;

// 造兵用
var OPT_SOL_MAX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_SOL_ADD = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_BLD_WOOD  = 0;
var OPT_BLD_STONE = 0;
var OPT_BLD_IRON  = 0;
var OPT_BLD_RICE  = 0;
var OPT_BLD_SOL = 0;
var sort_priority = [];
var OPT_BKBG_CHK = 0;
var make_no = [];
// 兵種,       No,研究済,作成可能兵数,現在の兵数,最大兵数,現兵数との差,x,y
make_no["剣兵"]     = ["剣兵"    ,301,     0,           0,         0,       0,          0,0,0];
make_no["槍兵"]     = ["槍兵"    ,303,     0,           0,         1,       0,          0,0,0];
make_no["弓兵"]     = ["弓兵"    ,308,     0,           0,         2,       0,          0,0,0];
make_no["騎兵"]     = ["騎兵"    ,305,     0,           0,         3,       0,          0,0,0];
make_no["矛槍兵"]   = ["矛槍兵"  ,304,     0,           0,         4,       0,          0,0,0];
make_no["弩兵"]     = ["弩兵"    ,309,     0,           0,         5,       0,          0,0,0];
make_no["近衛騎兵"] = ["近衛騎兵",307,     0,           0,         6,       0,          0,0,0];
make_no["斥候"]     = ["斥候"    ,310,     0,           0,         7,       0,          0,0,0];
make_no["斥候騎兵"] = ["斥候騎兵",311,     0,           0,         8,       0,          0,0,0];
make_no["衝車"]     = ["衝車"    ,312,     0,           0,         9,       0,          0,0,0];
make_no["投石機"]   = ["投石機"  ,313,     0,           0,        10,       0,          0,0,0];

OPT_BK_LV = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
OPT_BG_LV = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//巡回用
var tidMain2;
var tidMain3;
var nextURL;
var nextNAME;
//寄付用
var OPT_RISE_KIFU_MAX = 10000; //寄付を開始する糧の量
var OPT_RISE_KIFU = 1000; //寄付をする糧の量

//
//市場用
var OPT_RISE_MAX = 30000; //市場変換開始する糧の量
var OPT_TO_WOOD = 10000; //木に変換する糧
var OPT_TO_STONE = 10000; //石に変換する糧
var OPT_TO_IRON = 10000; //鉄に変換する糧

//グローバル変数
var MOUSE_DRAGGING = false;
var MOUSE_OFFSET_X;
var MOUSE_OFFSET_Y;
var MOUSE_DRAGGING_WINDOW = 0;
var ALERT_TIME;

var OPT_MAX_WOOD = 0;           // 木の最大保持量
var OPT_MAX_STONE = 0;      // 石の最大保持量
var OPT_MAX_IRON = 0;           // 鉄の最大保持量
var WOOD = 101; //木の内部コード
var STONE = 102; //石の内部コード
var IRON = 103; //鉄の内部コード
var RICE = 104; //糧の内部コード

//新規作成用
var OPT_KATEMURA = 0; //自動糧村化オプション
var OPT_SHIGEN = 0;
var OPT_TORIDE = 0; //自動砦化オプション
var OPT_SOUKO_MAX = 1; //倉庫の最大数

//内政用 by nottisan
//                                1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4
//              1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0
var OPT_DOME = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_BLD = "AC";
var OPT_SorH = "DD";
var OPT_MAX = 3;
var OPT_MAXLV = 6;
var OPT_ROUND_TIME1 = 60;   // 巡回時間(sec)
var OPT_ROUND_TIME2 = 10;   // 巡回時間(sec)
var Reload_Flg = 0;
var OPT_BUILD_VID;


var INTERVAL  = 1000;
var INTERVAL2 = 2000;
var HOST = location.hostname;
var PGNAME = "_Auto_Bilder_5zen_v1.21_20120524";
var TIMEOUT_URL = "/false/login_sessionout.php";
var g_MD = "";

var SENDTFLG_TIMEOUT = 0;   //タイムアウト画面
var SENDTFLG_LOGIN_MENU = 1;    //ログイン画面
var SENDTFLG_LOGIN = 2;         //ログイン中
var d = document;

// 保存データデリミタ
var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var DELIMIT3 = "{=]";
var DELIMIT4 = "|-/";

//保存データインデックス（拠点）
var IDX_XY = 0; //座標
var IDX_BASE_NAME = 1; //拠点名
var IDX_URL = 2; //拠点URL
var IDX_ACTIONS = 3; //実行中作業
var IDX_BASE_ID = 11; //拠点ID
var INDEX_HASH = 24;

//保存データインデックス（実行中作業）
var IDX2_STATUS = 0; //ステータス
var IDX2_TIME = 1; //完了時刻
var IDX2_TYPE = 2; //種別 C:都市画面、D:内政スキル、Fxy:施設座標
var IDX2_ALERTED = 3; //通知済フラグ
var IDX2_DELETE = 4; // 削除フラグ
var IDX2_ROTATION = 5; // 巡回フラグ


//作業種別
var TYPE_CONSTRUCTION = "C"; //建設
var TYPE_MARCH = "M"; //行軍
var TYPE_DOMESTIC = "D"; //内政
var TYPE_FACILITY = "F"; //施設

var TYPE_DELETE = "B"; //建設

var OPT_CHKBOX_AVC = 0;
//                  拠 木 石 鉄 畑 倉 雀 武 防 練 槍 弓 騎 宿 車 市 訓 水 工 研 大 遠 見 平
//                  点             庫    器 具 兵 兵 兵 兵 舎 兵 場 練 車 場 究 宿 征 張 地
//                   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
var OPT_CHKBOX   = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var OPT_CHKBOXLV = [ 8,15,15,15,15,20,10,10,10,10,15,15,15,15,15,10,10,10,10,10,20,20,20, 0];
var OPT_MAX_LV = "2";
var OPT_FUC_NAME = ["拠点","伐採所","石切り場","製鉄所","畑","倉庫",
                    "銅雀台","鍛冶場","防具工場","練兵所","兵舎","弓兵舎",
                    "厩舎","宿舎","兵器工房","市場","訓練所","水車","工場",
                    "研究所","大宿舎","遠征訓練所","見張り台","平地"];

var OPT_FNID = new Array();
OPT_FNID["拠点"]       =  0;
OPT_FNID["伐採所"]     =  1;
OPT_FNID["石切り場"]   =  2;
OPT_FNID["製鉄所"]     =  3;
OPT_FNID["畑"]         =  4;
OPT_FNID["倉庫"]       =  5;
OPT_FNID["銅雀台"]     =  6;
OPT_FNID["鍛冶場"]     =  7;
OPT_FNID["防具工場"]   =  8;
OPT_FNID["練兵所"]     =  9;
OPT_FNID["兵舎"]       = 10;
OPT_FNID["弓兵舎"]     = 11;
OPT_FNID["厩舎"]       = 12;
OPT_FNID["宿舎"]       = 13;
OPT_FNID["兵器工房"]   = 14;
OPT_FNID["市場"]       = 15;
OPT_FNID["訓練所"]     = 16;
OPT_FNID["水車"]       = 17;
OPT_FNID["工場"]       = 18;
OPT_FNID["研究所"]     = 19;
OPT_FNID["大宿舎"]     = 20;
OPT_FNID["遠征訓練所"] = 21;
OPT_FNID["見張り台"]   = 22;

//市場変換処理用
var OPT_ICHIBA = 0;
var OPT_ICHIBA_PA = 0;
var OPT_ICHIBA_PATS = ["平均的に変換", "一括変換"];
//自動寄付用
var OPT_KIFU = 0;

var d = document;
var $ = function(id) {
    return d.getElementById(id);
};
var $x = function(xp, dc) {
    return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};
var $a = function(xp, dc) {
    var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var a = [];
    for (var i = 0; i < r.snapshotLength; i++) {
        a.push(r.snapshotItem(i));
    }
    return a;
};
var $e = function(e, t, f) {
    if (!e) return;
    e.addEventListener(t, f, false);
};

var $w = function(func, interval) {
    if (interval == undefined) {
        interval = INTERVAL;
    }
    return unsafeWindow.setTimeout(func, interval);
};

//新規作成リンク
var URL_fID = "fID"; //建物のID
var HATAKE = 215;

var SOUKO = 233;
var SUZUME = 216;

var FACLINK = function(host, x, y) {
    return "http://" + host + "/facility/facility.php?x=" + x + "&y=" + y;
};

var VillageData = new Array();
var OPT_VILLAGE = new Array();

var isMixi = true;

var DASkill = [ "■■■■",
                "伐採知識","伐採技術","弓兵増強",
                "石切知識","石切技術","槍兵増強",
                "製鉄知識","製鉄技術","騎兵増強",
                "食糧知識","食糧技術",
                "農林知識","農林技術",
                "加工知識","加工技術",
                "富国","富国論","富国強兵",
                "豊穣","美玉歌舞",
                "恵風","人選眼力",
                "呉の治世","王佐の才",
                "練兵訓練","練兵修練",
                "兵舎訓練","兵舎修練",
                "弓兵訓練","弓兵修練",
                "厩舎訓練","厩舎修練",
                "兵器訓練","兵器修練"
              ];

// 市場変換用
var ShopURL = "";
var ShopFlg = false;

var DBG_Flg = false;

var reopen = function() {
    openIniBilderBox();
};

main();

function log() {
    unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments));
};

function debugLog(mes) {
    if (DEBUG) {
        console.log(mes);
    }
};

jQuery(document).ready(function () {
  var css = GM_getResourceText("style");
  GM_addStyle(css);
});

//拠点作成開始
function settleVillages(z) {
    //名声チェック
    var is_village_buildable = function () {
        var max_famous = global_status.max_famous;

        //拠点作成に必要な名声
        var bldtbl = [17, 35, 54, 80, 112, 150, 195, 248, 310, 999];
        var villageLength = $a('//ul/li/a[contains(@href,"/village_change.php?village_id")]').length; //拠点数-1になる

        //作成中の拠点の数
        var lists = cloadData(HOST + "ReserveList", "[]", true, true);
        var x = 0;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].status == 2) {
                x++;
            }
        }
        return (max_famous >= bldtbl[villageLength + x]);
    };

    var failSettleVillage = function(z) {
        var lists = cloadData(HOST + "ReserveList", "[]", true, true);
        if (lists[z].status == 1) {
            lists[z].status = 0;
        }
        csaveData(HOST + "ReserveList", lists, true, true);
    };

    //新規拠点作成に必要な名声があれば拠点作成
    if (is_village_buildable()) {
        //予約データ取得
        var lists = cloadData(HOST + "ReserveList", "[]", true, true);
        if (lists.length == 0 || z >= lists.length) {
            return;
        }
        if (lists[z].status != 1 && lists[z].status != 0) {
            settleVillages(z+1);
        } else {
            $w(function() {
                   build_village(list[z].x, list[z].y, list[z].kind, function() {
                                     failSettleVillage(z);
                                     settleVillages(z+1);
                                 });
               });
        }
    }
}

function checkVillageLength() {
    var lists = cloadData(HOST+"ReserveList", "[]", true, true);
    lists = checkList(lists);

    function checkList(lists) {
        //時刻チェック
        var dt = new Date();
        var ntime = dt.getFullYear() + "-" +
            (dt.getMonth()+101).toString().substr(-2) + "-" +
            (dt.getDate()+100).toString().substr(-2) + " " +
            (dt.getHours()+100).toString().substr(-2)  + ":" +
            (dt.getMinutes()+100).toString().substr(-2)  + ":" +
            (dt.getSeconds()+100).toString().substr(-2);
        //リストのデータを書き換え
        var flg = 0;
        for (var i = 0 ; i < lists.length; i++) {
            if (lists[i].time < ntime) {
                if (lists[i].status == 4) {
                    lists[i].status = 5;
                    flg = 1;
                }
                if (lists[i].status == 2) {
                    lists[i].status = 3;
                    flg = 1;
                }
            }
        }
        csaveData(HOST + "ReserveList", lists, true, true);
        //拠点情報を取得＆移動
        if (flg == 1) {
            getUserProfJumpNewVillage();
        } else {
            checkVillageLengthDiff();
        }
        return lists;
    }

    function getUserProfJumpNewVillage() {
        $w(function() {
               GM_xmlhttpRequest({
                                     method:"GET",
                                     url:"http://" + HOST + "/user/",
                                     headers:{"Content-type":"text/html"},
                                     overrideMimeType:'text/html; charset=utf-8',
                                     onload: function(x) {
                                         var htmldoc = document.createElement("html");
                                         htmldoc.innerHTML = x.responseText;
                                         //拠点リストを更新
                                         getUserProf(htmldoc);
                                         if (is_stay_mode()) {
                                             reopen();
                                         }
                                         //本拠地に強制ジャンプ
                                         var villages = loadVillages(HOST+PGNAME);
                                         var tid = $w(function() {
                                                          location.href = villages[0][IDX_URL];
                                                      });
                                     }
                                 });
           });
    }

    //拠点数が変わっていたら情報取得 @@1@@
    function checkVillageLengthDiff() {

        debugLog("=== Start checkVillageLengthDiff ===");

        var villages = loadVillages(HOST+PGNAME);
        //      var villageLength = document.evaluate('//div[@id="lodgment"]/div/ul/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); //拠点数

        // 2012.04.25 本鯖対応
        var villageLength = $a('//ul/li/a[contains(@href,"/village_change.php?village_id")]').length + 1; //拠点数

        //if (villages.length != villageLength.snapshotLength) {
        if (villages.length != villageLength) {
            $w(function() {
                   GM_xmlhttpRequest({
                                         method:"GET",
                                         url:"http://" + HOST + "/user/",
                                         headers:{"Content-type":"text/html"},
                                         overrideMimeType:'text/html; charset=utf-8',
                                         onload: function(x) {
                                             var htmldoc = document.createElement("html");
                                             htmldoc.innerHTML = x.responseText;
                                             getUserProf(htmldoc);
                                             if (is_stay_mode()) {
                                                 reopen();
                                             }
                                             $w(function() {
                                                    location.reload();
                                                });
                                         }
                                     });
               });
        }
    }
}

function csaveData(key, value, local, ev) {
    if (local) {
        key = location.hostname + key  + PGNAME;
    }
    if (ev) {
        if (window.opera || typeof JSON != 'object') {
            value = toJSON(value);
        } else {
            value = JSON.stringify(value);
        }
    }
    GM_setValue(key, value);
}

function cloadData(key, value, local, ev) {
    if (local) {
        key = location.hostname + key  + PGNAME;
    }
    var ret = GM_getValue(key, value);
    return ev ? eval('ret=' + ret) : ret;
}

function getAddingVillage(htmldoc) {
    var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
                                   htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var xy = xyElem.snapshotItem(0).innerHTML.match(/(-?\d+,-?\d+)/);
    var Temp = xy[0].split(",");
    var x = Temp[0];
    var y = Temp[1];

    var rmname = htmldoc.innerHTML.match(/(現在村を建設中です|現在砦を建設中です)/);
    if (rmname) {
        var rmtime = htmldoc.innerHTML.match(/(\d+-\d+-\d+ \d+:\d+:\d+)*に完了します。/);
        if (rmname[1] == "現在村を建設中です") {
            addList(rmtime[1], 220, 2, x, y);
        } else if (rmname[1] == "現在砦を建設中です") {
            addList(rmtime[1], 222, 2, x, y);
        }
    }

    if (htmldoc == document.body) {
        addLink2();
    }

    function addList(tim, kind, status, x, y) {
        var lists = cloadData(HOST+"ReserveList", "[]", true, true);

        var flg = 0;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y) {
                lists[i].time = tim;
                lists[i].kind = kind;
                lists[i].status = status;
                flg = 1;
            }
        }
        if (flg == 0) {
            lists.push({"x": x, "y": y, "time": tim, "kind": kind, "status": status});
        }
        lists.sort(function(a,b) {
                       if (a.time > b.time) return 1;
                       if (a.time < b.time) return -1;
                       return 0;
                   });

        csaveData(HOST + "ReserveList", lists, true, true);
    }

    function addLink() {
        //id="tMenu"にLinkを挿入
        var tMenu = document.evaluate('//*[@id="tMenu"]',
                                      htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (tMenu.snapshotLength == 0) return;

        //村作成予約
        var villageLink = document.createElement("a");
        villageLink.id = "village";
        villageLink.href = "javascript:void(0);";
        villageLink.innerHTML = "村建設予約";
        villageLink.addEventListener("click", function() {
                                         addReserveVillages(220);
                                     }, true);
        tMenu.snapshotItem(0).appendChild(villageLink);

        //砦作成予約
        var fortLink = document.createElement("a");
        fortLink.id = "fort";
        fortLink.href = "javascript:void(0);";
        fortLink.innerHTML = "砦建設予約";
        fortLink.addEventListener("click", function() {
                                      addReserveVillages(222);
                                  }, true);
        tMenu.snapshotItem(0).appendChild(fortLink);

    }

    function addLink2() {

        //id="tMenu"にLinkを挿入
        var tMenu = document.evaluate('//div[@class="status"]',
                                      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (tMenu.snapshotLength == 0) {
            var tMenu = document.evaluate('//div[@id="basepoint"]',
                                          document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (tMenu.snapshotLength == 0) return;
        }

        var villageLink = document.createElement("span");
        villageLink.style.color = "white";
        villageLink.style.fontSize = "10px";
        villageLink.style.textAlign = "center";
        villageLink.innerHTML = "建設予約  ";
        tMenu.snapshotItem(0).appendChild(villageLink);

        //村作成予約
        var villageLink = document.createElement("a");
        villageLink.id = "village";
        villageLink.style.color = "white";
        villageLink.style.fontSize = "10px";
        villageLink.style.textAlign = "center";
        villageLink.href = "javascript:void(0);";
        villageLink.innerHTML = "村";
        villageLink.addEventListener("click", function() {
                                         addReserveVillages(220);
                                     }, true);
        tMenu.snapshotItem(0).appendChild(villageLink);

        var villageLink = document.createElement("span");
        villageLink.style.color = "white";
        villageLink.style.fontSize = "10px";
        villageLink.style.textAlign = "center";
        villageLink.innerHTML = "  ";
        tMenu.snapshotItem(0).appendChild(villageLink);

        //砦作成予約
        var fortLink = document.createElement("a");
        fortLink.id = "fort";
        fortLink.style.color = "white";
        fortLink.style.fontSize = "10px";
        fortLink.style.textAlign = "center";
        fortLink.href = "javascript:void(0);";
        fortLink.innerHTML = "砦";
        fortLink.addEventListener("click", function() {
                                      addReserveVillages(222);
                                  }, true);
        tMenu.snapshotItem(0).appendChild(fortLink);

    }

    function addReserveVillages(kind) {
        url = location;
        var flgAdd = addList2(kind, 1, URL_PARAMS.x, URL_PARAMS.y);
        var msg = "";
        if (flgAdd == 0) {
            msg += "(" + URL_PARAMS.x + "," + URL_PARAMS.y + ")への、";
            if (kind == 220) {
                msg += "村建設予約";
            } else if (kind == 222) {
                msg += "砦建設予約";
            }
            msg += "を受け付けました。";
        } else {
            msg += "(" + URL_PARAMS.x + "," + URL_PARAMS.y + ")には、すでに建設予約があります。";
        }
        alert(msg);
        if (is_stay_mode()) {
            reopen();
        }
    }

    function addList2(kind, status, x, y) {
        var lists = cloadData(HOST + "ReserveList", "[]", true, true);

        var dt = new Date();
        var ntime = dt.getFullYear() + "-" +
            (dt.getMonth()+101).toString().substr(-2) + "-" +
            (dt.getDate()+100).toString().substr(-2) + " " +
            (dt.getHours()+100).toString().substr(-2)  + ":" +
            (dt.getMinutes()+100).toString().substr(-2)  + ":" +
            (dt.getSeconds()+100).toString().substr(-2);

        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y) {
                return;
            }
        }
        lists.push({"x":x, "y":y, "time":ntime, "kind":kind, "status":status });
        lists.sort(function(a, b) {
                       if (a.time > b.time) return 1;
                       if (a.time < b.time) return -1;
                       return 0;
                   });

        csaveData(HOST+"ReserveList", lists, true, true);

        return 0;
    }
}

//拠点画面で建設予約受付
function addLinkTondenVillage() {

    var xyElem = document.evaluate('//span[@class="xy"]',
                                   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var xy = xyElem.snapshotItem(0).innerHTML.match(/(-?\d+,-?\d+)/);
    var Temp = xy[0].split(",");
    var x = Temp[0];
    var y = Temp[1];

    addLink();

    function addLink() {

        //id="tMenu"にLinkを挿入
        var tMenu = document.evaluate('//div[@class="status village-bottom"]',
                                      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (tMenu.snapshotLength == 0) return;

        var villageLink = document.createElement("span");
        villageLink.innerHTML = " 建設予約  ";
        tMenu.snapshotItem(0).appendChild(villageLink);

        //村作成予約
        var villageLink = document.createElement("a");
        villageLink.id = "village";
        villageLink.href = "javascript:void(0);";
        villageLink.innerHTML = "村";
        villageLink.addEventListener("click", function() {
                                         addReserveVillages(220);
                                     }, true);
        tMenu.snapshotItem(0).appendChild(villageLink);

        var villageLink = document.createElement("span");
        villageLink.innerHTML = "  ";
        tMenu.snapshotItem(0).appendChild(villageLink);

        //砦作成予約
        var fortLink = document.createElement("a");
        fortLink.id = "fort";
        fortLink.href = "javascript:void(0);";
        fortLink.innerHTML = "砦";
        fortLink.addEventListener("click", function() {
                                      addReserveVillages(222);
                                  }, true);
        tMenu.snapshotItem(0).appendChild(fortLink);
    }

    function addReserveVillages(kind) {
        url = location;
        var flgAdd = addList2(kind, 1, x, y);
        var msg = "";
        if (flgAdd == 0) {
            msg += "(" + x + "," + y + ")への、";
            if (kind == 220) {
                msg += "村建設予約";
            } else if (kind == 222) {
                msg += "砦建設予約";
            }
            msg += "を受け付けました。";
        } else {
            msg += "(" + x + "," + y + ")には、すでに建設予約があります。";
        }
        alert(msg);
        if (is_stay_mode()) {
            reopen();
        }
    }

    function addList2(kind, status, x, y) {
        var lists = cloadData(HOST+"ReserveList", "[]", true, true);

        var dt = new Date();
        var ntime = dt.getFullYear() + "-" +
            (dt.getMonth()+101).toString().substr(-2) + "-" +
            (dt.getDate()+100).toString().substr(-2) + " " +
            (dt.getHours()+100).toString().substr(-2)  + ":" +
            (dt.getMinutes()+100).toString().substr(-2)  + ":" +
            (dt.getSeconds()+100).toString().substr(-2);

        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y && (lists[i].status == 0 || lists[i].status == 1)) {
                return;
            }
        }
        lists.push({"x":x, "y":y, "time":ntime, "kind":kind, "status":status });
        lists.sort(function(a, b) {
                       if (a.time > b.time) return 1;
                       if (a.time < b.time) return -1;
                       return 0;
                   });

        csaveData(HOST+"ReserveList", lists, true, true);

        return 0;
    }

}

//拠点画面なら拠点削除データ取得
function getDeletingVillage(htmldoc) {
    var xy = getMyXY();
    var Temp = xy.split(",");
    var x = Temp[0];
    var y = Temp[1];

    var rmtime = htmldoc.innerHTML.match(/(村を削除中です。|砦を削除中です。)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
    if (rmtime) {
        if (rmtime[1] == "村を削除中です。") {
            addList(rmtime[2], 220, 4, x, y);
        } else if (rmtime[1] == "砦を削除中です。") {
            addList(rmtime[2], 222, 4, x, y);
        }
    } else {
        delList(1, x, y);
    }
    if (is_stay_mode()) {
        reopen();
    }

    function addList(tim, kind, status, x, y) {
        var lists = cloadData(HOST + "ReserveList", "[]", true, true);

        var flg = 0;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y && (lists[i].status != 0 && lists[i].status != 1 && lists[i].status != 2)) {
                lists[i].time = tim;
                lists[i].kind = kind;
                lists[i].status = status;
                flg = 1;
            }
        }
        if (flg == 0) {
            lists.push({"x": x, "y": y, "time": tim, "kind": kind, "status": status});
        }
        lists.sort(function(a, b) {
                       if (a.time > b.time) return 1;
                       if (a.time < b.time) return -1;
                       return 0;
                   });

        csaveData(HOST + "ReserveList", lists, true, true);
    }

    function delList(kind, x, y) {
        var lists = cloadData(HOST + "ReserveList", "[]", true, true);

        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y) {
                if (lists[i].status == 4 && kind == 1) {
                    lists.splice(i,1);
                    csaveData(HOST + "ReserveList", lists, true, true);
                    break;
                }
            }
        }
    }
}

function DeleteFacility(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    var village = new Village();
    village.at(x, y).destroy();
}

function autoLvup() {
    debugLog("=== Start autoLvup ===");

    var cost_bk_ken=[
        [ 165,  135,   0,  0, 6600],
        [ 251,  319,   0,  0, 8910],
        [ 184,  596,   0,303,11220],
        [ 351,  994,   0,604,13200],
        [ 431,  828,2054,  0,15180],
        [ 159,  848,4294,  0,17820],
        [1397, 2301,4519,  0,19140],
        [1019, 4458,7260,  0,21120],
        [   0,11558,3572,  0,23100],
        [   0,19648,6073,  0,25080],
        [   0,    0,   0,  0,    0]
    ];
    // 槍兵
    var cost_bk_yari=[
        [ 1820,  3575,    0,1105,13500],
        [ 3640,  7150,    0,2210,18225],
        [    0, 12870, 6552,3978,22950],
        [    0, 21879,11138,6763,27000],
        [10820, 35006,17821,   0,31050],
        [16230, 52510,26732,   0,36450],
        [22722, 73514,37425,   0,39150],
        [30675, 99243,50524,   0,43200],
        [39878,129016,65681,   0,47250],
        [51841,167721,85385,   0,51300],
        [    0,     0,    0,   0,    0]
    ];
    // 矛槍兵
    var cost_bk_hoko=[
        [ 14000,  27500,      0, 8500,18600],
        [ 28000,  55000,      0,17000,25380],
        [     0, 104500,  53200,32300,31620],
        [     0, 188100,  95760,58140,37200],
        [ 98838, 319770, 162792,    0,42700],
        [158141, 511632, 260467,    0,50220],
        [237211, 767448, 390701,    0,53940],
        [332096,1074427, 546981,    0,59520],
        [431724,1396755, 711075,    0,65100],
        [647587,2095133,1066613,    0,70680],
        [     0,      0,      0,    0,    0]
    ];
    // 弓兵
    var cost_bk_yumi=[
        [  3795,    0, 1173,1932,13500],
        [  7590,    0, 2346,3864,18225],
        [ 13662,    0, 6995,4223,22950],
        [ 23225,    0,11824,7179,27000],
        [ 37161,11486,18918,   0,31050],
        [ 55741,17229,28377,   0,36450],
        [ 78038,39728,24121,   0,39150],
        [105351,53633,32563,   0,43200],
        [122015,49802,77193,   0,47250],
        [178043,55031,90640,   0,51300],
        [     0,    0,    0,   0,    0]
    ];
    // 弩兵
    var cost_bk_dokyu=[
        [  30250,     0,   9350,15400,18600],
        [  60500,     0,  18700,30800,25110],
        [ 114950,     0,  58520,35530,31620],
        [ 206910,     0, 105336,63954,37200],
        [ 351747,108722, 179071,    0,42780],
        [ 562795,173955, 286514,    0,50220],
        [ 844193,429771, 260932,    0,53940],
        [1181870,601679, 365305,    0,59520],
        [1368820,558720, 865988,    0,65100],
        [2320010,717094,1181096,    0,70680],
        [      0,     0,      0,    0,    0]
    ];
    // 騎兵
    var cost_bk_uma=[
        [1241,2044,4015,0,13500],
        [2482,4088,8030,0,17313],
        [4468,0,14454,7358,22950],
        [7595,0,24572,12509,27000],
        [12152,0,39315,20015,31040],
        [0,18228,58973,30022,36450],
        [0,42031,82562,25519,39150],
        [0,56742,111458,34451,43200],
        [0,73765,144895,44786,47250],
        [0,95894,188364,58222,51300],
        [0,0,0,0,0]
    ];
    // 近衛騎兵
    var cost_bk_konoe=[
        [10200,16800,33000,0,18600],
        [20400,33600,66000,0,25110],
        [38760,0,125400,63840,31620],
        [69768,0,225720,114912,37200],
        [76745,0,488376,132559,14400],
        [0,189769,613958,312561,50220],
        [0,468841,920938,284653,53940],
        [0,656377,1289313,398515,59520],
        [0,853291,1676107,518069,65100],
        [0,1279936,2514161,777104,70680],
        [0,0,0,0,0]
    ];
    // 衝車
    var cost_bk_kuruma=[
        [6600,2040,3360,0,17000],
        [13200,4080,6720,0,22950],
        [23760,7344,12096,0,28900],
        [40392,12485,20536,0,34000],
        [64627,19976,32901,0,39100],
        [96941,29964,49352,0,45900],
        [135717,41949,69092,0,49300],
        [183218,56631,93274,0,54400],
        [238183,73620,121257,0,59500],
        [359657,111167,183098,0,64600],
        [0,0,0,0,0]
    ];
    // 投石機
    var cost_bk_stone=[
        [11050,35750,18200,0,24000],
        [22100,71500,36400,0,32400],
        [41990,135850,69160,0,40800],
        [75582,244530,124488,0,48000],
        [128489,415701,211630,0,55200],
        [205583,665122,338607,0,64800],
        [308375,997682,507911,0,69600],
        [431724,1396755,711075,0,76800],
        [561242,1815782,924398,0,0],        // 時間のみ未確定
        [729614,2360517,1201718,0,91200],   // 25時間20分 鍛冶場Lv10(55%)にて13時間56分
        [0,0,0,0,0]
    ];
    // 防具工場テーブル ========================================================
    // 剣兵
    var cost_bg_ken=[
        [149,122,0,0,6600],
        [228,285,0,0,8910],
        [168,534,0,273,11220],
        [310,900,0,544,13200],
        [373,745,1864,0,15180],
        [539,1431,2801,0,17820],
        [1265,2063,4067,0,19140],
        [1949,6304,3209,0,21120],
        [0,10288,3253,5371,23100],
        [0,17683,5466,9002,25080],
        [0,0,0,0,0]
    ];
    // 槍兵
    var cost_bg_yari=[
        [1638,3218,0,995,13500],
        [3276,6435,0,1989,18225],
        [0,11583,5897,3580,22950],
        [0,19691,10025,6086,27000],
        [9738,31506,16039,0,31050],
        [14607,47259,24059,0,36450],
        [20450,66162,33683,0,39150],
        [27608,89319,45471,0,43200],
        [35890,116115,59113,0,0],
        [46657,150949,76847,0,51300],
        [0,0,0,0,0]
    ];
    // 矛槍兵
    var cost_bg_hoko=[
        [12600,24750,0,7650,18600],
        [25200,49500,0,15300,25110],
        [0,94050,47880,29070,31620],
        [0,169290,86184,52326,37200],
        [0,0,0,0,42780],                // データなし
        [0,0,0,0,50220],                // データなし
        [0,0,0,0,53940],                // データなし
        [0,0,0,0,59520],                // データなし
        [0,0,0,0,65100],                // データなし
        [0,0,0,0,0],                    // データなし
        [0,0,0,0,0]
    ];
    // 弓兵
    var cost_bg_yumi=[
        [3416,0,1056,1739,13500],
        [6831,0,2111,3478,22950],
        [12296,0,6260,3801,27000],
        [20903,0,10641,6461,31050],
        [33445,10337,17026,0,36450],
        [0,0,0,0,39150],                // データなし
        [0,0,0,0,43200],                // データなし
        [0,0,0,0,47250],                // データなし
        [0,0,0,0,51300],                // データなし
        [0,0,0,0,55350],                // データなし
        [0,0,0,0,0]
    ];
    // 弩級
    var cost_bg_dokyu=[
        [27225,0,8415,13860,18600],
        [54450,0,16830,27720,25110],
        [103455,0,52668,31977,31620],
        [0,0,0,0,37200],                // データなし
        [316572,97850,161164,0,42780],
        [506516,156559,257863,0,50220],
        [759774,386794,234839,0,53940],
        [0,0,0,0,59520],                // データなし
        [0,0,0,0,65100],                // データなし
        [0,0,0,0,70680],                // データなし
        [0,0,0,0,0]
    ];
    // 騎兵
    var cost_bg_uma=[
        [1117,1840,3614,0,13500],
        [2234,3679,7227,0,18225],
        [4021,0,13009,6623,22950],
        [6835,0,22115,11258,27000],
        [10937,0,35384,18013,31050],
        [0,16405,53075,27020,36450],
        [0,37828,74305,22967,43200],
        [0,0,0,0,47250],                // データなし
        [0,0,0,0,51300],                // データなし
        [0,0,0,0,0],                    // データなし
        [0,0,0,0,0]
    ];
    // 近衛騎兵
    var cost_bg_konoe=[
        [9180,15120,29700,0,18600],
        [6156,10134,19908,0,25110],
        [7830,0,25344,12900,31620],
        [8952,0,28962,14742,37200],
        [20979,0,67878,34560,42780],
        [0,27279,88245,44919,50220],
        [0,78324,153852,47556,53940],
        [0,590740,1160381,358663,59520],    // 16時間32分 防具工場Lv3(90%)にて14時間52分48秒
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0]
    ];
    // 斥候
    var cost_bg_sek=[
        [1638,995,0,3218,6600],
        [3276,1989,0,6435,8910],
        [6224,3779,0,12227,11220],
        [0,6802,11204,22008,13200],
        [0,11564,19047,37413,15180],
        [0,18502,30475,59861,17820],
        [27754,0,45712,89791,19140],
        [38855,0,63997,125708,21120],
        [50512,0,83916,163420,23100],
        [65665,0,108154,212446,25080],
        [0,0,0,0,0]
    ];
    // 斥候騎兵
    var cost_bg_sekuma=[
        [9180,15120,29700,0,18600],
        [6156,10134,19908,0,25110],
        [7830,0,25344,12900,31620],
        [8952,0,28962,14742,37200],
        [20979,0,67878,34560,42780],
        [0,27279,88245,44919,50220],
        [0,78324,153852,47556,53940],
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0]
    ];
    // 衝車
    var cost_bg_kuruma=[
        [5940,1836,3024,0,17000],
        [11880,3672,6048,0,22950],
        [21384,6610,10886,0,0],     // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0],                // データなし
        [0,0,0,0,0]
    ];
    // 投石機
    var cost_bg_stone=[
        [9945,32175,16380,0,24000],
        [19890,64350,32760,0,32400],
        [37791,122265,62244,0,40800],
        [0,0,0,0,48000],                // データなし
        [0,0,0,0,0],                    // データなし
        [205583,665122,338607,0,0],     // データなし
        [0,0,0,0,0],                    // データなし
        [388552,1257080,639968,0,0],    // データなし
        [505118,1634204,831958,0,0],    // データなし
        [656653,2124465,1081546,0,0],   // データなし
        [0,0,0,0,0]
    ];

    var costs = [];
    costs["鍛冶場剣兵"]        = cost_bk_ken;
    costs["鍛冶場槍兵"]        = cost_bk_yari;
    costs["鍛冶場矛槍兵"] = cost_bk_hoko;
    costs["鍛冶場弓兵"]        = cost_bk_yumi;
    costs["鍛冶場弩兵"]        = cost_bk_dokyu;
    costs["鍛冶場騎兵"]        = cost_bk_uma;
    costs["鍛冶場近衛騎兵"]  = cost_bk_konoe;
    costs["鍛冶場衝車"]        = cost_bk_kuruma;
    costs["鍛冶場投石機"] = cost_bk_stone;

    costs["防具工場剣兵"]     = cost_bg_ken;
    costs["防具工場槍兵"]     = cost_bg_yari;
    costs["防具工場矛槍兵"]      = cost_bg_hoko;
    costs["防具工場弓兵"]     = cost_bg_yumi;
    costs["防具工場弩兵"]     = cost_bg_dokyu;
    costs["防具工場騎兵"]     = cost_bg_uma;
    costs["防具工場近衛騎兵"]   = cost_bg_konoe;
    costs["防具工場斥候"]     = cost_bg_sek;
    costs["防具工場斥候騎兵"]   = cost_bg_sekuma;
    costs["防具工場衝車"]     = cost_bg_kuruma;
    costs["防具工場投石機"]      = cost_bg_stone;

    var make_loop = function(loop) {
        if (loop == 2) {
            return;
        } else {
            if (loop == 0) {
                var type = "鍛冶場";
            }
            if (loop == 1) {
                var type = "防具工場";
            }
            if (OPT_BKBG_CHK == 0) {
                return;
            }

            var UnitID = [];

            UnitID["剣兵"]        = [301];
            UnitID["槍兵"]        = [303];
            UnitID["矛槍兵"] = [304];
            UnitID["騎兵"]        = [305];
            UnitID["近衛騎兵"]  = [307];
            UnitID["弓兵"]        = [308];
            UnitID["弩兵"]        = [309];
            UnitID["斥候"]        = [310];
            UnitID["斥候騎兵"]  = [311];
            UnitID["衝車"]        = [312];
            UnitID["投石機"] = [313];

            var _x = -1;
            var _y = -1;
            var _lv = -1;

            var area = new Array();
            area = get_area();

            for (var i = 0; i < area.length; i++) {
                if (area[i].name == type) {
                    var Temp = area[i].xy.split(",");
                    _x = Temp[0];
                    _y = Temp[1];
                    _lv = area[i].lv;
                }
            }
            if (_x < 0) {
                return;
            }
            $w(function() {
                   var mURL = FACLINK(HOST, _x, _y);
                   GM_xmlhttpRequest(
                       {
                           method: "GET",
                           url: mURL,
                           headers: {
                               "Content-type": "text/html"
                           },
                           overrideMimeType: 'text/html; charset=utf-8',
                           onload: function(x) {
                               var htmldoc = document.createElement("html");
                               htmldoc.innerHTML = x.responseText;
                               // 鍛冶場・防具工場情報の取得
                               if (is_stay_mode()) {
                                   reopen();
                               }

                               var actionsElem  = document.evaluate('//th[@class="mainTtl6"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                               var actionsElem2 = document.evaluate('//b[contains(@class,"f14")]',       htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                               var actionsElem3 = document.evaluate('//td[@class="center"]'   ,htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                               var actionsElem4 = document.evaluate('//td[@class="cost"]'   ,htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

                               var htmldoc2 = document.createElement("html");

                               var actionsElem7  = document.evaluate('//*[@colspan="4"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

                               var Buki = Array();
                               var x = -1;

                               if (htmldoc.innerHTML.lastIndexOf("を強化する") != -1) {
                                   for (var i = 0; i < actionsElem2.snapshotLength; i++) {
                                       var BG_Name = actionsElem.snapshotItem(i+1).innerHTML;
                                       var BG_LvNm = actionsElem2.snapshotItem(i).innerHTML.substring(actionsElem2.snapshotItem(i).innerHTML.lastIndexOf("&nbsp;&nbsp;")+12);
                                       var BG_UID  = UnitID[BG_Name];
                                       var BG_Lv   = actionsElem2.snapshotItem(i).innerHTML.substring(3,actionsElem2.snapshotItem(i).innerHTML.lastIndexOf("&nbsp;")-6);

                                       var BG_WOOD  = costs[type + BG_Name][BG_Lv][0];
                                       var BG_STONE = costs[type + BG_Name][BG_Lv][1];
                                       var BG_IRON  = costs[type + BG_Name][BG_Lv][2];
                                       var BG_RICE  = costs[type + BG_Name][BG_Lv][3];
                                       var BG_TIME  = costs[type + BG_Name][BG_Lv][4];
                                       var BG_Go    = (actionsElem3.snapshotItem(i+1).innerHTML.lastIndexOf("を強化する") != -1);
                                       if (type == "鍛冶場") {
                                           var BG_GoLv  = OPT_BK_LV[ (UnitID[actionsElem.snapshotItem(i+1).innerHTML][0] - 300) ];
                                       } else {
                                           var BG_GoLv  = OPT_BG_LV[ (UnitID[actionsElem.snapshotItem(i+1).innerHTML][0] - 300) ];
                                       }
                                       if (checkBKLvup(BG_WOOD,BG_STONE,BG_IRON,BG_RICE,BG_Go,BG_Lv,BG_GoLv)) {
                                           x++;
                                           Buki[x] = [BG_Name,BG_Lv,BG_LvNm,BG_UID,BG_TIME];
                                       }
                                   }
                                   Buki.sort(function(a, b) {
                                                 if (a[4] > b[4]) return 1;
                                                 if (a[4] < b[4]) return -1;
                                                 return 0;
                                             });

                                   if (x != -1) {
                                       // 武器強化処理
                                       var c={};
                                       c['x'] = parseInt(_x);
                                       c['y'] = parseInt(_y);
                                       c['unit_id'] = parseInt(Buki[0][3]);
                                       jQuery.post("http://"+HOST+"/facility/facility.php?x=" + parseInt(_x) + "&y=" + parseInt(_y) + "#ptop",c,function() {});
                                   }
                               }
                               make_loop(loop + 1);

                               function checkBKLvup(hwood,hstone,hiron,hrice,hgo,hnlv,hslv) {

                                   var wood = parseInt($("wood").innerHTML, 10);
                                   var stone = parseInt($("stone").innerHTML, 10);
                                   var iron = parseInt($("iron").innerHTML, 10);
                                   var rice = parseInt($("rice").innerHTML, 10);


                                   if (parseInt(hnlv) >= parseInt(hslv)) { return false; }
                                   if ((parseInt(hwood)  + OPT_BLD_WOOD) > wood) { return false; }
                                   if ((parseInt(hstone) + OPT_BLD_STONE) > stone) { return false; }
                                   if ((parseInt(hiron)  + OPT_BLD_IRON) > iron) { return false; }
                                   if ((parseInt(hrice)  + OPT_BLD_RICE) > rice) { return false; }
                                   if (hgo == false) { return false; }

                                   return true;
                               }

                           }
                       });
               });
        }
    };
    make_loop(0);
}

function setVillageFacility() {
    var village = new Village();

    debugLog("=== Start setVillageFacility ===");

    var cnt = 0;
    var vID = "";

    var del = 0;
    var delX = 0;
    var delY = 0;

    //座標を取得
    var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    vId = trim(xyElem.snapshotItem(0).innerHTML);

    //建設情報を取得
    var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // 削除施設情報の取得
    for (var i = 0; i < actionsElem.snapshotLength; i++) {
        var paItem = actionsElem.snapshotItem(i);
        //ステータス
        var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (buildStatusElem.snapshotLength > 0) {
            cnt++;
            if (buildStatusElem.snapshotItem(0).parentNode.parentNode.textContent.indexOf("削除") >= 0) {
                if (buildStatusElem.snapshotItem(0).href.match(/.*\/.*(\d+).*(\d+)/)) {
                    delX = parseInt(RegExp.$1);
                    delY = parseInt(RegExp.$2);
                }
                del++;
            }
        }
    }


    for (var i = 0; i < actionsElem.snapshotLength; i++) {
        var paItem = actionsElem.snapshotItem(i);
        //ステータス
        var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (buildStatusElem.snapshotLength > 0) {
            //建物削除等に対応 2010.10.25 byおぜがづ
            for (var j = 0; j < buildStatusElem.snapshotLength; j++) {
                if (buildStatusElem.snapshotItem(j).parentNode.innerHTML.match(RegExp("(建設中|建設準備中)"))) {
                    //施設建設数
                    cnt++;
                }
            }
            //施設建設数
            //cnt++;
        }
    }

    Load_OPT(vId);  //LvUP対象の取得

    //建設予約ができるかどうか
    if ((cnt - del) >= 1) return;

    if (OPT_SHIGEN == 1) {
        village.build_shigen();
    }
    if (OPT_KATEMURA == 1) {
        var heichi = village.find('平地').length;
        var hatake = village.find('畑').length;
        var souko = village.find('倉庫').length;

        if (heichi > 0) {
            if (!village.has('銅雀台')) {
                heichi -= 1;
            }
            if (souko < OPT_SOUKO_MAX) {
                heichi -= (OPT_SOUKO_MAX - souko);
            }
            if (heichi > 0 && Chek_Sigen(new lv_sort("畑",0,"")) != 1) {
                village.build('畑');
                Reload_Flg = 0;
                return;
            } else if (souko < OPT_SOUKO_MAX && Chek_Sigen(new lv_sort("倉庫",0,"")) != 1) {
                village.build('倉庫');
                Reload_Flg = 0;
                return;
            } else if (village.enable_suzume() && Chek_Sigen(new lv_sort("銅雀台",0,"")) != 1) {
                village.build('銅雀台');
                Reload_Flg = 0;
                return;
            }
        }
    }

    var area = new Array();
    area = get_area();
    area.sort(cmp_areas);
    area.sort(cmp_lv);
    Reload_Flg = 0;

    // 拠点の状況を調査（削除中なら処理しない）
    jQuery.get("http://"+HOST+"/facility/facility.php?x=3&y=3#ptop", function(x) {
               var htmldoc = document.createElement("html");
               htmldoc.innerHTML = x;
               var rmtime = htmldoc.innerHTML.match(/(村を削除中です。|砦を削除中です。)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
               if (rmtime) {
                   // 削除中のため何もしない
                   return;
               }

               for (i = 0; i < area.length; i++) {
                   var tmpName1 = area[i].name;
                   switch (tmpName1) {
                   case "村":
                   case "城":
                   case "砦":
                       tmpName1  = "拠点";
                       chkFlg = 1;
                       break;
                   }

                   if (parseInt(area[i].lv) >= parseInt(OPT_CHKBOXLV[OPT_FNID[tmpName1]])) {
                       continue;
                   }
                   //指定Lv以上ならメインに戻る
                   //建築物名分回す
                   OPT_FUC_NAME.push("村", "城", "砦");
                   if (OPT_CHKBOX[0] == 1) {
                       OPT_CHKBOX.push(1,1,1);
                       OPT_CHKBOXLV.push(OPT_CHKBOXLV[0],OPT_CHKBOXLV[0],OPT_CHKBOXLV[0]);
                   } else {
                       OPT_CHKBOX.push(0,0,0);
                       OPT_CHKBOXLV.push(0,0,0);
                   }

                   for (var ii = 0; ii < OPT_FUC_NAME.length; ii++) {
                       //ソートしたLvの低い順に比較する
                       if (area[i].name == OPT_FUC_NAME[ii]) {
                           //建築指示が有るか確認する。
                           if (parseInt(OPT_CHKBOX[ii]) == 1) {
                               if (parseInt(area[i].lv) >= parseInt(OPT_CHKBOXLV[ii])) {
                                   break;
                               }

                               //建築に必要な資源が有るかどうかチェック
                               var ret = Chek_Sigen(area[i]);
                               if (ret == 1) {
                                   //30分後にリロードするかどうか
                                   Reload_Flg = 1;
                                   break;
                               }

                               var Temp = area[i].xy.split(",");
                               var c = {};
                               if ((del != 0) && (parseInt(Temp[0]) == delX) && (parseInt(Temp[1]) == delY)) {
                                   // 削除施設とレベルアップ施設が一致したらスキップ
                                   continue;
                               }
                               // 拠点以外のレベルアップ処理
                               c['x']=parseInt(Temp[0]);
                               c['y']=parseInt(Temp[1]);
                               c['village_id']=getVillageID(vId);
                               c['ssid']=jQuery.cookie('SSID');
                               jQuery.post("http://"+HOST+"/facility/build.php", c, function() {});
                               $w(function() {
                                      location.reload(false);
                                  });

                               GM_setValue(HOST+PGNAME+"OPT_BUILD_VID" , getVillageID(vId));
                               var nowTime = new Date();
                               Reload_Flg = 0;
                               return;
                           }
                       }
                   }
               }
           });


    if (Reload_Flg == 1) {
        $w(function() {
               location.reload();
           }, 60000);
    }
}

function setVillageFacility2() {
    var cnt = 0;
    var del = 0;
    var delX = 0;
    var delY = 0;
    var vID = "";
    //座標を取得
    var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
                                   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    vId = trim(xyElem.snapshotItem(0).innerHTML);

    //建設情報を取得
    var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li',
                                        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < actionsElem.snapshotLength; i++) {
        var paItem = actionsElem.snapshotItem(i);
        //ステータス
        var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a',
                                                paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (buildStatusElem.snapshotLength > 0) {
            //施設建設数
            cnt++;

            // 削除数カウント
            if (buildStatusElem.snapshotItem(0).parentNode.parentNode.textContent.indexOf("削除") >= 0) {
                if (buildStatusElem.snapshotItem(0).href.match(/.*\/.*(\d+).*(\d+)/)) {
                    delX = parseInt(RegExp.$1);
                    delY = parseInt(RegExp.$2);
                }
                del++;
            }
        }
    }

    var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var area = new Array();
    for (var i = 0, n = 0; i < results.snapshotLength; i++) {
        if (results.snapshotItem(i).alt.match(/(.*?)\s.*?(\d+)/)) {
            strURL = results.snapshotItem(i).href;
            area[n] = new lv_sort(RegExp.$1, RegExp.$2, getURLxy(strURL));
            n++;
        } else if (results.snapshotItem(i).alt == "平地") {
            // 平地の座標を拾う
            strURL = results.snapshotItem(i).href;
            area[n] = new lv_sort("平地", 0, getURLxy(strURL));
            n++;
        }
    }

    if (OPT_SorH == "DD") {
        //宿舎が処理対象の場合、エリアリストに練兵所(宿舎建設条件)があるかをチェック
        var cntv = 0;
        for (var i = 0; i < area.length; i++) {
            if (area[i].name == "練兵所") {
                cntv++;
                break;
            }
        }
        if (cntv == 0) return;
    }


    // 施設情報のレベルソート
    area.sort(cmp_lv2);
    Load_OPT(vId);  //LvUP対象の取得
    // 削除中かチェック
    if ((del == 0)) {
        // 削除中でなければ、削除できる施設があるか調べる ＠＠
        var TargetName = "";
        if (OPT_SorH == "DD") { TargetName = "宿舎"; }
        if (OPT_SorH == "HH") { TargetName = "畑"; }
        var TargetCount = 0;
        var BlankCount = 0;
        // 対象レベル以下の宿舎（畑）と平地の数をカウントする
        for (i = 0; i < area.length; i++) {
            if (area[i].name == TargetName && parseInt(area[i].lv) <= OPT_MAXLV) { TargetCount += 1; }
            if (area[i].name == "平地") { TargetCount += 1; }
        }
        if (TargetCount < OPT_MAX) {
            // 対象となる宿舎（畑）と平地の合計が指定数に満たない場合
            area.sort(cmp_lv);
            for (i = 0; i < area.length; i++) {
                if ((area[i].name == TargetName) && (parseInt(area[i].lv) >= OPT_MAXLV)) {
                    // 削除
                    var Temp = area[i].xy.split(",");
                    DeleteFacility(Temp[0], Temp[1]);
                    JSSleep(2);
                    Reload_Flg = 0;
                    return;
                }
            }
        } else {
            // 普通に削除処理を実行
            for (i = 0; i < area.length; i++) {
                if ((area[i].name == TargetName) && (parseInt(area[i].lv) == OPT_MAXLV)) {
                    // 削除
                    var Temp = area[i].xy.split(",");
                    DeleteFacility(Temp[0], Temp[1]);
                    JSSleep(2);
                    Reload_Flg = 0;
                    return;
                }
            }
        }
    }

    area.sort(cmp_lv2);
    //建設予約ができるかどうか
    if ((cnt - del) >= 1) return;

    // 平地建設条件がある場合、対象施設数がOPT_MAX以上かチェックする
    var yct = 0;

    if (OPT_SorH == "DD") {
        for (i = 0; i < area.length; i++) {
            if (area[i].name == "宿舎") {
                if (area[i].lv < (OPT_MAXLV + 1)) {
                    yct++;
                }
            }
        }
    }
    if (OPT_SorH == "HH") {
        for (i = 0; i < area.length; i++) {
            if (area[i].name == "畑") {
                if (area[i].lv < (OPT_MAXLV + 1)) {
                    yct++;
                }
            }
        }
    }

    Reload_Flg = 0;
    for (i = 0; i < area.length; i++) {
        if (OPT_SorH == "DD") {
            if ((area[i].name != "宿舎") && (area[i].name != "平地")) {
                // 平地と宿舎以外スキップ
                continue;
            }
        } else if (OPT_SorH == "HH") {
            if ((area[i].name != "畑") && (area[i].name != "平地")) {
                // 平地と畑以外スキップ
                continue;
            }
        }
        if (yct >= OPT_MAX) {
            if (OPT_SorH == "DD") {
                if (area[i].name != "宿舎") {
                    // 宿数がすでにOPT_MAX以上なら、平地は無視
                    continue;
                }
            }
            if (OPT_SorH == "HH") {
                if (area[i].name != "畑") {
                    // 畑数がすでにOPT_MAX以上なら、平地は無視
                    continue;
                }
            }
        }

        //建築物名分回す
        for (var ii = 0; ii < OPT_FUC_NAME.length; ii++) {
            //ソートしたLvの低い順に比較する
            if (area[i].name == OPT_FUC_NAME[ii]) {
                //建築に必要な資源が有るかどうかチェック
                var ret = Chek_Sigen(area[i]);
                if (ret == 1) {
                    //30分後にリロードするかどうか
                    Reload_Flg = 1;
                    break;
                }

                var Temp = area[i].xy.split(",");
                var c={};

                if ((del != 0) && (parseInt(Temp[0]) == delX) && (parseInt(Temp[1]) == delY)) {
                    // 削除施設とレベルアップ施設が一致したらスキップ
                    continue;
                }
                if (area[i].lv > (OPT_MAXLV - 1)) {
                    continue;
                }
                if (area[i].name != "平地") {
                    c['x']=parseInt(Temp[0]);
                    c['y']=parseInt(Temp[1]);
                    c['village_id']=getVillageID(vId);
                    c['ssid']=jQuery.cookie('SSID');
                    jQuery.post("http://"+HOST+"/facility/build.php", c, function() {});
                    $w(function() {
                           location.reload(false);
                       });
                } else {
                    if (OPT_SorH == "DD") {
                        c['x']=parseInt(Temp[0]);
                        c['y']=parseInt(Temp[1]);
                        c['id']=242;
                        c['village_id']=getVillageID(vId);
                        c['ssid']=jQuery.cookie('SSID');
                        jQuery.post("http://"+HOST+"/facility/build.php", c, function() {});
                        $w(function() {
                               location.reload(false);
                           });
                    } else {
                        c['x']=parseInt(Temp[0]);
                        c['y']=parseInt(Temp[1]);
                        c['id']=215;
                        c['village_id']=getVillageID(vId);
                        c['ssid']=jQuery.cookie('SSID');
                        jQuery.post("http://"+HOST+"/facility/build.php", c, function() {});
                        $w(function() {
                               location.reload(false);
                           });
                    }
                }
                GM_setValue(HOST+PGNAME+"OPT_BUILD_VID" , getVillageID(vId));
                Reload_Flg = 0;
                return;
            }
        }
    }

    if (Reload_Flg == 1) {
        //30分後にリロードし、再度建築できるかチェックする。
        var tid = $w(function() {
                         location.reload();
                     },1800000);
    }

    return;
}

//施設一覧取得
function get_area() {
    var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var area = new Array();
    for (var i = 0, n = 0; i < results.snapshotLength; i++) {
        if (results.snapshotItem(i).alt.match(/(.*?)\s.*?(\d+)/)) {
            var strURL = results.snapshotItem(i).href;
            area[n] = new lv_sort(RegExp.$1,RegExp.$2,getURLxy(strURL));
            n++;
        }
    }
    return area;
}

function get_area_all() {
    var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var area = new Array();
    for (var i = 0, n = 0; i < results.snapshotLength; i++) {
        var strURL = results.snapshotItem(i).href;
        area[n] = new areas(results.snapshotItem(i).alt,getURLxy(strURL));
        n++;
    }
    return area;
}

function areas(name,xy) {
    this.name = name;
    this.xy = xy;
}

//比較する関数
function cmp_areas(a,b) {
    if (a.xy > b.xy) return 1;
    return -1;
}

// 次拠点移動
function forwardNextVillage(vId) {
    // 巡回停止中ならスキップ
    if (GM_getValue(HOST+PGNAME+"AutoFlg", true) == false) { return; }

    var nowTime = new Date();
    var nextTime = getNextTime(location.hostname, nowTime);
    var waitTime = nextTime - nowTime;
    var roundTime = 0;

    clearInterval(tidMain2);

    if ((ShopFlg == true) && (ShopURL != "")) {
        roundTime = 10 * 1000;
        tidMain2 = $w(function() {
                          location.href = ShopURL;
                      }, roundTime);
    }

    // 建築済みで次建築がセットされていない未巡回の拠点への移動(２拠点同時に完了した場合に使う処理)
    var villages = loadVillages(location.hostname + PGNAME);
    for (var i = 0; i < villages.length; i++) {
        var actions = sortAction(villages[i][IDX_ACTIONS]);
        var nowTime = new Date();
        for (var j = 0; j < actions.length; j++) {
            var actionDiv = createActionDiv(actions[j], nowTime, villages[i][IDX_XY], location.hostname);
            if (!actionDiv) continue;

            var actionTime = new Date(actions[j][IDX2_TIME]);
            var moveFlg = 0;
            if (actionTime < nowTime && actions[j][IDX2_ROTATION] == 0 && actions[j][IDX2_TYPE] == TYPE_CONSTRUCTION) {
                for (var x = j + 1; x < actions.length; x++) {
                    actionTime = new Date(actions[x][IDX2_TIME]);
                    if (actionTime > nowTime && actions[x][IDX2_ROTATION] == 0 && actions[x][IDX2_TYPE] == TYPE_CONSTRUCTION) {
                        moveFlg = 1;
                        break;
                    }
                }
                if (!(x < actions.length)) {
                    actions[j][IDX2_ROTATION] = 1;
                }
                if (moveFlg == 0) {
                    var data = new Array();
                    data[IDX_BASE_NAME] = villages[i][IDX_BASE_NAME];
                    data[IDX_XY] = villages[i][IDX_XY];
                    data[IDX_ACTIONS] = actions;

                    if (location.pathname == "/village.php") {
                        var vcURL = villages[i][IDX_URL];
                        if (vcURL!=undefined) {
                            saveVillages(HOST+PGNAME, villages);
                            roundTime = 5 * 1000;
                            tidMain2 = $w(function() {
                                              location.href = vcURL;
                                          }, roundTime);
                        }
                    }
                }
            }
        }
    }
    if (tidMain2 == undefined) {
        //一番早い作業完了時刻を取得
        var startTime = new Date("2099/12/31 23:59:59");
        var nextTime = startTime;
        var baseTime = new Date();

        nextURL = "";
        // 次回建設終了予定の検索
        for (var i = 0; i < villages.length; i++) {
            var actions = villages[i][IDX_ACTIONS];
            for (var j = 0; j < actions.length; j++) {
                var actionTime = new Date(actions[j][IDX2_TIME]);
                if (actionTime > baseTime && actionTime < nextTime && actions[j][IDX2_TYPE] == TYPE_CONSTRUCTION) {
                    var type = actions[j][IDX2_TYPE].charAt(0);
                    nextTime = actionTime;
                    nextURL  = villages[i][IDX_URL];
                    nextNAME = villages[i][IDX_BASE_NAME];
                }
            }
        }

        var nTime = (nextTime - nowTime);
        var vcURL = nextVillageURL(getVillageID(vId));

        if (vcURL!=undefined) {
            if (nextURL == "") {
                // 次回建築完了予定がない場合は通常巡回処理
                roundTime = parseInt(OPT_ROUND_TIME1) * 1000;
                tidMain2 = $w(function() {
                                  location.href = vcURL;
                              }, roundTime);
            } else {
                if (parseInt(OPT_ROUND_TIME1) * 1000 > nTime) {
                    roundTime = (nextTime - nowTime + 10000);
                    tidMain2 = $w(function() {
                                      location.href = nextURL;
                                  }, roundTime);
                } else {
                    // 通常巡回処理
                    roundTime = parseInt(OPT_ROUND_TIME1) * 1000;
                    tidMain2 = $w(function() {
                                      location.href = vcURL;
                                  }, roundTime);
                }
            }
        }
    }
    debugLog("nTime:" + nTime / 1000 + "sec  RoundTime:" + (roundTime / 1000) + "sec  forwardNextVillage:" + vcURL + " " + roundTime);
}

//比較する関数
function cmp_time(a,b) {
    if (a.xy > b.xy) return 1;
    return -1;
}

// 次拠点URL取得
function nextVillageURL(vId2) {
    var villages = loadVillages(HOST+PGNAME);
    var nextIndex = 0;
    var chkNextVID = new Array();
    for (var i = 0; i < villages.length; i++) {
        matched = villages[i][0].match(/\((-?\d+),(-?\d+)\)/);
        var tChk1 = GM_getValue("enable_auto_build_" + matched[1] + "_" + matched[2], true);
        if (tChk1) {
            chkNextVID.push(villages[i][IDX_URL]);
        }
    }

    // 現在の拠点のインデックスを検索 2012.01.24 逆順処理追加
    for (var i = 0; i < chkNextVID.length; i++) {
        var url = chkNextVID[i];
        if (vId2 == getParameter2(chkNextVID[i], "village_id")) {
            if (getReverseMode() == false) {
                // 正巡回
                if (i+1 < chkNextVID.length) {
                    nextIndex = i+1;
                } else {
                    nextIndex = 0;
                }
            } else {
                // 逆巡回
                if (i-1 < 0) {
                    nextIndex = chkNextVID.length-1;
                } else {
                    nextIndex = i-1;
                }
            }
            break;
        }
    }
    return chkNextVID[nextIndex];
}


// URLパラメタ取得
function getParameter2(url, key) {
    var str = url.split("?");
    if (str.length < 2) {
        return "";
    }

    var params = str[1].split("&");
    for (var i = 0; i < params.length; i++) {
        var keyVal = params[i].split("=");
        if (keyVal[0] == key && keyVal.length == 2) {
            return decodeURIComponent(keyVal[1]);
        }
    }
    return "";
}


//建築物の格納用
function lv_sort(name,lv,xy) {
    this.name = name;
    this.lv = lv;
    this.xy = xy;
}
//比較する関数
function cmp_lv(a,b) {
    return a.lv - b.lv;
}

function cmp_lv2(a,b) {
    return b.lv - a.lv;
}
//拠点IDの取得
function getVillageID(vId) {
    //villages
    var villages = loadVillages(HOST+PGNAME);
    for (var i = 0; i < villages.length; i++) {
        if (villages[i][IDX_XY] == vId) {
            var vURL = villages[i][IDX_URL];
            var temp = vURL.split("?");
            var temp2 = temp[1].split("=");
            return temp2[1];
        }
    }
}
function getURLxy(strURL) {
    if (strURL == "") { return "";}
    var strTemp = "";
    strTemp = strURL;
    var Temp = strTemp.split("?");
    var Temp2 = Temp[1].split("&");
    var Temp3 = Temp2[0].split("=");
    var Temp4 = Temp2[1].split("=");
    return Temp3[1] + "," +Temp4[1];
}

//リンクHTML追加
function addOpenLinkHtml() {
    if (location.hostname[0] == "s" || location.hostname[0] == "h" || location.hostname[0] == "p") {
        var sidebar = d.evaluate('//*[@class="sideBoxHead"]/h3/strong',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    } else {
        var sidebar = d.evaluate('//a[@title="拠点"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    if (sidebar.snapshotLength == 0) {
        sidebar = d.evaluate('//*[@class="xy"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (sidebar.snapshotLength == 0) return;
        isMixi = false;
    }

    //自動移動リンク
    var openLink = d.createElement("a");
    openLink.id = "Auto_Bilder";
    openLink.href = "javascript:void(0);";
    openLink.style.marginTop = "0px";
    openLink.style.marginLeft = "0px";
    openLink.innerHTML = " [自動建築]";
    openLink.style.color = "#FFFFFF";
    openLink.style.cursor = "pointer";

    openLink.addEventListener("click", function() {
                                  reopen();
                              }, true);
    if (location.hostname[0] == "s" || location.hostname[0] == "h") {
        sidebar.snapshotItem(1).appendChild(openLink);
    } else {
        sidebar.snapshotItem(0).appendChild(openLink);
    }
}

//建築設定画面を開く
function openIniBilderBox() {
    jQuery("#bab-main").show();
}

//LvUP対象施設設定画面を開く
function openInifacBox(vId) {
    clearInterval(tidMain2);
    clearInterval(tidMain3);
    closeInifacBox();
    addInifacHtml(vId);
}
///LvUP対象施設設定画面を閉じる
function closeInifacBox() {
    deleteInifacHtml();
    deleteInifacFrameHtml();
}

///LvUP対象施設設のチェックボックスをクリアする
function clearInifacBox() {

    var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX1"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX2"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX3"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX7"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX8"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX9"]');   checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX10"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX11"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX12"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX13"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX14"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX15"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX16"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX17"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX18"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX19"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX20"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX21"]');  checkbox[0].checked = false;
    var checkbox = $a('//input[@id="OPT_CHKBOX22"]');  checkbox[0].checked = false;

    var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV1"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV2"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV3"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV7"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV8"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV9"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV10"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV11"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV12"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV13"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV14"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV15"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV16"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV17"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV18"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV19"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV20"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV21"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_CHKBOXLV22"]');  textbox[0].value = 0;
    // 内政設定
    var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 伐採知識
    var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 伐採技術
    var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 石切知識
    var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 石切技術
    var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 製鉄知識
    var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 製鉄技術
    var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 騎兵増強
    var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = false; // 食糧知識
    var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = false; // 食糧技術
    var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 農林知識
    var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 農林技術
    var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 加工知識
    var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 加工技術
    var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 富国
    var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 富国論
    var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 富国強兵
    var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 豊穣
    var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 美玉歌舞
    var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // 恵風
    var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 人選眼力
    var checkbox = $a('//input[@id="OPT_DOME23"]'); checkbox[0].checked = false; // 呉の治世
    var checkbox = $a('//input[@id="OPT_DOME24"]'); checkbox[0].checked = false; // 王佐の才
    var checkbox = $a('//input[@id="OPT_DOME25"]'); checkbox[0].checked = false; // 練兵訓練
    var checkbox = $a('//input[@id="OPT_DOME26"]'); checkbox[0].checked = false; // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME27"]'); checkbox[0].checked = false; // 厩舎訓練
    var checkbox = $a('//input[@id="OPT_DOME28"]'); checkbox[0].checked = false; // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME29"]'); checkbox[0].checked = false; // 弓兵訓練
    var checkbox = $a('//input[@id="OPT_DOME30"]'); checkbox[0].checked = false; // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME31"]'); checkbox[0].checked = false; // 兵舎訓練
    var checkbox = $a('//input[@id="OPT_DOME32"]'); checkbox[0].checked = false; // 　　修練
    // 糧村オプション
    var checkbox = $a('//input[@id="OPT_KATEMURA"]');  checkbox[0].checked = false; // 糧村化
    var checkbox = $a('//input[@id="OPT_SHIGEN"]'); checkbox[0].checked  = false;
}

function InitMilitaryHome() {
    // 遠征訓練所
    clearInifacBox();
    var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = false; // 拠点
    var checkbox = $a('//input[@id="OPT_CHKBOX1"]');   checkbox[0].checked = false; // 伐採所
    var checkbox = $a('//input[@id="OPT_CHKBOX2"]');   checkbox[0].checked = false; // 石切り場
    var checkbox = $a('//input[@id="OPT_CHKBOX3"]');   checkbox[0].checked = false; // 製鉄所
    var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = true;  // 畑
    var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = true;  // 倉庫
    var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = true;  // 銅雀台
    var checkbox = $a('//input[@id="OPT_CHKBOX7"]');   checkbox[0].checked = true;  // 鍛冶場
    var checkbox = $a('//input[@id="OPT_CHKBOX8"]');   checkbox[0].checked = true;  // 防具工場
    var checkbox = $a('//input[@id="OPT_CHKBOX9"]');   checkbox[0].checked = true;  // 練兵所
    var checkbox = $a('//input[@id="OPT_CHKBOX10"]');  checkbox[0].checked = false; // 兵舎
    var checkbox = $a('//input[@id="OPT_CHKBOX11"]');  checkbox[0].checked = false; // 弓兵舎
    var checkbox = $a('//input[@id="OPT_CHKBOX12"]');  checkbox[0].checked = false; // 厩舎
    var checkbox = $a('//input[@id="OPT_CHKBOX13"]');  checkbox[0].checked = true;  // 宿舎
    var checkbox = $a('//input[@id="OPT_CHKBOX14"]');  checkbox[0].checked = false; // 兵器工房
    var checkbox = $a('//input[@id="OPT_CHKBOX15"]');  checkbox[0].checked = false; // 市場
    var checkbox = $a('//input[@id="OPT_CHKBOX16"]');  checkbox[0].checked = true;  // 訓練所
    var checkbox = $a('//input[@id="OPT_CHKBOX17"]');  checkbox[0].checked = false; // 水車
    var checkbox = $a('//input[@id="OPT_CHKBOX18"]');  checkbox[0].checked = false; // 工場
    var checkbox = $a('//input[@id="OPT_CHKBOX19"]');  checkbox[0].checked = false; // 研究所
    var checkbox = $a('//input[@id="OPT_CHKBOX20"]');  checkbox[0].checked = true;  // 大宿舎
    var checkbox = $a('//input[@id="OPT_CHKBOX21"]');  checkbox[0].checked = true;  // 遠征訓練所
    var checkbox = $a('//input[@id="OPT_CHKBOX22"]');  checkbox[0].checked = true;  // 見張り台

    var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 0;   // 拠点
    var textbox = $a('//input[@id="OPT_CHKBOXLV1"]');   textbox[0].value = 0;   // 伐採所
    var textbox = $a('//input[@id="OPT_CHKBOXLV2"]');   textbox[0].value = 0;   // 石切り場
    var textbox = $a('//input[@id="OPT_CHKBOXLV3"]');   textbox[0].value = 0;   // 製鉄所
    var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 5;   // 畑
    var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 1;   // 倉庫
    var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 7;   // 銅雀台
    var textbox = $a('//input[@id="OPT_CHKBOXLV7"]');   textbox[0].value = 5;   // 鍛冶場
    var textbox = $a('//input[@id="OPT_CHKBOXLV8"]');   textbox[0].value = 7;   // 防具工場
    var textbox = $a('//input[@id="OPT_CHKBOXLV9"]');   textbox[0].value = 3;   // 練兵所
    var textbox = $a('//input[@id="OPT_CHKBOXLV10"]');  textbox[0].value = 0;   // 兵舎
    var textbox = $a('//input[@id="OPT_CHKBOXLV11"]');  textbox[0].value = 0;   // 弓兵舎
    var textbox = $a('//input[@id="OPT_CHKBOXLV12"]');  textbox[0].value = 0;   // 厩舎
    var textbox = $a('//input[@id="OPT_CHKBOXLV13"]');  textbox[0].value = 15;  // 宿舎
    var textbox = $a('//input[@id="OPT_CHKBOXLV14"]');  textbox[0].value = 0;   // 兵器工房
    var textbox = $a('//input[@id="OPT_CHKBOXLV15"]');  textbox[0].value = 0;   // 市場
    var textbox = $a('//input[@id="OPT_CHKBOXLV16"]');  textbox[0].value = 5;   // 訓練所
    var textbox = $a('//input[@id="OPT_CHKBOXLV17"]');  textbox[0].value = 0;   // 水車
    var textbox = $a('//input[@id="OPT_CHKBOXLV18"]');  textbox[0].value = 0;   // 工場
    var textbox = $a('//input[@id="OPT_CHKBOXLV19"]');  textbox[0].value = 0;   // 研究所
    var textbox = $a('//input[@id="OPT_CHKBOXLV20"]');  textbox[0].value = 8;   // 大宿舎
    var textbox = $a('//input[@id="OPT_CHKBOXLV21"]');  textbox[0].value = 10;  // 遠征訓練所
    var textbox = $a('//input[@id="OPT_CHKBOXLV22"]');  textbox[0].value = 8;   // 見張り台
    // 内政設定
    // 内政設定
    var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 伐採知識
    var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 伐採技術
    var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 石切知識
    var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 石切技術
    var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 製鉄知識
    var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 製鉄技術
    var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 騎兵増強
    var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = false; // 食糧知識
    var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = false; // 食糧技術
    var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 農林知識
    var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 農林技術
    var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 加工知識
    var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 加工技術
    var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 富国
    var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 富国論
    var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 富国強兵
    var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 豊穣
    var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 美玉歌舞
    var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // 恵風
    var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 人選眼力
    var checkbox = $a('//input[@id="OPT_DOME23"]'); checkbox[0].checked = false; // 呉の治世
    var checkbox = $a('//input[@id="OPT_DOME24"]'); checkbox[0].checked = false; // 王佐の才
    var checkbox = $a('//input[@id="OPT_DOME25"]'); checkbox[0].checked = false; // 練兵訓練
    var checkbox = $a('//input[@id="OPT_DOME26"]'); checkbox[0].checked = false; // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME27"]'); checkbox[0].checked = false; // 厩舎訓練
    var checkbox = $a('//input[@id="OPT_DOME28"]'); checkbox[0].checked = false; // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME29"]'); checkbox[0].checked = false; // 弓兵訓練
    var checkbox = $a('//input[@id="OPT_DOME30"]'); checkbox[0].checked = false; // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME31"]'); checkbox[0].checked = false; // 兵舎訓練
    var checkbox = $a('//input[@id="OPT_DOME32"]'); checkbox[0].checked = false; // 　　修練
}

function InitRiceParadise() {
    // 糧村
    clearInifacBox();
    var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = true;  // 拠点
    var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = true;  // 畑
    var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = true;  // 倉庫
    var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = true;  // 銅雀台

    var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 10;      // 拠点
    var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 15;      // 畑
    var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 20;      // 倉庫
    var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 10;      // 銅雀台
    // 内政設定
    var checkbox = $a('//input[@id="OPT_DOME1"]');  checkbox[0].checked = false;    // 伐採知識
    var checkbox = $a('//input[@id="OPT_DOME2"]');  checkbox[0].checked = false;    // 伐採技術
    var checkbox = $a('//input[@id="OPT_DOME3"]');  checkbox[0].checked = false;    // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME4"]');  checkbox[0].checked = false;    // 石切知識
    var checkbox = $a('//input[@id="OPT_DOME5"]');  checkbox[0].checked = false;    // 石切技術
    var checkbox = $a('//input[@id="OPT_DOME6"]');  checkbox[0].checked = false;    // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME7"]');  checkbox[0].checked = false;    // 製鉄知識
    var checkbox = $a('//input[@id="OPT_DOME8"]');  checkbox[0].checked = false;    // 製鉄技術
    var checkbox = $a('//input[@id="OPT_DOME9"]');  checkbox[0].checked = false;    // 騎兵増強
    var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = true; // 食糧知識
    var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = true; // 食糧技術
    var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = true; // 農林知識     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = true; // 農林技術     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false;    // 加工知識
    var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false;    // 加工技術
    var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = true; // 富国           2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = true; // 富国論        2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false;    // 富国強兵
    var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = true; // 豊穣           2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false;    // 美玉歌舞
    var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false;    // 恵風
    var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = true; // 人選眼力     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME23"]'); checkbox[0].checked = false;    // 呉の治世
    var checkbox = $a('//input[@id="OPT_DOME24"]'); checkbox[0].checked = false;    // 王佐の才
    var checkbox = $a('//input[@id="OPT_DOME25"]'); checkbox[0].checked = false;    // 練兵訓練
    var checkbox = $a('//input[@id="OPT_DOME26"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME27"]'); checkbox[0].checked = false;    // 厩舎訓練
    var checkbox = $a('//input[@id="OPT_DOME28"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME29"]'); checkbox[0].checked = false;    // 弓兵訓練
    var checkbox = $a('//input[@id="OPT_DOME30"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME31"]'); checkbox[0].checked = false;    // 兵舎訓練
    var checkbox = $a('//input[@id="OPT_DOME32"]'); checkbox[0].checked = false;    // 　　修練
    // 糧村オプション
    var checkbox = $a('//input[@id="OPT_KATEMURA"]');  checkbox[0].checked = true; // 糧村化
    var checkbox = $a('//input[@id="OPT_SHIGEN"]'); checkbox[0].checked = false;
}

function InitResVillage() {
    // 資源村
    clearInifacBox();
    var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = true;  // 拠点
    var checkbox = $a('//input[@id="OPT_CHKBOX1"]');   checkbox[0].checked = true;  // 伐採所
    var checkbox = $a('//input[@id="OPT_CHKBOX2"]');   checkbox[0].checked = true;  // 石切り場
    var checkbox = $a('//input[@id="OPT_CHKBOX3"]');   checkbox[0].checked = true;  // 製鉄所
    var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = true;  // 畑
    var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = true;  // 倉庫
    var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = true;  // 銅雀台

    var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 10;
    var textbox = $a('//input[@id="OPT_CHKBOXLV1"]');   textbox[0].value = 13;
    var textbox = $a('//input[@id="OPT_CHKBOXLV2"]');   textbox[0].value = 13;
    var textbox = $a('//input[@id="OPT_CHKBOXLV3"]');   textbox[0].value = 13;
    var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 15;
    var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 20;
    var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 10;
    // 内政設定
    var checkbox = $a('//input[@id="OPT_DOME1"]');  checkbox[0].checked = true; // 伐採知識
    var checkbox = $a('//input[@id="OPT_DOME2"]');  checkbox[0].checked = true; // 伐採技術
    var checkbox = $a('//input[@id="OPT_DOME3"]');  checkbox[0].checked = false;    // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME4"]');  checkbox[0].checked = true; // 石切知識
    var checkbox = $a('//input[@id="OPT_DOME5"]');  checkbox[0].checked = true; // 石切技術
    var checkbox = $a('//input[@id="OPT_DOME6"]');  checkbox[0].checked = false;    // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME7"]');  checkbox[0].checked = true; // 製鉄知識
    var checkbox = $a('//input[@id="OPT_DOME8"]');  checkbox[0].checked = true; // 製鉄技術
    var checkbox = $a('//input[@id="OPT_DOME9"]');  checkbox[0].checked = false;    // 騎兵増強
    var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = true; // 食糧知識
    var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = true; // 食糧技術
    var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = true; // 農林知識     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = true; // 農林技術     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = true; // 加工知識     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = true; // 加工技術     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = true; // 富国           2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = true; // 富国論        2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false;    // 富国強兵
    var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = true; // 豊穣           2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false;    // 美玉歌舞
    var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = true; // 恵風           2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = true; // 人選眼力     2013.01.10 変更
    var checkbox = $a('//input[@id="OPT_DOME23"]'); checkbox[0].checked = false;    // 呉の治世
    var checkbox = $a('//input[@id="OPT_DOME24"]'); checkbox[0].checked = false;    // 王佐の才
    var checkbox = $a('//input[@id="OPT_DOME25"]'); checkbox[0].checked = false;    // 練兵訓練
    var checkbox = $a('//input[@id="OPT_DOME26"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME27"]'); checkbox[0].checked = false;    // 厩舎訓練
    var checkbox = $a('//input[@id="OPT_DOME28"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME29"]'); checkbox[0].checked = false;    // 弓兵訓練
    var checkbox = $a('//input[@id="OPT_DOME30"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME31"]'); checkbox[0].checked = false;    // 兵舎訓練
    var checkbox = $a('//input[@id="OPT_DOME32"]'); checkbox[0].checked = false;    // 　　修練
    // 糧村オプション
    var checkbox = $a('//input[@id="OPT_KATEMURA"]');  checkbox[0].checked = false; // 糧村化
    var checkbox = $a('//input[@id="OPT_SHIGEN"]'); checkbox[0].checked = true;
}

function InitMilitarySite() {
    //軍事拠点
    clearInifacBox();
    var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = true;  // 拠点
    var checkbox = $a('//input[@id="OPT_CHKBOX10"]');  checkbox[0].checked = true;  // 兵舎
    var checkbox = $a('//input[@id="OPT_CHKBOX11"]');  checkbox[0].checked = true;  // 弓兵舎
    var checkbox = $a('//input[@id="OPT_CHKBOX12"]');  checkbox[0].checked = true;  // 厩舎
    var checkbox = $a('//input[@id="OPT_CHKBOX13"]');  checkbox[0].checked = true;  // 兵器工房
    var checkbox = $a('//input[@id="OPT_CHKBOX14"]');  checkbox[0].checked = true;  // 宿舎
    var checkbox = $a('//input[@id="OPT_CHKBOX20"]');  checkbox[0].checked = true;  // 大宿舎

    var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 10;
    // 内政設定
    var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 伐採知識
    var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 伐採技術
    var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 石切知識
    var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 石切技術
    var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 弓兵増強
    var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 製鉄知識
    var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 製鉄技術
    var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 騎兵増強
    var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = false; // 食糧知識
    var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = false; // 食糧技術
    var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 農林知識
    var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 農林技術
    var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 加工知識
    var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 加工技術
    var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 富国
    var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 富国論
    var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 富国強兵
    var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 豊穣
    var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 美玉歌舞
    var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false;    // 恵風
    var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false;    // 人選眼力
    var checkbox = $a('//input[@id="OPT_DOME23"]'); checkbox[0].checked = false;    // 呉の治世
    var checkbox = $a('//input[@id="OPT_DOME24"]'); checkbox[0].checked = false;    // 王佐の才
    var checkbox = $a('//input[@id="OPT_DOME25"]'); checkbox[0].checked = false;    // 練兵訓練
    var checkbox = $a('//input[@id="OPT_DOME26"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME27"]'); checkbox[0].checked = false;    // 厩舎訓練
    var checkbox = $a('//input[@id="OPT_DOME28"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME29"]'); checkbox[0].checked = false;    // 弓兵訓練
    var checkbox = $a('//input[@id="OPT_DOME30"]'); checkbox[0].checked = false;    // 　　修練
    var checkbox = $a('//input[@id="OPT_DOME31"]'); checkbox[0].checked = false;    // 兵舎訓練
    var checkbox = $a('//input[@id="OPT_DOME32"]'); checkbox[0].checked = false;    // 　　修練
}

// 残す資源量のクリア
function clearInitRemainingRes() {
    var textbox = $a('//input[@id="OPT_BLD_WOOD"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BLD_STONE"]'); textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BLD_IRON"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BLD_RICE"]');  textbox[0].value = 0;
}

// 武器・防具強化レベルのクリア
function clearInitArmsArmor() {

    var textbox = $a('//input[@id="OPT_BK_LV1"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV8"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV3"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV9"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV5"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV4"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV7"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV12"]'); textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BK_LV13"]'); textbox[0].value = 0;

    var textbox = $a('//input[@id="OPT_BG_LV1"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV8"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV3"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV9"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV5"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV4"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV7"]');  textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV10"]'); textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV11"]'); textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV12"]'); textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_BG_LV13"]'); textbox[0].value = 0;
}

// 造兵時作成単位初期化
function clearInitSoldier() {

    var textbox = $a('//input[@id="OPT_SOL_ADD1"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD8"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD3"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD5"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD9"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD4"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD7"]');    textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD10"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD11"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD12"]');   textbox[0].value = 0;
    var textbox = $a('//input[@id="OPT_SOL_ADD13"]');   textbox[0].value = 0;
}

//建築対象施設表示HTML削除
function deleteInifacHtml() {
    var elem = d.getElementById("ABfacContainer");
    if (elem == undefined) return;
    d.body.removeChild(d.getElementById("ABfacContainer"));
}
//建築対象施設表示HTML削除
function deleteInifacFrameHtml() {
    var elem = d.getElementById("ABfacContainer");
    if (elem == undefined) return;
    d.body.removeChild(document.getElementById("ABfacContainer"));
}

// @@@@ add 2011.09.07 @@@@
function loadRoundTime() {
    OPT_ROUND_TIME1 = GM_getValue(HOST+PGNAME+"OPT_ROUND_TIME1", 60);
    return OPT_ROUND_TIME1;
}

//数値を3ケタ区切りにする関数
function SetPrice(price) {
    　var num = new String(price).replace(/,/g, "");
    　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    　return num;
}

//施設建設必要資源読込
function loadFacility() {
}

//施設建設必要資源保存
function saveFacility(f) {
}

//ステイタス取得HTML追加
function addInifacHtml(vId) {
    var popupLeft = GM_getValue(location.hostname + PGNAME + "_popup_left2", 10);
    var popupTop = GM_getValue(location.hostname + PGNAME + "_popup_top2", 10);
    if (popupLeft < 0) popupLeft = 0;
    if (popupTop < 0) popupTop = 0;

    //表示コンテナ作成
    var ABfacContainer = d.createElement("div");
    ABfacContainer.id = "ABfacContainer";
    ABfacContainer.style.position = "absolute";
    ABfacContainer.style.color = COLOR_BASE;
    ABfacContainer.style.backgroundColor = COLOR_FRAME;
    ABfacContainer.style.opacity= 1.0;
    ABfacContainer.style.border = "solid 2px black";
    ABfacContainer.style.left = popupLeft + "px";
    ABfacContainer.style.top = popupTop + "px";
    ABfacContainer.style.font = fontstyle;
    ABfacContainer.style.padding = "2px";
    ABfacContainer.style.MozBorderRadius = "4px";
    ABfacContainer.style.zIndex = 999;

    ABfacContainer.setAttribute('vId', vId);
    d.body.appendChild(ABfacContainer);

    $e(ABfacContainer, "mousedown", function(event) {
           if (event.target != $("ABfacContainer")) return false;
           g_MD = "ABfacContainer";
           g_MX = event.pageX-parseInt(this.style.left,10);
           g_MY = event.pageY-parseInt(this.style.top,10);
           event.preventDefault();
       });
    $e(d, "mousemove", function(event) {
           if (g_MD != "ABfacContainer") return true;
           var ABfacContainer = $("ABfacContainer");
           if (!ABfacContainer) return true;
           var popupLeft = event.pageX - g_MX;
           var popupTop  = event.pageY - g_MY;
           ABfacContainer.style.left = popupLeft + "px";
           ABfacContainer.style.top = popupTop + "px";
           //ポップアップ位置を永続保存
           GM_setValue(location.hostname + PGNAME + "_popup_left2", popupLeft);
           GM_setValue(location.hostname + PGNAME + "_popup_top2", popupTop);
       });
    $e(d, "mouseup", function(event) {
           g_MD = "";
       });

    // ===== 作業拠点名 =====
    var BaseName  = d.createElement("span");
    BaseName.style.border ="solid 0px red";
    BaseName.style.padding = "3px";
    BaseName.style.font = "bold 120% 'ＭＳ ゴシック'";
    BaseName.style.color = "#71C4F9";

    var villages = loadVillages(HOST + PGNAME);
    for (var i = 0; i < villages.length; i++) {
        //表示中の設定対象拠点名の表示
        if (vId == villages[i][IDX_XY]) {
            BaseName.innerHTML = villages[i][IDX_BASE_NAME];
        }
    }
    Load_OPT(vId);
    ABfacContainer.appendChild(BaseName);

    // ===== 建設設定 =====
    var Build_Box = d.createElement("table");
    Build_Box.style.border ="solid 2px black";
    Build_Box.style.margin = "0px 4px 4px 0px";
    Build_Box.style.width = "100%";

    var tr11 = d.createElement("tr");
    tr11.style.backgroundColor = COLOR_TITLE;
    tr11.style.border ="solid 1px black";

    var td11 = d.createElement("td");
    td11.style.padding = "1px";
    td11.colSpan = "3";
    td11.appendChild(createRadioBtn ('AC', '自動建築'));

    var tr111 = d.createElement("tr");
    tr111.style.backgroundColor = COLOR_BACK;
    tr111.style.border ="solid 1px black";

    var td111 = d.createElement("td");
    td111.style.padding = "3px";
    td111.style.verticalAlign = "top";

    var td112 = d.createElement("td");
    td112.style.padding = "3px";
    td112.style.verticalAlign = "top";

    var td113 = d.createElement("td");
    td113.style.padding = "3px";
    td113.style.verticalAlign = "top";

    var tr30 = d.createElement("tr");
    tr30.style.backgroundColor = COLOR_BACK;

    var td31 = d.createElement("td");
    td31.colSpan = "3";
    td31.style.padding = "3px";

    Build_Box.appendChild(tr11);
    tr11.appendChild(td11);

    Build_Box.appendChild(tr111);
    tr111.appendChild(td111);
    tr111.appendChild(td112);
    tr111.appendChild(td113);

    Build_Box.appendChild(tr30);
    tr30.appendChild(td31);

    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  0, " 拠点 　　　","中央の城・村・砦のLvを上げます。",0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  6, " 銅雀台 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateText(td111, "Dummy" , "　", 0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  1, " 伐採所 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  2, " 石切り場 　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  3, " 製鉄所 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  4, " 畑 　　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  5, " 倉庫 　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateText(td111, "Dummy" , "　", 0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  7, " 鍛冶場 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  8, " 防具工場 　","自動でLv上げをする建築物にチェックをしてください。",0);

    ccreateCheckBoxKai2(td112, "OPT_CHKBOX",  9, " 練兵所 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 10, " 兵舎 　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 11, " 弓兵舎 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 12, " 厩舎 　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 14, " 兵器工房 　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateText(td112, "Dummy" , "　", 0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 13, " 宿舎 　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 20, " 大宿舎 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateText(td112, "Dummy" , "　", 0);
    ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 15, " 市場 　　　","自動でLv上げをする建築物にチェックをしてください。",0);

    ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 16, " 訓練所 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 21, " 遠征訓練所 ","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateText(td113, "Dummy" , "　", 0);
    ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 17, " 水車 　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 18, " 工場 　　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateText(td113, "Dummy" , "　", 0);
    ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 19, " 研究所 　　","自動でLv上げをする建築物にチェックをしてください。",0);
    ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 22, " 見張り台 　","自動でLv上げをする建築物にチェックをしてください。",0);

    ccreateButton(td31, "遠征訓練所", "本拠地に遠征訓練所を建てる設定にします。", function() {
                      InitMilitaryHome();
                  },85);
    ccreateButton(td31, "糧村", "糧村の設定にします。", function() {
                      InitRiceParadise();
                  });
    ccreateButton(td31, "資源村", "資源村の設定にします。", function() {
                      InitResVillage();
                  });
    ccreateButton(td31, "軍事拠点", "軍事拠点の設定にします。", function() {
                      InitMilitarySite();
                  });
    ccreateButton(td31, "初期化", "自動建設設定を消去します。", function() {
                      clearInifacBox();
                  });

    // ===== 内政設定 =====
    var Domestic_Box = d.createElement("table");
    Domestic_Box.style.border = "solid 2px black";
    Domestic_Box.style.margin = "0px 4px 4px 0px";
    Domestic_Box.style.width = "100%";

    var tr1 = d.createElement("tr");
    var td1 = d.createElement("td");
    td1.colSpan = 5;
    td1.style.backgroundColor = COLOR_TITLE;
    ccreateText(td1, "dummy", "■ 自動内政設定", 0);

    var tr2 = d.createElement("tr");
    tr2.style.backgroundColor = COLOR_BACK;
    tr2.style.border = "solid 1px black";

    var td21 = d.createElement("td");
    td21.style.padding = "3px";
    td21.style.verticalAlign = "top";

    var td22 = d.createElement("td");
    td22.style.padding = "3px";
    td22.style.verticalAlign = "top";

    var td23 = d.createElement("td");
    td23.style.padding = "3px";
    td23.style.verticalAlign = "top";

    var td24 = d.createElement("td");
    td24.style.padding = "3px";
    td24.style.verticalAlign = "top";

    var td25 = d.createElement("td");
    td25.style.padding = "3px";
    td25.style.verticalAlign = "top";

    Domestic_Box.appendChild(tr1);
    tr1.appendChild(td1);
    Domestic_Box.appendChild(tr2);
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    tr2.appendChild(td23);
    tr2.appendChild(td24);
    tr2.appendChild(td25);

    ccreateCheckBox(td21, "OPT_DOME1" , OPT_DOME[1] , " " + DASkill[1]  + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[1]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME2" , OPT_DOME[2] , " " + DASkill[2]  + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[2]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME16", OPT_DOME[16], " " + DASkill[16] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[16]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME12", OPT_DOME[12], " " + DASkill[12] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[12] + "）を発動します。", 0);
    ccreateCheckBox(td25, "OPT_DOME13", OPT_DOME[13], " " + DASkill[13] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[13] + "）を発動します。", 0);

    ccreateCheckBox(td21, "OPT_DOME4" , OPT_DOME[4] , " " + DASkill[4]  + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[4]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME5" , OPT_DOME[5] , " " + DASkill[5]  + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[5]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME17", OPT_DOME[17], " " + DASkill[17] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[17]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME14", OPT_DOME[14], " " + DASkill[14] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[14] + "）を発動します。", 0);
    ccreateCheckBox(td25, "OPT_DOME15", OPT_DOME[15], " " + DASkill[15] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[15] + "）を発動します。", 0);

    ccreateCheckBox(td21, "OPT_DOME7" , OPT_DOME[7] , " " + DASkill[7]  + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[7]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME8" , OPT_DOME[8] , " " + DASkill[8]  + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[8]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME18", OPT_DOME[18], " " + DASkill[18] + "　", "この都市に来たら、自動的に内政スキル（" + DASkill[18]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME19", OPT_DOME[19], " " + DASkill[19], "この都市に来たら、自動的に内政スキル（" + DASkill[19] + "）を発動します。", 0);
    ccreateCheckBox(td25, "OPT_DOME20", OPT_DOME[20], " " + DASkill[20], "この都市に来たら、自動的に内政スキル（" + DASkill[20] + "）を発動します。", 0);

    ccreateCheckBox(td21, "OPT_DOME10", OPT_DOME[10], " " + DASkill[10], "この都市に来たら、自動的に内政スキル（" + DASkill[10]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME11", OPT_DOME[11], " " + DASkill[11], "この都市に来たら、自動的に内政スキル（" + DASkill[11] + "）を発動します。", 0);
    ccreateText(td23, "Dummy" , "　", 0);
    ccreateText(td24, "Dummy" , "　", 0);
    ccreateText(td25, "Dummy" , "　", 0);

    ccreateCheckBox(td21, "OPT_DOME25", OPT_DOME[25], " " + DASkill[25], "この都市に来たら、自動的に内政スキル（" + DASkill[25]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME27", OPT_DOME[27], " " + DASkill[27], "この都市に来たら、自動的に内政スキル（" + DASkill[27]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME29", OPT_DOME[29], " " + DASkill[29], "この都市に来たら、自動的に内政スキル（" + DASkill[29]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME31", OPT_DOME[31], " " + DASkill[31], "この都市に来たら、自動的に内政スキル（" + DASkill[31]  + "）を発動します。", 0);
    ccreateCheckBox(td25, "OPT_DOME33", OPT_DOME[33], " " + DASkill[33], "この都市に来たら、自動的に内政スキル（" + DASkill[33]  + "）を発動します。", 0);

    ccreateCheckBox(td21, "OPT_DOME26", OPT_DOME[26], " " + DASkill[26], "この都市に来たら、自動的に内政スキル（" + DASkill[26]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME28", OPT_DOME[28], " " + DASkill[28], "この都市に来たら、自動的に内政スキル（" + DASkill[28]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME30", OPT_DOME[30], " " + DASkill[30], "この都市に来たら、自動的に内政スキル（" + DASkill[30]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME32", OPT_DOME[32], " " + DASkill[32], "この都市に来たら、自動的に内政スキル（" + DASkill[32]  + "）を発動します。", 0);
    ccreateCheckBox(td25, "OPT_DOME34", OPT_DOME[34], " " + DASkill[34], "この都市に来たら、自動的に内政スキル（" + DASkill[34]  + "）を発動します。", 0);

    ccreateText(td21, "Dummy" , "　", 0);
    ccreateCheckBox(td22, "OPT_DOME3",  OPT_DOME[3],  " " + DASkill[3], "この都市に来たら、自動的に内政スキル（" + DASkill[3]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME6",  OPT_DOME[6],  " " + DASkill[6], "この都市に来たら、自動的に内政スキル（" + DASkill[6]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME9",  OPT_DOME[9],  " " + DASkill[9], "この都市に来たら、自動的に内政スキル（" + DASkill[9]  + "）を発動します。", 0);
    ccreateText(td25, "Dummy" , "　", 0);

    ccreateCheckBox(td21, "OPT_DOME21", OPT_DOME[21], " " + DASkill[21], "この都市に来たら、自動的に内政スキル（" + DASkill[21]  + "）を発動します。", 0);
    ccreateCheckBox(td22, "OPT_DOME22", OPT_DOME[22], " " + DASkill[22], "この都市に来たら、自動的に内政スキル（" + DASkill[22]  + "）を発動します。", 0);
    ccreateCheckBox(td23, "OPT_DOME23", OPT_DOME[23], " " + DASkill[23], "この都市に来たら、自動的に内政スキル（" + DASkill[23]  + "）を発動します。", 0);
    ccreateCheckBox(td24, "OPT_DOME24", OPT_DOME[24], " " + DASkill[24], "この都市に来たら、自動的に内政スキル（" + DASkill[24]  + "）を発動します。", 0);
    ccreateText(td25, "Dummy" , "　", 0);

    // ===== 糧変換設定 =====

    var Market_Box = d.createElement("table");
    Market_Box.style.border ="solid 2px black";
    Market_Box.style.margin = "0px 4px 4px 0px";
    Market_Box.style.width = "100%";

    var tr30 = d.createElement("tr");
    tr30.style.backgroundColor = COLOR_TITLE;

    var td30 = d.createElement("td");
    td30.colSpan = 2;
    ccreateCheckBox(td30, "OPT_ICHIBA", OPT_ICHIBA, " 市場自動変換", "この都市で糧の市場自動変換をします。", 0);

    var tr311 = d.createElement("tr");
    tr311.style.border = "solid 1px black";
    tr311.style.backgroundColor = COLOR_BACK;

    var td311 = d.createElement("td");
    td311.style.padding = "3px";
    td311.style.verticalAlign = "top";

    var td312 = d.createElement("td");
    td312.style.padding = "3px";
    td312.style.verticalAlign = "top";

    Market_Box.appendChild(tr30);
    tr30.appendChild(td30);
    Market_Box.appendChild(tr311);
    tr311.appendChild(td311);
    tr311.appendChild(td312);

    ccreateTextBox(td311, "OPT_RISE_MAX",       OPT_RISE_MAX,                                       "糧の自動変換開始量　",   "自動で糧を他の資源に変換し始める量指定します。", 10, 5);
    ccreateTextBox(td311, "OPT_TO_WOOD",        OPT_TO_WOOD,                                        "木に変換する糧の量　",   "自動で木に変換する糧の量を指定します。", 10, 5);
    ccreateTextBox(td311, "OPT_TO_STONE",       OPT_TO_STONE,                                       "石に変換する糧の量　",   "自動で石に変換する糧の量を指定します。", 10, 5);
    ccreateTextBox(td311, "OPT_TO_IRON",        OPT_TO_IRON,                                        "鉄に変換する糧の量　",   "自動で鉄に変換する糧の量を指定します。", 10, 5);

    ccreateComboBox(td312, "OPT_ICHIBA_PA", OPT_ICHIBA_PATS, OPT_ICHIBA_PA, "変換パターン　　",             "平均変換：糧が一定量になった際に変換指定している一番少ない資源を変換します。   一括変換：糧が一定量になった際に指定してある資源を指定値変換します。",5);
    ccreateTextBox(td312, "OPT_MAX_WOOD",   OPT_MAX_WOOD,                                           "木の最大保持量　", "木の最大保持量を設定します（0で倉庫上限まで）", 10, 5);
    ccreateTextBox(td312, "OPT_MAX_STONE",  OPT_MAX_STONE,                                  "石の最大保持量　", "石の最大保持量を設定します（0で倉庫上限まで）", 10, 5);
    ccreateTextBox(td312, "OPT_MAX_IRON",   OPT_MAX_IRON,                                           "鉄の最大保持量　", "鉄の最大保持量を設定します（0で倉庫上限まで）", 10, 5);

    // ===== 寄付設定 =====

    var Contribution_Box = d.createElement("table");
    Contribution_Box.style.margin = "0px 4px 4px 0px";
    Contribution_Box.style.border ="solid 2px black";
    Contribution_Box.style.width = "100%";

    var tr400 = d.createElement("tr");
    tr400.style.border = "solid 1px black";
    tr400.style.backgroundColor =COLOR_TITLE;

    var td401 = d.createElement("td");
    ccreateCheckBox(td401, "OPT_KIFU", OPT_KIFU, " 自動寄付", "この都市に来たら、自動的に寄付します。", 0);

    var tr411 = d.createElement("tr");
    tr411.style.border = "solid 1px black";
    tr411.style.backgroundColor =COLOR_BACK;

    var td411 = d.createElement("td");
    td411.style.padding = "3px";
    td411.style.verticalAlign = "top";
    ccreateTextBox(td411, "OPT_RISE_KIFU_MAX", OPT_RISE_KIFU_MAX, "糧が右の数量になったら寄付する　","自動で糧を寄付し始める量指定します。", 10, 5);
    ccreateTextBox(td411, "OPT_RISE_KIFU", OPT_RISE_KIFU,         "自動で糧を寄付する量　　　　　　","自動で糧を寄付する量指定します。", 10, 5);

    Contribution_Box.appendChild(tr400);
    tr400.appendChild(td401);
    Contribution_Box.appendChild(tr411);
    tr411.appendChild(td411);

    // ===== 宿舎ビルド＆スクラップ設定 =====

    var Scrap_Box = d.createElement("table");
    Scrap_Box.style.margin = "0px 4px 4px 0px";
    Scrap_Box.style.border ="solid 2px black";
    Scrap_Box.style.width = "100%";

    var tr510 = d.createElement("tr");
    tr510.style.border = "solid 1px black";
    tr510.style.backgroundColor =COLOR_TITLE;

    var td510 = d.createElement("td");
    td510.style.padding = "1px";
    td510.appendChild(createRadioBtn ('BS', '宿舎ビルスク'));

    var tr511 = d.createElement("tr");
    tr511.style.border = "solid 1px black";
    tr511.style.backgroundColor =COLOR_BACK;

    var td511 = d.createElement("td");
    td511.style.padding = "3px";
    td511.style.verticalAlign = "top";

    td511.appendChild(createRadioBtn2 ('DD', ' 宿舎対象　'));
    td511.appendChild(createRadioBtn2 ('HH', ' 畑対象　　'));
    ccreateTextBox(td511, "OPT_MAX", OPT_MAX,     "対象施設数　", "自動で建築/破棄する施設の数。", 5, 3);
    ccreateTextBox(td511, "OPT_MAXLV", OPT_MAXLV, "対象施設LV　",  "自動で建築/破棄する施設の最大LV。", 5, 3);

    Scrap_Box.appendChild(tr510);
    tr510.appendChild(td510);
    Scrap_Box.appendChild(tr511);
    tr511.appendChild(td511);

    // ===== 糧村化 ===

    var Field_Box = d.createElement("table");
    Field_Box.style.margin = "0px 4px 4px 0px";
    Field_Box.style.border ="solid 2px black";
    Field_Box.style.width = "100%";

    var tr600 = d.createElement("tr");
    tr600.style.border = "solid 1px black";
    tr600.style.backgroundColor =COLOR_TITLE;

    var td600 = d.createElement("td");
    ccreateCheckBox(td600,"OPT_KATEMURA", OPT_KATEMURA, " 糧村化", "この都市を糧村にする。平地に畑・倉庫・銅雀台を建てる。",0);

    var tr611 = d.createElement("td");
    tr611.style.border = "solid 1px black";
    tr611.style.backgroundColor =COLOR_BACK;

    var td611 = d.createElement("td");
    td611.style.padding = "3px";
    td611.style.verticalAlign = "top";
    ccreateTextBox(td611,"OPT_SOUKO_MAX", OPT_SOUKO_MAX,"設置する倉庫の数　","設置する倉庫の数を指定してください。",4,0);

    var tr_shigen = d.createElement("tr");
    tr_shigen.style.border = 'solid 1px black';
    tr_shigen.style.backgroundColor = COLOR_TITLE;

    var td_shigen = d.createElement("td");
    ccreateCheckBox(td_shigen, "OPT_SHIGEN", OPT_SHIGEN, "資源村化", "", 0);


    Field_Box.appendChild(tr600);
    tr600.appendChild(td600);
    Field_Box.appendChild(tr611);
    tr611.appendChild(td611);

    Field_Box.appendChild(tr_shigen);
    tr_shigen.appendChild(td_shigen);

    // ==== 自動兵産設定 ====
    var soldier_box = create_soldier_box(soldiers());

    // ===== 自動 武器・防具強化 ====

    var blacksmith_box = create_blacksmith_box(soldiers());

    // ===== 残す資源量 ====

    var Storage_Box = d.createElement("table");
    Storage_Box.style.border ="solid 2px black";
    Storage_Box.style.marginBottom = "4px";
    Storage_Box.style.width = "100%";

    var tra10 = d.createElement("tr");
    tra10.style.border = "solid 1px black";
    tra10.style.backgroundColor =COLOR_TITLE;

    var tda10 = d.createElement("td");
    ccreateText(tda10, "dummy", "■ 自動造兵・武器防具強化時に残す資源量 ■", 0);

    var tra1 = d.createElement("tr");
    tra1.style.border = "solid 1px black";
    tra1.style.backgroundColor =COLOR_BACK;
    var tda1 = d.createElement("td");
    tda1.style.padding = "3px";
    var tra11 = d.createElement("tr");
    var tra21 = d.createElement("tr");
    var tda11 = d.createElement("td");
    tda11.style.padding = "3px";
    tda11.style.verticalAlign = "bottom";
    var tda12 = d.createElement("td");
    tda12.style.padding = "3px";
    tda12.style.verticalAlign = "top";
    tda12.style.textAlign = "center";
    var tda13 = d.createElement("td");
    tda13.style.padding = "3px";
    tda13.style.verticalAlign = "top";
    tda13.style.textAlign = "center";
    var tda14 = d.createElement("td");
    tda14.style.padding = "3px";
    tda14.style.verticalAlign = "top";
    tda14.style.textAlign = "center";
    var tda15 = d.createElement("td");
    tda15.style.padding = "3px";
    tda15.style.verticalAlign = "top";
    tda15.style.textAlign = "center";
    var tda16 = d.createElement("td");
    tda16.style.padding = "3px";
    tda16.style.verticalAlign = "top";
    tda16.style.textAlign = "center";

    Storage_Box.appendChild(tra10);
    tra10.appendChild(tda10);
    Storage_Box.appendChild(tra1);
    tra1.appendChild(tda1);
    tda1.appendChild(tra11);

    tra11.appendChild(tda11);
    tra11.appendChild(tda12);
    tra11.appendChild(tda13);
    tra11.appendChild(tda14);
    tra11.appendChild(tda15);
    tra11.appendChild(tda16);


    ccreateText(tda11, "dummy", "　", 0);
    ccreateText(tda11, "dummy", "残す資源量", 0);

    ccreateText(tda12, "dummy", "木", 0);
    ccreateTextBox(tda12,"OPT_BLD_WOOD", OPT_BLD_WOOD,"","木を残す量",7,0);
    ccreateText(tda13, "dummy", "石", 0);
    ccreateTextBox(tda13,"OPT_BLD_STONE", OPT_BLD_STONE,"","石を残す量",7,0);
    ccreateText(tda14, "dummy", "鉄", 0);
    ccreateTextBox(tda14,"OPT_BLD_IRON", OPT_BLD_IRON,"","鉄を残す量",7,0);
    ccreateText(tda15, "dummy", "糧", 0);
    ccreateTextBox(tda15,"OPT_BLD_RICE", OPT_BLD_RICE,"","糧を残す量",7,0);
    ccreateButton(tda16, "初期化", "残す資源量の設定内容を消去します。", function() {
                      clearInitRemainingRes();
                  }, 54, 10);

    // ===== 確認 ====

    var Operation_Box = d.createElement("table");
    Operation_Box.style.border ="solid 0px gray";

    var tr711 = d.createElement("tr");
    var td711 = d.createElement("td");
    td711.style.padding = "3px";
    td711.style.verticalAlign = "top";

    Operation_Box.appendChild(tr711);
    tr711.appendChild(td711);

    ccreateButton(td711, "保存", "設定内容を保存します", function() {
                      SaveInifacBox(ABfacContainer.getAttribute('vId'));
                      closeInifacBox();
                      clearInterval(tidMain2);
                  });
    ccreateButton(td711, "閉じる", "設定内容を保存せず閉じます", function() {
                      closeInifacBox();
                      clearInterval(tidMain2);
                  });


    if (vId == villages[0][IDX_XY]) {
        ccreateButton(td711, "市場情報初期化", "市場情報を初期化します", function() {
                          csaveData(HOST+"ShopList",[],true,true);
                          reopen();
                          alert("市場情報を初期化しました");
                      }, 90);
    }

    // == コンテナ設定 ==
    // 上段
    var tbl000 = d.createElement("table");  // 全体
    tbl000.style.border = "solid 0px lime";

    var tr000 = d.createElement("tr");
    var td001 = d.createElement("td");  // 左枠
    td001.style.verticalAlign = "top";
    td001.style.width = "Auto";
    td001.appendChild(Build_Box);
    td001.appendChild(Domestic_Box);

    var td002 = d.createElement("td");  // 右枠
    td002.style.verticalAlign = "top";
    td002.style.paddingLeft = "4px";
    td002.style.width = "Auto";
    td002.appendChild(Scrap_Box);
    td002.appendChild(Field_Box);


    td002.appendChild(Contribution_Box);
    td002.appendChild(Storage_Box);
    td002.appendChild(Market_Box);

    // 本拠地かどうか
    if (vId != villages[0][IDX_XY]) {
        Market_Box.style.visibility = "hidden";
    }

    // 中段
    var tbl010 = d.createElement("table");
    tbl010.style.border = "solid 0px red";

    var tr010 = d.createElement("tr");
    tr010.style.verticalAlign = "top";

    var td011 = d.createElement("td");

    var td012 = d.createElement("td");

    var td013 = d.createElement("td");

    //  レイアウト

    ABfacContainer.appendChild(tbl000);
    tbl000.appendChild(tr000);
    tr000.appendChild(td001);
    tr000.appendChild(td002);

    ABfacContainer.appendChild(tbl010);
    tbl010.appendChild(tr010);
    tr010.appendChild(td011);
    tr010.appendChild(td012);
    tr010.appendChild(td013);
    ABfacContainer.appendChild(soldier_box);
    ABfacContainer.appendChild(blacksmith_box);
    ABfacContainer.appendChild(Operation_Box);

}

// ラジオボタン生成 @@@@ add 2011.09.06
function createRadioBtn (value, txt) {
    var radioLabel = document.createElement('label');
    radioLabel.style.display = 'inline-block';
    radioLabel.style.margin = '0 5px 0 0';
    radioLabel.style.padding = '0px';
    radioLabel.addEventListener('click', function() {
                                    OPT_BLD = value;
                                }, true);
    var radioLabelText = document.createTextNode(" " + txt);
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'tweetOpt';
    radioButton.value = value;
    radioButton.style.verticalAlign = "top";

    if (OPT_BLD == value) radioButton.checked = true;
    radioLabel.appendChild(radioButton);
    radioLabel.appendChild(radioLabelText);
    return radioLabel;
}

function createRadioBtn2 (value, txt) {
    var radioLabel = document.createElement('label');
    radioLabel.style.display = 'inline-block';
    radioLabel.style.margin = '0 5px 0 0';
    radioLabel.style.padding = '0px';
    radioLabel.addEventListener('click', function() {
                                    OPT_SorH = value;
                                }, true);
    var radioLabelText = document.createTextNode(txt);
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'SorH';
    radioButton.value = value;

    radioButton.style.verticalAlign = "top";
    if (OPT_SorH == value) radioButton.checked = true;
    radioLabel.appendChild(radioButton);
    radioLabel.appendChild(radioLabelText);
    return radioLabel;
}

//拠点単位の設定の保存（XY MAX_LV CheckData)
function SaveInifacBox(vId) {

    // 本拠地
    var i;
    var opt = $("OPT_MAX_LV");
    strSave = cgetTextBoxValue(opt) + DELIMIT1;
    for (i = 0; i <= 22; i++) {
        var opt = $("OPT_CHKBOX"+i);
        strSave += cgetCheckBoxValue(opt) + DELIMIT2;
    }
    //市場変換処理用
    strSave += cgetCheckBoxValue($("OPT_ICHIBA")) + DELIMIT2; //市場で変換するかどうかのフラグ
    strSave += cgetTextBoxValue($("OPT_RISE_MAX")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_TO_WOOD")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_TO_STONE")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_TO_IRON")) + DELIMIT2;
    //糧村化
    strSave += cgetCheckBoxValue($("OPT_KATEMURA")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_SOUKO_MAX")) + DELIMIT2;

    //自動寄付用
    strSave += cgetCheckBoxValue($("OPT_KIFU")) + DELIMIT2; //寄付するかどうかのフラグ
    strSave += cgetTextBoxValue($("OPT_RISE_KIFU_MAX")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_RISE_KIFU")) + DELIMIT2; //自動内政用に修正

    strSave += cgetComboBoxValue($("OPT_ICHIBA_PA")) + DELIMIT2; //市場での変換パターンフラグ
    try {
        strSave += cgetCheckBoxValue($("OPT_DOME1")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME2")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME3")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME4")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME5")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME6")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME7")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME8")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME9")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME10")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME11")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME12")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME13")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME14")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME15")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME16")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME17")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME18")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME19")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME20")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME21")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME22")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME23")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME24")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME25")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME26")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME27")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME28")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME29")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME30")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME31")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME32")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME33")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME34")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME35")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME36")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME37")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME38")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME39")) + DELIMIT2; //内政使用するかのフラグ
        strSave += cgetCheckBoxValue($("OPT_DOME40")) + DELIMIT2; //内政使用するかのフラグ
    } catch(e) {
        strSave += 0 + DELIMIT2; //内政使用するかのフラグ
    }
    // 施設ごとの建設レベル保存用
    for (i = 0; i <= 22; i++) {
        var opt = $("OPT_CHKBOXLV" + i);
        strSave += cgetTextBoxValue(opt) + DELIMIT2;
    }

    strSave += cgetTextBoxValue($("OPT_MAX_WOOD")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_MAX_STONE")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_MAX_IRON")) + DELIMIT2;

    strSave += OPT_BLD   + DELIMIT2;            // 建築 or ビルスク
    strSave += OPT_SorH  + DELIMIT2;            // 畑 or 宿舎
    strSave += cgetTextBoxValue($("OPT_MAX")) + DELIMIT2;   // 対象上限数

    if (cgetTextBoxValue($("OPT_MAXLV")) < 16) {
        strSave += cgetTextBoxValue($("OPT_MAXLV")) + DELIMIT2; // 対象上限LV
    } else {
        strSave += 15 + DELIMIT2;   // 対象上限LV
    }
    // 兵作成情報の保存
    for (i = 0; i < 14; i++) {
        var opt = $("OPT_SOL_MAX" + i);
        strSave += cgetTextBoxValue(opt) + DELIMIT2;
    }
    for (i = 0; i < 14; i++) {
        var opt = $("OPT_SOL_ADD" + i);
        strSave += cgetTextBoxValue(opt) + DELIMIT2;
    }
    strSave += cgetCheckBoxValue($("OPT_BLD_SOL")) + DELIMIT2;; //自動造兵するかのフラグ

    strSave += cgetTextBoxValue($("OPT_BLD_WOOD"))  + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_BLD_STONE")) + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_BLD_IRON"))  + DELIMIT2;
    strSave += cgetTextBoxValue($("OPT_BLD_RICE"))  + DELIMIT2;

    for (i = 0; i < 14; i++) {
        if ((i == 10) || (i == 11)) {
            strSave += "0" + DELIMIT2;
        } else {
            var opt = $("OPT_BK_LV" + i);
            if (cgetTextBoxValue(opt) > 10) {
                strSave += "10" + DELIMIT2;
            } else {
                strSave += cgetTextBoxValue(opt) + DELIMIT2;
            }
        }
    }
    for (i = 0; i < 14; i++) {
        var opt = $("OPT_BG_LV" + i);
        if (cgetTextBoxValue(opt) > 10) {
            strSave += "10" + DELIMIT2;
        } else {
            strSave += cgetTextBoxValue(opt) + DELIMIT2;
        }
    }
    strSave += cgetCheckBoxValue($("OPT_BKBG_CHK")) + DELIMIT2; //自動武器・防具強化するかのフラグ
    strSave += cgetCheckBoxValue($("OPT_SHIGEN")) + DELIMIT2;
    GM_setValue(HOST + PGNAME + vId, strSave);
}

//拠点単位の設定の読み込み
function Load_OPT(vId) {

    debugLog("=== Start Load_OPT ===");
    var src = GM_getValue(HOST+PGNAME+vId, "");
    if (src == "") {
        debugLog("拠点データなし");
        // 拠点データがない場合

        OPT_KATEMURA = 0;
        OPT_SHIGEN = 0;
        OPT_SOUKO_MAX = 0;
        OPT_KIFU = 0;
        OPT_RISE_KIFU_MAX = 0;
        OPT_RISE_KIFU = 0;
        for (i = 1; i <= 40; i++) {
            OPT_DOME[i] = 0;
        }
        for (i = 0; i <= 22; i++) {
            OPT_CHKBOX[i] = 0;
            OPT_CHKBOXLV[i] = "0";
        }

        //市場変換処理用 （本拠地情報にデータがある）
        var villages = loadVillages(HOST+PGNAME);
        var src2 = GM_getValue(HOST+PGNAME+villages[0][IDX_XY], "");
        if (src2 == "") {
            OPT_ICHIBA    = 0;      // 市場自動変換の利用有無
            OPT_RISE_MAX  = 0;      // 糧の自動変換開始量
            OPT_TO_WOOD   = 0;      // 木に変換する糧の量
            OPT_TO_STONE  = 0;      // 石　　　 〃
            OPT_TO_IRON   = 0;      // 鉄       〃
            OPT_ICHIBA_PA = 0;      // 変換パターン
            OPT_MAX_WOOD  = 0;      // 木の最大保持量（この量を超えたら変換しない）
            OPT_MAX_STONE = 0;      // 石    〃
            OPT_MAX_IRON  = 0;      // 鉄    〃
        } else {
            var shiroTemp  = src2.split(DELIMIT1);
            var shiroTemp2 = shiroTemp[1].split(DELIMIT2);

            OPT_ICHIBA = forInt(shiroTemp2[23]);            // 市場自動変換の利用有無
            OPT_RISE_MAX = forInt(shiroTemp2[24]);      // 糧の自動変換開始量
            OPT_TO_WOOD = forInt(shiroTemp2[25]);           // 木に変換する糧の量
            OPT_TO_STONE = forInt(shiroTemp2[26]);      // 石　　　 〃
            OPT_TO_IRON = forInt(shiroTemp2[27]);           // 鉄       〃
            OPT_ICHIBA_PA = shiroTemp2[33];             // 変換パターン
            OPT_MAX_WOOD = forInt(shiroTemp2[97]);      // 木の最大保持量（この量を超えたら変換しない）
            OPT_MAX_STONE = forInt(shiroTemp2[98]);     // 石    〃
            OPT_MAX_IRON = forInt(shiroTemp2[99]);      // 鉄    〃
        }
        // ビルスク情報
        OPT_BLD = "AC";
        OPT_SorH = "DD";
        OPT_MAX   = 0;
        OPT_MAXLV = 0;
        OPT_MAX   = 6;
        OPT_MAXLV = 6;

        // 兵作成情報
        for (i = 0; i < 14; i++) {
            OPT_SOL_MAX[i] = 0;
            OPT_SOL_MAX[i] = 0;
        }
        for (i = 0; i < 14; i++) {
            OPT_SOL_ADD[i] = 0;
            OPT_SOL_ADD[i] = 0;
        }
        OPT_BLD_SOL   = 0;
        OPT_BLD_WOOD  = 0;
        OPT_BLD_STONE = 0;
        OPT_BLD_IRON  = 0;
        OPT_BLD_RICE  = 0;

        OPT_BLD_WOOD  = 0;
        OPT_BLD_STONE = 0;
        OPT_BLD_IRON  = 0;
        OPT_BLD_RICE  = 0;

        for (i = 0; i < 14; i++) {
            OPT_BK_LV[i] = 0;
            OPT_BK_LV[i]  = 0;
        }
        for (i = 0; i < 14; i++) {
            OPT_BG_LV[i] = 0;
            OPT_BG_LV[i]  = 0;
        }
        OPT_BKBG_CHK  = 0;

        return;
    } else {
        // 拠点データの読込
        var Temp = src.split(DELIMIT1);
        OPT_MAX_LV = Temp[0];
        var Temp2 = Temp[1].split(DELIMIT2);
        var i;
        for (i = 0; i <= 22; i++) {
            if (Temp2[i] == "") {return;}
            OPT_CHKBOX[i] = forInt(Temp2[i]);
        }
        //糧村化
        if (Temp2[28] == "") {return;}
        OPT_KATEMURA = forInt(Temp2[28]);
        OPT_SHIGEN = forInt(Temp2[166]);
        OPT_SOUKO_MAX = forInt(Temp2[29]);

        //自動寄付
        if (Temp2[30] == "") {return;}
        OPT_KIFU = forInt(Temp2[30]);
        OPT_RISE_KIFU_MAX = forInt(Temp2[31]);
        OPT_RISE_KIFU = forInt(Temp2[32]);

        for (i = 1; i <= 40; i++) {
            OPT_DOME[i]  = forInt(Temp2[33 + i]);
        }
        for (i = 0; i <= 22; i++) {
            OPT_CHKBOXLV[i] = forInt(Temp2[74 + i]);
        }

        //市場変換処理用は本拠地データを取得
        var villages = loadVillages(HOST+PGNAME);
        var src2 = GM_getValue(HOST+PGNAME+villages[0][IDX_XY], "");
        if (src2 == "") {
            OPT_ICHIBA    = 0;      // 市場自動変換の利用有無
            OPT_RISE_MAX  = 0;      // 糧の自動変換開始量
            OPT_TO_WOOD   = 0;      // 木に変換する糧の量
            OPT_TO_STONE  = 0;      // 石　　　 〃
            OPT_TO_IRON   = 0;      // 鉄       〃
            OPT_ICHIBA_PA = 0;      // 変換パターン
            OPT_MAX_WOOD  = 0;      // 木の最大保持量（この量を超えたら変換しない）
            OPT_MAX_STONE = 0;      // 石    〃
            OPT_MAX_IRON  = 0;      // 鉄    〃
        } else {

            var shiroTemp  = src2.split(DELIMIT1);
            var shiroTemp2 = shiroTemp[1].split(DELIMIT2);

            OPT_ICHIBA = forInt(shiroTemp2[23]);            // 市場自動変換の利用有無

            OPT_RISE_MAX = forInt(shiroTemp2[24]);      // 糧の自動変換開始量
            OPT_TO_WOOD = forInt(shiroTemp2[25]);           // 木に変換する糧の量
            OPT_TO_STONE = forInt(shiroTemp2[26]);      // 石　　　 〃
            OPT_TO_IRON = forInt(shiroTemp2[27]);           // 鉄       〃

            OPT_ICHIBA_PA = shiroTemp2[33];                 // 変換パターン

            OPT_MAX_WOOD = forInt(shiroTemp2[97]);      // 木の最大保持量（この量を超えたら変換しない）
            OPT_MAX_STONE = forInt(shiroTemp2[98]);     // 石    〃
            OPT_MAX_IRON = forInt(shiroTemp2[99]);      // 鉄    〃
        }

        // ビルスク情報
        OPT_BLD = Temp2[100];
        OPT_SorH = Temp2[101];
        OPT_MAX  = Temp2[102];
        OPT_MAXLV  = Temp2[103];
        if (OPT_MAX == undefined) { OPT_MAX = 6; }
        if (OPT_MAXLV == undefined || OPT_MAXLV > 15) { OPT_MAXLV = 6; }

        // 兵作成情報
        for (i = 0; i < 14; i++) {
            OPT_SOL_MAX[i] = forInt(Temp2[104 + i]);
            if (isNaN(OPT_SOL_MAX[i])) { OPT_SOL_MAX[i]  = 0; };
        }
        for (i = 0; i < 14; i++) {
            OPT_SOL_ADD[i] = forInt(Temp2[118 + i]);
            if (isNaN(OPT_SOL_ADD[i])) { OPT_SOL_ADD[i]  = 0; };
        }
        OPT_BLD_SOL  = forInt(Temp2[132]);

        OPT_BLD_WOOD  = forInt(Temp2[133]);
        OPT_BLD_STONE = forInt(Temp2[134]);
        OPT_BLD_IRON  = forInt(Temp2[135]);
        OPT_BLD_RICE  = forInt(Temp2[136]);

        if (isNaN(OPT_BLD_WOOD))  { OPT_BLD_WOOD  = 0; };
        if (isNaN(OPT_BLD_STONE)) { OPT_BLD_STONE = 0; };
        if (isNaN(OPT_BLD_IRON))  { OPT_BLD_IRON  = 0; };
        if (isNaN(OPT_BLD_RICE))  { OPT_BLD_RICE  = 0; };

        for (i = 0; i < 14; i++) {
            OPT_BK_LV[i] = forInt(Temp2[137 + i]);
            if (isNaN(OPT_BK_LV[i])) { OPT_BK_LV[i]  = 0; };
        }

        for (i = 0; i < 14; i++) {
            OPT_BG_LV[i] = forInt(Temp2[151 + i]);
            if (isNaN(OPT_BG_LV[i])) { OPT_BG_LV[i]  = 0; };

        }

        OPT_BKBG_CHK  = forInt(Temp2[165]);
    }
}
//ユーザプロフィール画面の拠点情報を取得
function getUserProf(htmldoc) {
    var oldVillages = loadVillages(HOST+PGNAME);
    var newVillages = new Array();
    var landElems = document.evaluate(
        '//*[@id="gray02Wrapper"]//table/tbody/tr',
        htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var isLandList = false;
    for (var i = 0; i < landElems.snapshotLength; i++) {
        var item = landElems.snapshotItem(i);

        if (!isLandList) {
            var childElement = getChildElement(item, 0);
            if (childElement && trim(childElement.innerHTML) === "名前") {
                isLandList = true;
            }
            continue;
        }

        //名前項目を取得
        var nameElem = getChildElement(getChildElement(item, 0), 0);
        var name = trim(nameElem.innerHTML);
        var url = nameElem.href;

        //座標項目を取得
        var xy = "(" + getChildElement(item, 1).innerHTML.match(/-?[0-9]+\,-?[0-9]+/i) + ")";


        //人口項目を取得
        var popul = getChildElement(item, 2).innerHTML;

        //拠点じゃなければ終了
        if (!isNumeric(popul)) {
            break;
        }

        //データマージ
        var newVil = new Array();
        newVil[IDX_ACTIONS] = new Array();
        for (var j = 0; j < oldVillages.length; j++) {
            if (xy == oldVillages[j][IDX_XY]) {
                newVil = oldVillages[j];
            }
        }
        newVil[IDX_XY] = xy;
        newVil[IDX_BASE_NAME] = name;
        newVil[IDX_URL] = url;
        newVil[IDX_BASE_ID]=getParameter2(url, "village_id");
        newVillages.push(newVil);
    }

    saveVillages(HOST+PGNAME, newVillages);
}

function newLoadVillages() {
    return JSON.parse(GM_getValue('villages.json', '[]') || '[]');
}

//拠点情報を読み出し
function loadVillages(hostname) {
    var ret = new Array();

    var src = GM_getValue(hostname, "");
    if (src == "") return ret;

    var villages = src.split(DELIMIT1);
    for (var i = 0; i < villages.length; i++) {
        var fields = villages[i].split(DELIMIT2);

        ret[i] = new Array();
        ret[i][IDX_XY] = fields[IDX_XY];
        ret[i][IDX_BASE_NAME] = fields[IDX_BASE_NAME];
        ret[i][IDX_URL] = fields[IDX_URL];
        ret[i][IDX_BASE_ID] = fields[IDX_BASE_ID];

        ret[i][IDX_ACTIONS] = new Array();
        if (fields[IDX_ACTIONS] == "") continue;
        var actions = fields[IDX_ACTIONS].split(DELIMIT3);
        for (var j = 0; j < actions.length; j++) {
            ret[i][IDX_ACTIONS][j] = new Array();
            if (actions[j] == "") continue;

            var item = actions[j].split(DELIMIT4);
            if (item[IDX2_TYPE] == undefined) item[IDX2_TYPE] = "C";

            ret[i][IDX_ACTIONS][j][IDX2_STATUS] = item[IDX2_STATUS];
            ret[i][IDX_ACTIONS][j][IDX2_TIME] = item[IDX2_TIME];
            ret[i][IDX_ACTIONS][j][IDX2_TYPE] = item[IDX2_TYPE];
            ret[i][IDX_ACTIONS][j][IDX2_ALERTED] = item[IDX2_ALERTED];
            ret[i][IDX_ACTIONS][j][IDX2_DELETE] = item[IDX2_DELETE];
            ret[i][IDX_ACTIONS][j][IDX2_ROTATION] = item[IDX2_ROTATION];
        }
    }
    return ret;
}
//拠点情報を保存
function saveVillages(hostname, newData) {
    var hash_array = [];
    //配列をデリミタ区切り文字列に変換
    var newDataStr = new Array();
    for (var i = 0; i < newData.length; i++) {
        var villageData = newData[i];
        var actions = villageData[IDX_ACTIONS];
        var actions_array = [];
        for (var j = 0; j < actions.length; j ++) {
            var action = actions[j];
            var status = action[0];
            var level = null;
            var matched = null;
            var user = null;
            var skill_name = null;
            matched = status.match(/(.+?):([^\(]+)/);
            var act = matched[1];
            var name = matched[2];
            matched = status.match(/<strong>(\d+)/);
            if (matched) {
                level = parseInt(matched[1]);
            }
            matched = status.match(/\((.+):(.+)LV(.+)\)/);
            if (matched) {
                user = matched[1];
                skill_name = matched[2];
                level = matched[3];
            }
            var type = null;
            switch(action[IDX2_TYPE]) {
            case "C":
                type = 'building';
                break;
            case "D":
                type = 'skill';
                break;
            default:
                type = 'unknown';
            }

            var action_hash = {
                action: act,
                target: name,
                level: level,
                user: user,
                skill_name: skill_name,
                at: action[IDX2_TIME],
                type: type,
                alerted: action[IDX2_ALERTED],
                delete: action[IDX2_DELETE],
                rotation: action[IDX2_ROTATION]
            };
            actions_array.push(action_hash);
        }
        var position = villageData[IDX_XY];
        var matches = position.match(/(-?\d+)\s*,\s*(-?\d+)/);
        var x = parseInt(matches[1]);
        var y = parseInt(matches[2]);
        var hash = {
            name: villageData[IDX_BASE_NAME],
            position: {x: x, y: y},
            url: villageData[IDX_URL],
            id: parseInt(villageData[IDX_BASE_ID]),
            actions: actions_array
        };
        //配列をデリミタ区切り文字列に変換
        for (var j = 0; j < actions.length; j++) {
            actions[j] = genDelimitString(actions[j], DELIMIT4);
        }
        villageData[IDX_ACTIONS] = genDelimitString(actions, DELIMIT3);
        villageData[INDEX_HASH] = JSON.stringify(hash);
        hash_array.push(hash);
        newDataStr[i] = genDelimitString(villageData, DELIMIT2);
    }
    if (newDataStr.length == 0) {
        return ;
    }
    //Greasemondey領域へ永続保存
    GM_setValue(hostname, genDelimitString(newDataStr, DELIMIT1));
    GM_setValue('villages.json', JSON.stringify(hash_array));

}

//デリミタ区切り文字列生成
function genDelimitString(dataArray, delimiter) {
    var ret = "";
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i] != undefined) ret += dataArray[i];
        if (i < dataArray.length-1) ret += delimiter;
    }
    return ret;
}

//URLパラメータ取得
function getParameter(key) {
    var str = location.search.split("?");
    if (str.length < 2) {
        return "";
    }

    var params = str[1].split("&");
    for (var i = 0; i < params.length; i++) {
        var keyVal = params[i].split("=");
        if (keyVal[0] == key && keyVal.length == 2) {
            return decodeURIComponent(keyVal[1]);
        }
    }
    return "";
}

function padZero(num) {
    var result;
    if (num < 10) {
        result = "0" + num;
    } else {
        result = "" + num;
    }
    return result;
}

function trimZero(str) {
    var res = str.replace(/^0*/, "");
    if (res == "") {
        res = "0";
    }
    return res;
}

function trim(str) {
    if (str == undefined) {
        return "";
    }
    return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//数値チェック
function isNumeric(num) {
    if (num.match(/^-?[0-9]+$/)) {
        return true;
    }
    return false;
}

//子Element取得
function getChildElement(parentNode, position) {
    var current = 0;
    for (var i = 0; i < parentNode.childNodes.length; i++) {
        var childNode = parentNode.childNodes[i];
        if (childNode.nodeType == 1) {
            if (current == position) {
                return childNode;
            }
            current++;
        }
    }

    return undefined;
}

//時刻計算（現在時刻に加算、引数hh:mm:ss）
function computeTime(clock) {
    var hour = parseInt(trimZero(
                            clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$1")));
    if (isNaN(hour)) hour = 0;
    var min = parseInt(trimZero(
                           clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$2")));
    if (isNaN(min)) min = 0;
    var sec = parseInt(trimZero(
                           clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$3")));
    if (isNaN(sec)) sec = 0;

    var now = new Date();
    var resTime = new Date();
    resTime.setHours(now.getHours() + hour);
    resTime.setMinutes(now.getMinutes() + min);
    resTime.setSeconds(now.getSeconds() + sec);

    return resTime;
}

//日時文字列編集（yyyy/mm/dd hh:mm:ss）
function generateDateString(date) {
    var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) +
        "/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" +
        padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
    return res;
}

//日時文字列編集2（mm/dd hh:mm:ss）
function generateDateString2(date) {
    var res = "" + padZero(date.getMonth() + 1) + "/" + padZero(date.getDate()) +
        " " + padZero(date.getHours()) + ":" + padZero(date.getMinutes()) +
        ":" + padZero(date.getSeconds());;
    return res;
}

//残時間文字列編集
function generateWaitTimeString(time1, time2) {
    var result = "";

    var waitTimeSec = Math.ceil((time1.getTime() - time2.getTime()) / 1000);
    if (waitTimeSec < 0) { waitTimeSec = 0; }
    result += Math.floor(waitTimeSec / (60*60));
    result += ":";
    result += padZero(Math.floor((waitTimeSec % (60*60)) / 60));
    result += ":";
    result += padZero(waitTimeSec % 60);

    return result;
}

function ccreateTextBox(container, id, def, text, title, size, left)
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "2px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var tb = d.createElement("input");
    tb.type = "text";
    tb.id = id;
    tb.value = def;
    tb.size = size;
    tb.style.textAlign = "right";
    tb.style.paddingRight = "3px";

    var tx = d.createTextNode(text);
    tx.title = title;

    dv.appendChild(tx);
    dv.appendChild(tb);
    container.appendChild(dv);
    return tb;
}

function ccreateText(container, id, text, left)
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "2px";
    dv.style.paddingLeft= left + "px";
    dv.style.paddingBottom = "2px";

    var lb = d.createElement("label");
    lb.htmlFor = id;
    lb.style.verticalAlign = "middle";
    var tx = d.createTextNode(text);
    tx.fontsize = "9px";
    lb.appendChild(tx);

    dv.appendChild(lb);
    container.appendChild(dv);
}

function jcreateCheckBox(container, id, def, text, title, left) {
    left += 2;
    var div = jQuery("<div>").css({"padding": "1px", "padding-left": left + "px"}).attr("title", title);

    var cb = jQuery("<input>").attr("type", "checkbox").css({"vertical-align": "middle"}).attr("id", id).val(1);

    if (def) {
        cb.attr("checked", true);
    }

    var lb = jQuery("<label>").attr("html-for", id).css({"vertical-align": "middle"}).text(text);

    div.append(cb).append(lb);
    container.append(div);
    return cb;
}

function ccreateCheckBox(container, id, def, text, title, left) {
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "1px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var cb = d.createElement("input");
    cb.type = "checkbox";
    cb.style.verticalAlign = "middle";
    cb.id = id;
    cb.value = 1;
    if (def) cb.checked = true;

    var lb = d.createElement("label");
    lb.htmlFor = id;
    lb.style.verticalAlign = "middle";

    var tx = d.createTextNode(text);
    lb.appendChild(tx);

    dv.appendChild(cb);
    dv.appendChild(lb);
    container.appendChild(dv);
    return cb;
}

function jcreateButton(container, text, title, func, width, top) {
    var btn = jQuery("<input>").css(
        {
            "padding": "0px",
            "height": "22px",
            "vertical-align": "middle"
        }).attr("type", "button").val(text);
    if (top != undefined) {
        btn.css("margin-top", top + "px");
    }
    if (width == undefined) {
        btn.css("width", "54px");
    } else {
        btn.css("width", width + "px");
    }
    container.append(btn);
    btn.click(function() {
                  func();
                  return false;
              });
    return btn;
}

function ccreateButton(container, text, title, func, width, top) {
    var btn = d.createElement("input");
    btn.style.padding = "0px";
    btn.type = "button";
    btn.value = text;
    if (top != undefined) {
        btn.style.marginTop = top + "px";
    }
    if (width == undefined) {
        btn.style.width = "54px";
    } else {
        btn.style.width = width + "px";
    }
    btn.style.height = "22px";
    btn.style.verticalAlign = "middle";
    btn.title = title;
    container.appendChild(d.createTextNode(" "));
    container.appendChild(btn);
    container.appendChild(d.createTextNode(" "));
    $e(btn, "click", func);
    return btn;
}

function cgetCheckBoxValue(id) {
    var c = id;
    if (!c) return 0;
    if (!c.checked) return 0;
    return 1;
}

function cgetTextBoxValue(id) {
    var c = id;
    if (!c) return "";
    return c.value;
}

function ccreateComboBox(container, id, sels, def, text, title, left) {
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "1px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var sel = d.createElement("select");
    sel.id = id;
    for (var i = 0; i < sels.length; i++) {
        var opt = d.createElement("option");
        opt.value = sels[i];
        opt.appendChild(d.createTextNode(sels[i]));
        sel.appendChild(opt);
    }
    if (def) sel.value = def;

    var tx = d.createTextNode(text);
    tx.title = title;

    dv.appendChild(tx);
    dv.appendChild(sel);
    container.appendChild(dv);
    return sel;
}
function cgetComboBoxValue(id) {
    var c = id;
    if (!c) return "";
    return c.value;
}

function getSoldier() {

    debugLog("=== Start getSoldier ===");

    var tables = document.evaluate('//*[@class="status village-bottom"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var Temp = tables.snapshotItem(0).innerHTML.substring(tables.snapshotItem(0).innerHTML.lastIndexOf(" ") + 1);
    aa = Temp.split("/");
    var now_Soldier = aa[0];
    var max_Soldier = aa[1];

    // 造兵指示がない場合はスキップ
    if (OPT_BLD_SOL == 0) {
        return;
    }

    var tid = $w(function() {
                     count_soldiers(function(total) {
                                        make_all_soldiers(total, soldiers());
                                    });
                 });
}

function sumMaxSoldier(type) {
    var SoldierCost = [
        [   1,   1,   1,   1],
        [  11,   1,  11,  61],  // 301 剣兵
        [   1,   1,   1,   1],
        [  88, 132,   1,  21],  // 303 槍兵
        [ 264, 396,   1,  61],  // 304 矛槍兵
        [   1, 128, 192,  41],  // 305 騎兵
        [   1,   1,   1,   1],
        [   1, 384, 576, 121],  // 307 近衛騎兵
        [ 144,   1,  96,  35],  // 308 弓兵
        [ 432,   1, 288, 105],  // 309 弩兵
        [ 151, 151, 151,   1],  // 310 斥候
        [ 451, 451, 451,  31],  // 311 斥候騎兵
        [ 501,   1, 501,   1],  // 312 衝車
        [   1,1501,1501,   1]   // 313 投石機
    ];

    var tables = document.evaluate('//*[@class="status village-bottom"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var Temp = tables.snapshotItem(0).innerHTML.substring(tables.snapshotItem(0).innerHTML.lastIndexOf(" ")+1);
    temp0 = Temp.split("/");
    var now_Soldier = temp0[0];
    var max_Soldier = temp0[1];
    var make_max = temp0[1] - temp0[0]; // 最大作成可能兵数

    type = type - 300;
    var wood = parseInt($("wood").innerHTML, 10);
    var stone = parseInt($("stone").innerHTML, 10);
    var iron = parseInt($("iron").innerHTML, 10);
    var rice = parseInt($("rice").innerHTML, 10);

    countWood  = parseInt((wood  - OPT_BLD_WOOD)  / SoldierCost[type][0]);
    countStone = parseInt((stone - OPT_BLD_STONE) / SoldierCost[type][1]);
    countIron  = parseInt((iron  - OPT_BLD_IRON)  / SoldierCost[type][2]);
    countRice  = parseInt((rice  - OPT_BLD_RICE)  / SoldierCost[type][3]);

    var MaxSoldir = countWood;
    if (MaxSoldir > countStone) { MaxSoldir = countStone; }
    if (MaxSoldir > countIron)  { MaxSoldir = countIron; }
    if (MaxSoldir > countRice)  { MaxSoldir = countRice; }

    if (make_max < MaxSoldir) { MaxSoldir = make_max; }     // 滞在可能上限を超えないこと
    return MaxSoldir;
}

// 資源オーバーフロー防止処理
function OverFlowPrevention() {

    var ichiba_x = -1; //市場のX座標
    var ichiba_y = -1; //市場のY座標
    var ichiba_lv = -1; //市場のレベル

    var area = new Array();
    area = get_area();

    for (i = 0; i < area.length; i++) {
        //市場の座標を取得
        if (area[i].name == "市場") {
            var Temp = area[i].xy.split(",");
            ichiba_x = Temp[0];
            ichiba_y = Temp[1];
            ichiba_lv = area[i].lv;
        }
    }

    if (ichiba_x < 0) { return; }

    // 現在の状態
    var RES_NOW = [];
    RES_NOW["wood"]     = parseInt($("wood").innerHTML,     10);  // 資源：木
    RES_NOW["stone"]    = parseInt($("stone").innerHTML,    10);  // 資源：石
    RES_NOW["iron"]     = parseInt($("iron").innerHTML,     10);  // 資源：鉄
    RES_NOW["rice"]     = parseInt($("rice").innerHTML,     10);  // 資源：糧
    RES_NOW["storagemax"]   = parseInt($("rice_max").innerHTML, 10);  // 倉庫容量

    var OverFlowLimit  = Math.floor(RES_NOW["storagemax"] * 0.95);      // 限界容量（倉庫の95%）
    var ChangeSigenNum = Math.floor(RES_NOW["storagemax"] * 0.05);      // 変換量（倉庫の5%）

    // 資源：木石鉄が限界を超えている場合
    if ((RES_NOW["wood"] > OverFlowLimit) && (RES_NOW["stone"] > OverFlowLimit) && (RES_NOW["iron"] > OverFlowLimit)) {
        var max_sigen = 0;
        if (RES_NOW["wood"]  > max_sigen) {
            max_sigen = RES_NOW["wood"];
            ChangeSigenNum = Math.floor(RES_NOW["wood"]  * 0.01);
        }
        if (RES_NOW["stone"] > max_sigen) {
            max_sigen = RES_NOW["stone"];
            ChangeSigenNum = Math.floor(RES_NOW["stone"] * 0.01);
        }
        if (RES_NOW["iron"]  > max_sigen) {
            max_sigen = RES_NOW["iron"];
            ChangeSigenNum = Math.floor(RES_NOW["iron"]  * 0.01);
        }

        if (RES_NOW["wood"] == max_sigen) {
            changeResorceToResorce(WOOD,  ChangeSigenNum, RICE, ichiba_x, ichiba_y);
        } else if (RES_NOW["stone"] == max_sigen) {
            changeResorceToResorce(STONE, ChangeSigenNum, RICE, ichiba_x, ichiba_y);
        } else if (RES_NOW["iron"] == max_sigen) {
            changeResorceToResorce(IRON,  ChangeSigenNum, RICE, ichiba_x, ichiba_y);
        }

    }
    // 資源：木が限界を超えているか？
    if (RES_NOW["wood"] > OverFlowLimit) {
        // 一番少ない資源を探せ！
        var min_sigen = 9999999999;
        if (RES_NOW["stone"] < min_sigen) { min_sigen = RES_NOW["stone"]; }
        if (RES_NOW["iron"]  < min_sigen) { min_sigen = RES_NOW["iron"]; }

        if (RES_NOW["stone"] == min_sigen) {
            changeResorceToResorce(WOOD, ChangeSigenNum, STONE, ichiba_x, ichiba_y);
        } else if (RES_NOW["iron"] == min_sigen) {
            changeResorceToResorce(WOOD, ChangeSigenNum, IRON, ichiba_x, ichiba_y);
        }
    }

    // 資源：石が限界を超えているか？
    if (RES_NOW["stone"] > OverFlowLimit) {
        // 一番少ない資源を探せ！
        var min_sigen = 9999999999;
        if (RES_NOW["wood"]  < min_sigen) { min_sigen = RES_NOW["wood"]; }
        if (RES_NOW["iron"]  < min_sigen) { min_sigen = RES_NOW["iron"]; }

        if (RES_NOW["wood"] == min_sigen) {
            changeResorceToResorce(STONE, ChangeSigenNum, WOOD, ichiba_x, ichiba_y);
        } else if (RES_NOW["iron"] == min_sigen) {
            changeResorceToResorce(STONE, ChangeSigenNum, IRON, ichiba_x, ichiba_y);
        }
    }

    // 資源：鉄が限界を超えているか？
    if (RES_NOW["iron"] > OverFlowLimit) {
        // 一番少ない資源を探せ！
        var min_sigen = 9999999999;
        if (RES_NOW["wood"]  < min_sigen) { min_sigen = RES_NOW["wood"]; }
        if (RES_NOW["stone"] < min_sigen) { min_sigen = RES_NOW["stone"]; }

        if (RES_NOW["wood"] == min_sigen) {
            changeResorceToResorce(IRON, ChangeSigenNum, WOOD, ichiba_x, ichiba_y);
        } else if (RES_NOW["stone"] == min_sigen) {
            changeResorceToResorce(IRON, ChangeSigenNum, STONE, ichiba_x, ichiba_y);
        }
    }

    // 資源：糧が限界を超えているか？
    if (RES_NOW["rice"] > OverFlowLimit) {
        // 一番少ない資源を探せ！
        var min_sigen = 9999999999;
        if (RES_NOW["wood"]  < min_sigen) { min_sigen = RES_NOW["wood"]; }
        if (RES_NOW["stone"] < min_sigen) { min_sigen = RES_NOW["stone"]; }
        if (RES_NOW["iron"]  < min_sigen) { min_sigen = RES_NOW["iron"]; }

        if (RES_NOW["wood"] == min_sigen) {
            changeResorceToResorce(RICE, ChangeSigenNum, WOOD, ichiba_x, ichiba_y);
        } else if (RES_NOW["stone"] == min_sigen) {
            changeResorceToResorce(RICE, ChangeSigenNum, STONE, ichiba_x, ichiba_y);
        } else if (RES_NOW["iron"] == min_sigen) {
            changeResorceToResorce(RICE, ChangeSigenNum, IRON, ichiba_x, ichiba_y);
        }
    }
}


//市場変換処理
function ichibaChange(vId) {

    debugLog("=== Start ichibaChange ===");

    var ichiba_x = -1; //市場のX座標
    var ichiba_y = -1; //市場のY座標
    var ichiba_lv = -1; //市場のレベル

    var area = new Array();
    area = get_area();
    for (i = 0; i < area.length; i++) {
        //市場の座標を取得
        if (area[i].name == "市場") {
            var Temp = area[i].xy.split(",");
            ichiba_x = Temp[0];
            ichiba_y = Temp[1];
            ichiba_lv = area[i].lv;
        }
    }

    if (ichiba_x < 0) {
        delShopList(vId);
    } else {
        addShopList(vId, ichiba_lv, ichiba_x, ichiba_y);
    }

    if (OPT_ICHIBA != 1) {
        //alert("市場自動変換未指定");
        return;
    }

    var RES_NOW = [];
    RES_NOW["wood"] = parseInt($("wood").innerHTML, 10);
    RES_NOW["stone"] = parseInt($("stone").innerHTML, 10);
    RES_NOW["iron"] = parseInt($("iron").innerHTML, 10);
    RES_NOW["rice"] = parseInt($("rice").innerHTML, 10);
    RES_NOW["storagemax"] = parseInt($("rice_max").innerHTML, 10);

    var CHG_NOW = [];
    CHG_NOW["wood"] = 1;
    CHG_NOW["stone"] = 1;
    CHG_NOW["iron"] = 1;

    if (OPT_MAX_WOOD  < 1) { OPT_MAX_WOOD  = RES_NOW["storagemax"]; }
    if (OPT_MAX_STONE < 1) { OPT_MAX_STONE = RES_NOW["storagemax"]; }
    if (OPT_MAX_IRON  < 1) { OPT_MAX_IRON  = RES_NOW["storagemax"]; }

    if (RES_NOW["wood"]  >= OPT_MAX_WOOD) { CHG_NOW["wood"]  = 0; }
    if (RES_NOW["stone"] >= OPT_MAX_STONE) { CHG_NOW["stone"] = 0; }
    if (RES_NOW["iron"]  >= OPT_MAX_IRON) { CHG_NOW["iron"]  = 0; }

    // 全部上限を超えていて
    if ((CHG_NOW["wood"] + CHG_NOW["stone"] + CHG_NOW["iron"]) == 0) {
        // 自動寄付も未設定の場合全部変換対象にする
        if (OPT_KIFU == 0) {
            CHG_NOW["wood"] = 1;
            CHG_NOW["stone"] = 1;
            CHG_NOW["iron"] = 1;
        }
    }

    //糧が指定量より多いかチェック
    if (RES_NOW["rice"] < OPT_RISE_MAX) return;
    if (OPT_RISE_MAX == 0) return;

    // 一番市場レベルの高い拠点へジャンプ 
    var shoplist = cloadData(HOST + "ShopList", "[]", true, true);
    if (shoplist.length == 0) return;
    shoplist.sort(function(a, b) {
                      if (a[1] < b[1]) return 1;
                      if (a[1] > b[1]) return -1;
                      return 0;
                  });
    if (vId != shoplist[0].vId) {
        // 一番市場のレベルの高い拠点へ移動
        var villages = loadVillages(HOST+PGNAME);
        var nextIndex = -1;
        for (var i = 0; i < villages.length; i++) {
            if (shoplist[0].vId == villages[i][IDX_XY]) {
                nextIndex = i;
                break;
            }
        }
        if (nextIndex != -1) {
            ShopFlg = true;
            ShopURL = villages[nextIndex][IDX_URL];
        }
        return;
    }

    if (OPT_ICHIBA_PATS[0] == OPT_ICHIBA_PA) {
        if (OPT_TO_WOOD + OPT_TO_STONE + OPT_TO_IRON == 0) {
            return;
        }

        var min_sigen = 9999999999;

        if ((OPT_TO_WOOD  > 0) && (RES_NOW["wood"]  < min_sigen && CHG_NOW["wood"] == 1)) { min_sigen = RES_NOW["wood"]; }
        if ((OPT_TO_STONE > 0) && (RES_NOW["stone"] < min_sigen && CHG_NOW["stone"] == 1)) { min_sigen = RES_NOW["stone"]; }
        if ((OPT_TO_IRON  > 0) && (RES_NOW["iron"]  < min_sigen && CHG_NOW["iron"] == 1)) { min_sigen = RES_NOW["iron"]; }

        //糧から他の資源に返還開始
        if ((OPT_TO_WOOD > 0) && (RES_NOW["wood"] == min_sigen)) {
            changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
        } else if ((OPT_TO_STONE > 0) && (RES_NOW["stone"] == min_sigen)) {
            changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
        } else if ((OPT_TO_IRON > 0) && (RES_NOW["iron"] == min_sigen)) {
            changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
        }
        return;
    } else {

        if (OPT_RISE_MAX >= OPT_TO_WOOD + OPT_TO_STONE + OPT_TO_IRON) {
            if (CHG_NOW["wood"] == 1) {
                changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
            }
            if (CHG_NOW["stone"] == 1) {
                changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
            }
            if (CHG_NOW["iron"] == 1) {
                changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
            }
        }
        return;
    }

    function addShopList(vId,lv,x,y) {
        var flg = 0;
        var shoplist = cloadData(HOST+"ShopList","[]",true,true);
        for (var i = 0; i < shoplist.length; i++) {
            if (shoplist[i].vId == vId) {
                shoplist[i].vId = vId;
                shoplist[i].lv = lv;
                shoplist[i].x = x;
                shoplist[i].y = y;
                flg = 1;
            }
        }
        if (flg == 0) {
            shoplist.push({"vId": vId, "lv": lv, "x": x, "y": y});
        }
        csaveData(HOST + "ShopList", shoplist, true, true);
        if (is_stay_mode()) {
            reopen();
        }
    }

    function delShopList(vId) {
        var shoplist = cloadData(HOST+"ShopList","[]",true,true);
        for (var i = 0; i < shoplist.length; i++) {
            if (shoplist[i].vId == vId) {
                shoplist.splice(i,1);
                csaveData(HOST+"ShopList",shoplist,true,true);
            }
        }

        if (is_stay_mode()) {
            reopen();
        }
    }
}

function changeResorceToResorce(from, tc, to, x, y) {

    var c = {};
    c['x'] = parseInt(x);
    c['y'] = parseInt(y);
    c['change_btn'] = encodeURIComponent("はい");
    c['tc'] = parseInt(tc);
    c['st'] = 1;
    c['tf_id'] = parseInt(from);
    c['tt_id'] = parseInt(to);
    c['ssid'] = jQuery.cookie('SSID');
    jQuery.post("http://"+HOST+"/facility/facility.php?x=" + parseInt(x) + "&y=" + parseInt(y) + "#ptop", c, function() {});
    var tid = $w(function() {
                     location.reload(false);
                 });

}

//自動寄付処理
function autoDonate() {

    debugLog("=== Start autoDonate ===");

    if (OPT_KIFU != 1) {
        return;
    }

    //糧が指定量より多いかチェック
    if ($("rice").innerHTML < OPT_RISE_KIFU_MAX) {
        return;
    }


    sendDonate(OPT_RISE_KIFU);
}

//寄付処理通信部
function sendDonate(rice) {
    var c={};
    c['contributionForm'] = "";
    c['wood'] = 0;
    c['stone'] = 0;
    c['iron'] = 0;
    c['rice'] = parseInt(rice);
    c['contribution'] = 1;
    jQuery.post("http://"+HOST+"/alliance/level.php", c, function() {});
    var tid = $w(function() {
                     location.reload(false);
                 });
}

//内政スキルの使用
function Auto_Domestic() {

    debugLog("=== Start Auto Domestic ===");

    DomesticFlg = false;

    var tid = $w(function() {
                     GM_xmlhttpRequest(
                         {
                             method: "GET",
                             url: "http://" + HOST + "/card/domestic_setting.php",
                             headers: {"Content-type":"text/html"},
                             overrideMimeType: 'text/html; charset=utf-8',
                             onload: function(x) {

                                 var htmldoc = document.createElement("html");
                                 htmldoc.innerHTML = x.responseText;

                                 var skillElem = document.evaluate('//td[@class="skill"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                 for (i = 0; i < skillElem.snapshotLength; i++) {
                                     var skillTag = trim(skillElem.snapshotItem(i).innerHTML);
                                     var AutoSkillFlg = 0;

                                     for (z = 1; z < DASkill.length; z++) {
                                         if ((OPT_DOME[z]==1) && ((skillTag.indexOf(DASkill[z],0) > 1))) {
                                             var link = skillTag.substring(skillTag.indexOf("href=",0)+6,skillTag.indexOf("\"",skillTag.indexOf("href=",0)+7));
                                             do {
                                                 link = link.replace(/&amp;/,"&");
                                             } while(link.indexOf("&amp;",0) > 1)

                                             DomesticFlg    = true;

                                             GM_xmlhttpRequest(
                                                 {
                                                     method:"GET",
                                                     url:"http://" + HOST + link,
                                                     headers:{"Content-type":"text/html"},
                                                     overrideMimeType:'text/html; charset=utf-8',
                                                     onload: function(x) {
                                                         debugLog("内政スキル使用");
                                                         if (OPT_BLD == "AC") {  setVillageFacility();   }   // 拠点建築チェック
                                                         if (OPT_BLD == "BS") {  setVillageFacility2();  }   // 宿舎ビルド＆スクラッチ

                                                         getSoldier();               // 自動造兵処理
                                                         autoLvup();             // 自動武器・防具強化
                                                         ichibaChange(vId);          // 市場処理
                                                         autoDonate();               // 自動寄付処理

                                                         DomesticFlg = false;
                                                     }
                                                 });
                                             while(1) {
                                                 if (DomesticFlg == false) {
                                                     debugLog("== END Auto_Domestic==");
                                                     break;
                                                 }
                                                 Thread.sleep(100);  // 100ms 停止
                                             }
                                             if (DomesticFlg == false) { break; }
                                         }
                                     }
                                 }
                                 debugLog("内政スキル未使用");
                                 if (OPT_BLD == "AC") {  setVillageFacility();   }   // 拠点建築チェック
                                 if (OPT_BLD == "BS") {  setVillageFacility2();  }   // 宿舎ビルド＆スクラッチ

                                 getSoldier();               // 自動造兵処理
                                 autoLvup();             // 自動武器・防具強化
                                 ichibaChange(vId);          // 市場処理
                                 autoDonate();               // 自動寄付処理

                             }
                         });
                 });
}

///////////////////////////////////////////////
//Chrome用GM_関数
// @copyright 2009, James Campos
// @license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    };

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
        }
    };

    GM_log = function(message) {
        if (window.opera) {
            opera.postError(message);
            return;
        }
    };

    GM_registerMenuCommand = function(name, funk) {
        //todo
    };

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    };
}

function ccreateCheckBoxKai2(container, id, def, text, title, left) {

    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "1px";
    dv.style.paddingLeft= left + "px";

    dv.title = title;
    var cb = d.createElement("input");
    cb.type = "checkbox";
    cb.style.verticalAlign = "middle";
    cb.id = id + def;
    cb.value = 1;

    var def2 = id  + ""  + "[" + def + "]";

    if (eval(def2)) cb.checked = true;

    var lb = d.createElement("label");
    lb.htmlFor = id;
    lb.style.verticalAlign = "middle";

    var tx = d.createTextNode(text);
    tx.fontSize = "10px";
    lb.appendChild(tx);
    var tb = d.createElement("input");
    tb.type = "text";
    tb.id = id + "LV" + def;
    tb.value = eval(id  + "LV"  + "[" + def + "]");
    tb.style.verticalAlign = "middle";
    tb.style.textAlign = "right";
    tb.style.paddingRight = "3px";
    tb.size = 4;

    dv.appendChild(cb);
    dv.appendChild(lb);
    dv.appendChild(tb);
    container.appendChild(dv);
    return cb;
}

function JSSleep(sec) {
    var start = new Date;
    while (1) {
        var cur = new Date;
        if (sec * 1000 <= cur.getTime() - start.getTime()) {
            break;
        }
    }
}

function sortAction(actions) {
    actions.sort(function(val1, val2) {
                     var diff = (new Date(val1[IDX2_TIME])).getTime()
                         - (new Date(val2[IDX2_TIME])).getTime();
                     return diff;
                 });
    return actions;
}

//拠点の作業中情報を取得
function getVillageActions() {
    var data = new Array();
    //拠点名を取得
    var doc = jQuery(document);
    var village_name = trim(jQuery("#basepoint .basename", doc).text());
    var xy = trim(jQuery("#basepoint .xy", doc).text());
    data[IDX_BASE_NAME] = village_name;
    data[IDX_XY] = xy;

    //建設情報を取得
    var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li',
                                        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var updates = [];
    var actions = null;

    actions = jQuery("#actionLog ul li", doc);
    for (var i = 0; i < actions.length; i++) {
        var matched;
        var action = actions[i];
        var newAction = new Array();

        //ステータス
        var build_status = trim(jQuery(".buildStatus", action).text());
        var build_str = "";
        var build_type = build_status.substr(0, 2);

        newAction[IDX2_ROTATION] = 0;
        newAction[IDX2_TYPE] = TYPE_CONSTRUCTION;
        
        if (build_type === "建設") {
            newAction[IDX2_DELETE] = false;
            build_str = "建設:" + trim(jQuery(".buildStatus a").text());
        } else if (build_type === "削除") {
            newAction[IDX2_DELETE] = true;
            build_str = "建設:" + trim(jQuery(".buildStatus a").text());
        } else if (matched = build_status.match(/(.+)の(.+)を強化/)) {
            if (matched[2] === "武器") {
                build_str = "鍛冶場:";
            } else {
                build_str = "防具工場:";
            }
            newAction[IDX2_TYPE] = TYPE_FACILITY;
            build_str += matched[1] + "の" + matched[2] + "を強化中";
            newAction[IDX2_DELETE] = false;
        } else if (matched = build_status.match(/(.+)を研究中/)) {
            newAction[IDX2_TYPE] = TYPE_FACILITY;
            newAction[IDX2_DELETE] = false;
            build_str = "研究所:" + matched[1] + "を研究中";
        }
        
        newAction[IDX2_STATUS] = build_str;
        newAction[IDX2_TIME] = generateDateString(computeTime(trim(jQuery(".buildClock", action).text())));
        updates.push(newAction);
    }

    actions = jQuery(".floadInner ul li", doc);
    for (var i = 0; i < actions.length; i++) {
        var action = actions[i];
        var newAction = new Array();
        newAction[IDX2_TYPE] = TYPE_MARCH;
        newAction[IDX2_DELETE] = false;
        newAction[IDX2_ROTATION] = 0;

        //ステータス
        var status = trim(jQuery("a", action).text());
        newAction[IDX2_STATUS] = "行軍:" + status;
        newAction[IDX2_TIME] = generateDateString(computeTime(trim(jQuery('span', action).text())));

        updates.push(newAction);
    }

    //行軍情報を永続保存
    data[IDX_ACTIONS] = updates;
    //    saveVillage(data, TYPE_MARCH);
    saveVillageTypes(data, [TYPE_MARCH, TYPE_CONSTRUCTION, TYPE_FACILITY]);
//    saveVillage(data, null);
    if (is_stay_mode()) {
        reopen();
    }
}

function saveVillageForce(new_data) {
    var villages = loadVillages(location.hostname + PGNAME);
    for (var i = 0; i < villages.length; i++) {
        var village = villages[i];
        
        if (village[IDX_XY] == new_data[IDX_XY]) {
            village[IDX_BASE_NAME] = new_data[IDX_BASE_NAME];
            var actions = village[IDX_ACTIONS];
            for (var act_i = 0; act_i < actions.length; act_i++) {
                var action = actions[act_i];
                console.log(action);
            }
        }
    }
}

function saveVillageTypes(new_data, types) {
    var all_data = loadVillages(location.hostname+PGNAME);
    for (var i = 0; i < types.length; i++) {
        all_data = mergeVillageData(all_data, new_data, types[i]);
    }
    saveVillages(HOST + PGNAME, all_data);
}

function mergeVillageData(allData, newData, type) {
    var exists = false;
    for (var i = 0; i < allData.length; i++) {
        var villageData = allData[i];
        
        //作業リスト更新
        if (villageData[IDX_XY] == newData[IDX_XY]) {
            exists = true;
            villageData[IDX_BASE_NAME] = newData[IDX_BASE_NAME];

            var actions = villageData[IDX_ACTIONS];
            var new_actions = [];
            for (var j = 0; j < actions.length; j++) {
                if (actions[j][IDX2_TYPE].substr(0, 1) !== type)
                    new_actions.push(actions[j]);
            }
            for (var j = 0; j < newData[IDX_ACTIONS].length; j++) {
                if (newData[IDX_ACTIONS][j][IDX2_TYPE] === type) {
                    new_actions.push(newData[IDX_ACTIONS][j]);
                }
            }
            villageData[IDX_ACTIONS] = new_actions;
        }

        allData[i] = villageData;
    }
    if (!exists) allData.push(newData);
    return allData;
}

//拠点情報を保存
function saveVillage(new_data, type) {
    var all_data = loadVillages(location.hostname+PGNAME);
    all_data = mergeVillageData(all_data, new_data, type);
    saveVillages(HOST + PGNAME, all_data);
}

function jcreateActionDiv(action, now, baseXY, host) {
    var type = action[IDX2_TYPE].charAt(0);

    var actionDiv = jQuery("<div>");
    if (action[IDX2_DELETE] == "true") {
        actionDiv.css("background-color", "#BBDDDD");
    }

    var actionTime = new Date(action[IDX2_TIME]);
    if (actionTime < now) {
        actionDiv.css("background-color", COLOR_TITLE);
    }

    //作業完了時刻
    var text = action[IDX2_TIME].replace(/^[0-9]{4}\//, "");
    var finishTime = new Date(action[IDX2_TIME]);
    text += " (あと" + generateWaitTimeString(finishTime, now) + ")";
    text += action[IDX2_STATUS] + " ";

    var textSpan = jQuery("<span>").text(text);
    actionDiv.append(textSpan);

    if (actionTime < now) {
        var del_link = jQuery("<a>").attr("title", "確認済にして削除します").attr("href", "#").css("color", "#E86D61").text("済");
        var key = host + DELIMIT1 + baseXY + DELIMIT1 + action[IDX2_TIME];
        del_link.click(function(e) {
                          deleteAction(key);
                      });
        actionDiv.append(del_link);
    }

    return actionDiv;
}

//各作業行生成
function createActionDiv(action, nowTime, baseXy, host) {
    var type = action[IDX2_TYPE].charAt(0);
    var actionDiv = document.createElement("div");
    if (action[IDX2_DELETE] == "true") {
        actionDiv.style.backgroundColor = "#BBDDDD";
    }
    //作業完了背景色
    var actionTime = new Date(action[IDX2_TIME]);
    if (actionTime < nowTime) {
        actionDiv.style.backgroundColor = COLOR_TITLE;
    }

    //作業完了時刻
    var textSpan = document.createElement("span");
    var text = "";
    text += action[IDX2_TIME].replace(/^[0-9]{4}\//, "");
    var finishTime = new Date(action[IDX2_TIME]);
    text += " (あと" + generateWaitTimeString(finishTime, nowTime) + ")";
    text += " ";
    text += action[IDX2_STATUS] + " ";
    textSpan.innerHTML = text;
    actionDiv.appendChild(textSpan);

    //作業完了行の個別削除リンク
    if (actionTime < nowTime) {
        var delLink = document.createElement("a");
        delLink.title = "確認済にして削除します";
        delLink.href = "javascript:void(0);";
        delLink.style.color = "#E86D61";
        delLink.innerHTML = "済";

        var key = host + DELIMIT1 + baseXy + DELIMIT1 + action[IDX2_TIME];
        delLink.addEventListener("click",
                                 (function(key_) {
                                      return function() {
                                          deleteAction(key_);
                                      };
                                  })(key), true);
        actionDiv.appendChild(delLink);
    }

    return actionDiv;
}

function confirmTimer() {
    //基準時刻より前の作業情報を削除
    var hosts = getTargetHosts();
    for (var ii = 0; ii < hosts.length; ii++) {
        var baseTime = new Date();
        var villages = loadVillages(hosts[ii] + PGNAME);
        for (var i = 0; i < villages.length; i++) {
            var actions = villages[i][IDX_ACTIONS];
            for (var j = actions.length - 1; j >= 0; j--) {
                var actionTime = new Date(actions[j][IDX2_TIME]);
                if (actionTime <= baseTime) {
                    actions.splice(j, 1);
                }
            }
            villages[i][IDX_ACTIONS] = actions;
        }

        //保存
        saveVillages(hosts[ii] + PGNAME, villages);
    }

    jQuery("#bab-main .action-finished").remove();
    jQuery("#bab-main .action-deleted").remove();

    if (is_stay_mode()) {
        reopen();
    }

}

//通知対象ホスト
function getTargetHosts() {
    var hosts = new Array();
    var dispOtherHosts = GM_getValue(location.hostname + "_disp_other_hosts", false);
    if (dispOtherHosts) {
        hosts = loadHosts();
    } else {
        hosts[0] = location.hostname;
    }
    return hosts;
}

function deleteAction(key) {
    var hosts = getTargetHosts();
    for (var ii = 0; ii < hosts.length; ii++) {
        var villages = loadVillages(hosts[ii] + PGNAME);
        var exists = false;
        villageLoop:
        for (var i = 0; i < villages.length; i++) {
            for (var j = 0; j < villages[i][IDX_ACTIONS].length; j++) {
                var action = villages[i][IDX_ACTIONS][j];
                var curKey = hosts[ii] + DELIMIT1 +
                    villages[i][IDX_XY] + DELIMIT1 + action[IDX2_TIME];
                if (key == curKey) {
                    exists = true;
                    villages[i][IDX_ACTIONS].splice(j, 1);
                    break villageLoop;
                }
            }
        }

        //見つかったら更新
        if (exists) {
            saveVillages(hosts[ii] + PGNAME, villages);
            if (is_stay_mode()) {
                reopen();
            }
            return;
        }
    }
}

function getMyVillage() {
    var ret = new Array();

    var xy = getMyXY();
    if (!xy) {
        return ret;
    }
    var allData = loadVillages(location.hostname + PGNAME);
    for (var i = 0; i < allData.length; i++) {
        var villageData = allData[i];
        if (villageData[IDX_XY] == "(" + xy + ")") {
            ret[IDX_XY] = villageData[IDX_XY];
            ret[IDX_BASE_NAME] = villageData[IDX_BASE_NAME];
            return ret;
        }
    }

    return ret;
}

function getMyXY() {
    var d = document;
    var $x = function(xp, dc) {
        return document.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };

    var gnaviorgNav = d.getElementById("gnavi");
    if (gnaviorgNav) {
        var nowLoc = $x('id("gnavi")//a[contains(@href,"map.php")]');
    } else {
        var nowLoc = $x('id("gNav")//a[contains(@href,"map.php")]');
    }

    if (!nowLoc) return null;

    var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
    if (xy) {
        return xy[1]+","+xy[2];
    }
}

function get_using_skill_all() {
    var name = null;
    var level = null;
    var text = jQuery("div.base-skill span a").text();
    var matches = text.match(/(.+?):?\s*(.+)\((.+)\)/);
    var chara = matches[1] === '--' ? null : matches[1];
    if (matches[2] !== '--') {
        var name_and_level = matches[2].split('LV');
        name = name_and_level[0];
        level = parseInt(name_and_level[1]);
    }
    var time = matches[3] === '--:--:--' ? null : matches[3];

    return {
        chara: chara,
        name: name,
        level: level,
        time: time
    };
}

function get_using_skill() {
    var skill = get_using_skill_all();
    if (skill.name == null) {
        return null;
    } else {
        return skill.name;
    }
}

//内政スキル取得
function getDomesticSkill(htmldoc) {
    var data = getMyVillage();
    data[IDX_ACTIONS] = new Array();
    var i = -1;

    var skill = get_using_skill_all();
    if (skill.name) {
        i += 1;
        var status = "内政:使用(" + skill.chara + ":" + skill.name + "LV" + skill.level + ")";
        data[IDX_ACTIONS][i] = new Array();
        data[IDX_ACTIONS][i][IDX2_STATUS] = status;
        data[IDX_ACTIONS][i][IDX2_TIME] = generateDateString(computeTime(skill.time));
        data[IDX_ACTIONS][i][IDX2_TYPE] = TYPE_DOMESTIC;
        data[IDX_ACTIONS][i][IDX2_DELETE] = false;
        data[IDX_ACTIONS][i][IDX2_ROTATION] = 0;
    }

    // 回復中
    var dom = document.createElement("html");
    var RecoveryCheck = document.evaluate('//table[@class="general"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var z = 0; z < RecoveryCheck.snapshotLength; z++) {
        if (RecoveryCheck.snapshotItem(z).innerHTML.match("内政中")) {
            dom.innerHTML = "<table>" + RecoveryCheck.snapshotItem(z).innerHTML + "</table>";
            // 内政武将名
            var Name = document.evaluate('//td/a[@class="thickbox"]', dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).innerHTML;
            var RecoverySkill = document.evaluate('//td[@class="recovery"]', dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var x = 0; x < RecoverySkill.snapshotLength; x++) {
                i += 1;
                data[IDX_ACTIONS][i] = new Array();
                var SkillName  = RecoverySkill.snapshotItem(x).innerHTML.split("<")[0];         // スキル名
                var SkillRTime = RecoverySkill.snapshotItem(x).innerHTML.split('>')[2].substr(0,8);     // 回復時間
                var status = "内政:回復(" + trim(Name) + ":" + SkillName + ")";
                data[IDX_ACTIONS][i][IDX2_STATUS] = status;
                data[IDX_ACTIONS][i][IDX2_TIME] = generateDateString(computeTime(SkillRTime));
                data[IDX_ACTIONS][i][IDX2_TYPE] = TYPE_DOMESTIC;
                data[IDX_ACTIONS][i][IDX2_DELETE] = false;
                data[IDX_ACTIONS][i][IDX2_ROTATION] = 0;
            }
        }
    }
    saveVillage(data, TYPE_DOMESTIC);
    if (is_stay_mode()) {
        reopen();
    }
}

//巡回モード取得
function getReverseMode() {
    var result = GM_getValue(location.hostname + "_reverse_mode" + PGNAME, false);
    return result;
}

//巡回モード変更
function changeReverseMode(value) {
    GM_setValue(location.hostname + "_reverse_mode" + PGNAME, value);
}

//次回完了時刻取得
function getNextTime(hostname, baseTime) {

    //一番早い作業完了時刻を取得
    var startTime = new Date("2099/12/31 23:59:59");
    var nextTime = startTime;
    var villages = loadVillages(location.hostname + PGNAME);
    nextURL = "";
    for (var i = 0; i < villages.length; i++) {
        var actions = villages[i][IDX_ACTIONS];
        for (var j = 0; j < actions.length; j++) {
            var actionTime = new Date(actions[j][IDX2_TIME]);
            if (actionTime > baseTime && actionTime < nextTime) {
                var type = actions[j][IDX2_TYPE].charAt(0);
                nextTime = actionTime;
                nextURL  = villages[i][IDX_URL];
                nextNAME = villages[i][IDX_BASE_NAME];
            }
        }
    }

    //作業中がなければ何もしない
    if (nextTime == startTime) nextTime = undefined;

    return nextTime;
}

function xpath(query,targetDoc) {
    return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function escapeXPathExpr(text) {
    var matches = text.match(/[^"]+|"/g);

    function esc(t) {
        return t == '"' ? ('\'' + t + '\'') : ('"' + t + '"');
    }

    if (matches) {
        if (matches.length == 1) {
            return esc(matches[0]);
        } else {
            var results = [];
            for (var i = 0; i < matches.length; i ++) {
                results.push(esc(matches[i]));
            }
            return 'concat(' + results.join(', ') + ')';
        }
    } else {
        return '""';
    }
}

function forInt(num,def) {
    if (def == undefined) {     def = 0;    }
    if (isNaN(parseInt(num))) {
        return def;

    } else {
        return parseInt(num);
    }
}
