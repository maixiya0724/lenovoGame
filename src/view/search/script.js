import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import getGame from '@/api/getSearch'
import getAwardDetail from '@/api/award/award-add'
import { jsCallNative } from "../../common/callnative"
export default {
    components: {
        SearchTop: SearchTop,
        SearchTitle: SearchTitle
    },

    data() {
        return {
            inputText: this.$route.query.info, //路由传递过来的值
            gameList: [], //搜索到的游戏数组
            flag: false, //搜索结果
            hotGame: [], // 热门推荐
            gameurl: this.gmConf.domainHttps + "passport.4366.com",
            token:"ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9MTY4QUREMzIyMjUwMkEyQzBCRjVDRUIzRDQ0NEIyQzMxJmg9MTUyNjEwNzM2OTA0OCZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y25jStfP5s0L5O2aV5gFX27D",
        }
    },
    mounted() {
        this.getSearch(this.inputText)
        this.getGameLists()
        this.getLoginToken()
    },
    watch: {
        $route() {
            this.inputText = this.$route.query.info;
            this.getSearch(this.inputText)
        }
    },

    methods: {
         getLoginToken() {
            var ts = this;
            //回调请求token接口
            //if(!ts.isLenovo()){ return false;}
            window.tokenCallback = function(options) {
                if (!options) { return false; }
                var data = JSON.parse(options);
                if ($.trim(data.token) == "") { return false; }
                // ts.loginToken = data.token;
                ts.userId = data.userid;
                ts.token = data.token;
                console.log(data)
                // ts.errorShow(data);
            }
            
            if (!ts.isIe()) {
                if (!this.isLenovo()) { return; }
                callHostFunction.getYYPermission(tokenCallback);
            } else {
                if (!this.isLenovo()) { return; }
                let _data = window.external.getYYPermissionIe();
                var data = JSON.parse(_data);
                ts.userId = data.userid;
                ts.token = data.token;
                //ts.errorShow(data);
            }
        },
        // 页面执行请求搜索数据
        getSearch(info) {
            getGame.getSearch(info, '', '').then((res) => {
               console.log(res.data)
                if ( !res.data.datas[0]) {
                    this.gameList = [];
                    this.flag = false
                } else if(res.data.datas[0].category1=="网游"){
                    this.gameList = [];
                    this.flag = false
                }else{
                    this.flag = true
                    this.gameList = res.data.datas
                    console.log(this.gameList)
                }
                console.log(this.gameList)
                // 遍历把235*132的图片加到游戏list里
                for (let j = 0; j < this.gameList.length; j++) {
                    if (!this.gameList[j].captureFiles) {
                        this.gameList[j].bgUrl = ''
                    } else {
                        for (let i = 0; i < this.gameList[j].captureFiles.length; i++) {
                            if (this.gameList[j].captureFiles[i].size == '235*132') {
                                this.gameList[j].bgUrl = this.gameList[j].captureFiles[i].url
                            } else {}
                        }
                    }
                }
            })
        },
        //获取YYgame
        getGameYY(gameId) {
            var ts = this

            var _url = "/back/game/get/game/soft/data?softName=yy" + "&gameId=" + gameId;
            var ts = this;
            ts.jqajax(_url, { type: "get", dataType: "json" }, function(res) {

                console.log(res.data)
                ts.softBrowser = res.data.softkernel;
                ts.softid = res.data.softId; //game值
                ts.gameStart(ts.softid);
            });

        },
        //开始游戏
        gameStart(_sid) {
            var ts = this;
            if (!_sid) return false;
            var _url = ts.gameurl + "/channel/lenovo/gamecenter/login.do";
            _url += "?game=" + ts.softid;
            _url += "&token=" + ts.token;
            _url += "&server=" + _sid;
            _url += "&failUrl=" + encodeURIComponent(window.location.href);
            console.log(_url, _sid);

             window.open(_url)
        },
        //请求游戏数据
        getGameLists() {
            // 接口地址在serviceUrl里
            getAwardDetail.getAwardDetail(98).then((res) => {
                console.log(res.data)
                // 热门游戏
                this.hotGame = res.data.channels[0].modules[5].elements.slice(0, 4);
                console.log(this.hotGame)
            })
        },
        startGame(gameId) {// 开始游戏页游
            var ts = this
            var _url = "/back/game/get/game/soft/data?softName=yy" + "&gameId=" + gameId;
            var ts = this;

            ts.jqajax(_url, { type: "get", dataType: "json" }, function(res) {

                console.log(res.data)
                ts.softBrowser = res.data.softkernel;
                ts.softid = res.data.softId; //game值
                ts.gameStart(ts.softid);
                
            });
        },
        

    }

}