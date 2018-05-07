import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";
import gameItem from "../../components/gameItem.vue";
import page from "../../components/page.vue";
import getGame from '@/api/getSearch'
import getAwardDetail from '@/api/award/award-add'
import { jsCallNative } from "../../common/callnative"

export default {
    components: {
        SearchTop: SearchTop,
        SearchTitle: SearchTitle,
        slider: slider,
        gameItem: gameItem,
        page: page
    },

    data() {
        return {
            // 轮播图的图片
            sliderList: [],
            // 推荐游戏的图片
            goodGame: [],
            goodGameRank: [],
            listGame: [],
            hotGame: [],
            banners: [],
            gameCategory1: [],
            gameCategory2: [],
            category1: '',
            category2: '',
            softid:"",
            subCategoryIndex: 0,
            categoryIndex: 0,
            token:"ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9QzAwQjE5OTQ1QTBENjFEMjFBMDQ3RTNFRUZFQjM2QUYxJmg9MTUyNTY4ODEzNDMxOCZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y25SQaOHJZQ0p025MiLRZoRp",
            channelInfo: {}, // 频道ID
            //进入游戏接口
            gameurl:this.gmConf.domainHttps+"passport.4366.com",
        }
    },

    mounted() {
        this.getGameLists()
        this.getGameTitle()
        this.getLoginToken()
    },
    methods: {
         //获取用户登录信息
        getLoginToken(){
            var ts = this;

            //回调请求token接口
            //if(!ts.isLenovo()){ return false;}
            window.tokenCallback = function(options){
                if(!options){ return false;}
                var data = JSON.parse(options);
                if($.trim(data.token) == ""){return false; }
                // ts.loginToken = data.token;
                ts.userId=data.userid;
                ts.token=data.token;
               // ts.errorShow(data);
            }

            console.log(this.token)

            if(!ts.isIe()){
                if(!this.isLenovo()){ return;}
                callHostFunction.getYYPermission(tokenCallback);
            }else{
                if(!this.isLenovo()){ return;}
                let _data =  window.external.getYYPermissionIe();
                var data = JSON.parse(_data);
                ts.userId=data.userid;
                ts.token=data.token;
                //ts.errorShow(data);
            }
             

        },

        sliderInit: function() { // 轮播图初始化
            $('.carousel').carousel({
                interval: 2000,

            })
        },

     

        getGameLists() { // 得到banner和服务器列表轮播图的数据
            // 接口地址在serviceUrl里
            getAwardDetail.getAwardDetail(98).then((res) => {
                $(window).scrollTop(0);
                console.log(res.data)
                // 轮播图
                this.banners = res.data.channels[0].modules[1].elements;

                this.banners.page = res.data.channels[0].channelName;
                this.banners.pageId = res.data.channels[0].id;
                // 精品游戏
                this.goodGame = res.data.channels[0].modules[2].elements;
                //  页游精品游戏开服表
                this.goodGameRank = res.data.channels[0].modules[3].elements;
                var goodGameRankList = Math.ceil(this.goodGameRank.length / 10)
                //处理goodGameRankList
                for (var i = 0; i < goodGameRankList; i++) {
                    (this.sliderList).push(i)
                }

                this.cont = res.data.channels[0].modules[4].elements;
                // 热门游戏
                this.hotGame = res.data.channels[0].modules[5].elements.slice(0, 4);

            })
        },
        // 获取游戏列表
        async getGameTitle() {
            getGame.getMore().then((res) => {
                console.log(res)
                this.gameCategory1 = res.data.first
                this.gameCategory2 = res.data.second
                this.category1 = this.gameCategory1[2].category1
                this.category2 = this.gameCategory2[0].category1
                this.getGame();
            });
        },

        // 点击游戏列表分类
        selectIndex(index, item) {
            $(".allGameTitle a").removeClass("active")
            $(event.target).addClass("active")
            this.subCategoryIndex = index;
            this.category2 = item.category1;
            this.getGame();
        },

        async getGame() {
            // console.log(this.category1,this.category2);
            getGame.getSearch('', this.category1, this.category2).then((res) => {
                this.listGame = res.data.datas.slice(0, 12)

                console.log(this.listGame)
                // 遍历把235*132的图片加到游戏list里
                for (let j = 0; j < this.listGame.length; j++) {
                    if (!this.listGame[j].captureFiles) {
                        this.listGame[j].bgUrl = ''
                    } else {
                        for (let i = 0; i < this.listGame[j].captureFiles.length; i++) {
                            if (this.listGame[j].captureFiles[i].size == '235*132') {
                                this.listGame[j].bgUrl = this.listGame[j].captureFiles[i].url
                            } else {}
                        }
                    }
                }
            })
        },
      
        goDetails(Id){ // 选择服务器
        	this.$router.push({})
        },
        //获取YYgame
        getGame(gameId,callback){
            var ts=this
            console.log(gameId)
            var _url="/back/game/get/game/soft/data?softName=yy"+"&gameId="+gameId;
            var ts=this;
            ts.jqajax(_url,{type:"get",dataType:"json"},function(res){
               
                ts.softBrowser = res.data.softkernel;
                ts.softid=res.data.softId;//game值
                ts.gameStart(ts.softid);
            });
        },
         //开始游戏
        gameStart(_sid){
            var ts = this;
            if(!_sid)return false;
            var _url = ts.gameurl+"/channel/lenovo/gamecenter/login.do";
            _url += "?game="+ts.softid;
            _url += "&token="+ts.token;
            _url += "&server="+_sid;
            _url += "&failUrl="+encodeURIComponent(window.location.href);
            console.log(_url,_sid);
            ts.popVideo(_url);
            
              window.location.href = _url;
        },
          //客户端弹窗
        popVideo(_url){
            var ts = this;
            if(!_url || !ts.isLenovo())return;
            if(!ts.isIe()){
                callHostFunction.callBackVideo(_url,ts.softBrowser);
            }else{
                window.external.callBackVideo(_url,ts.softBrowser);
            }

        },

    }

}