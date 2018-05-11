import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";

import page from "../../components/page.vue";
import getGame from '@/api/getSearch'
import getAwardDetail from '@/api/award/award-add'
import { jsCallNative } from "../../common/callnative"

export default {
    components: {
        SearchTop: SearchTop,
        SearchTitle: SearchTitle,
        slider: slider,
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
            userId: '10114895506',
            //YY签名以及时间戳
            signs: '',
            timestamp: '',
            playLatests:'',
            gameCategory1: [],
            gameCategory2: [],
            category1: '',
            category2: '',
            softid:"",
            subCategoryIndex: 0,
            categoryIndex: 0,
            token:"ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9REQ0RDkwQTBCRUMzQzk4NUJENDI5NjU5M0FBREY3NTExJmg9MTUyNjAyMDMyNTUwMSZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y26-Kfd85C9BOZ0SpNjrq4My",
            channelInfo: {}, // 频道ID
            isLogin:false,
            //进入游戏接口
            gameurl:this.gmConf.domainHttps+"passport.4366.com",
        }
    },

    mounted() {
        this.getGameLists()
        this.getGameTitle()
        this.getLoginToken()
        this.getSign(this.userId)
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
                console.log(data)
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
        mustLogin:function(){// 点击开始登陆
            this.isLogin=true;

        },
        loginOut:function(){
            this.isLogin=false;
        },
        showStartGame:function(index,ev){ // 服务器轮播图显示进入游戏
            
            $(".allDataSub li .three")[index].style.display="none"
            $(".allDataSub li .startGame")[index].style.display="block"
        },
        hideStartGame:function(){
            $(".allDataSub li .three").show()
            $(".allDataSub li .startGame").hide()
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
                console.log( this.goodGameRank)
                var goodGameRankList = Math.ceil(this.goodGameRank.length / 10)
                //处理goodGameRankList
                for (var i = 0; i < goodGameRankList; i++) {
                    (this.sliderList).push(i)
                }
                
                this.cont = res.data.channels[0].modules[4].elements;
                // 热门游戏
                this.hotGame = res.data.channels[0].modules[5].elements.slice(0, 4);
                console.log(this.hotGame)

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
                            }
                            if (this.listGame[j].captureFiles[i].size == '235*132') {
                                this.listGame[j].serviceImg = this.listGame[j].captureFiles[i].url
                                
                            }

                        }
                    }
                }
            })
        },
      
        goDetails(Id,img){ // 选择服务器
            console.log(img)
        	this.$router.push({path:"../service",query:{gameId:Id,imgUrl:img}})
        },
        //获取YYgame
        getGameYY(gameId,clk){
            var ts=this
            console.log(gameId)
            var _url="/back/game/get/game/soft/data?softName=yy"+"&gameId="+gameId;

            var ts=this;
            ts.jqajax(_url,{type:"get",dataType:"json"},function(res){
                console.log(res)
                ts.softBrowser = res.data.softkernel;
                ts.softid=res.data.softId;//game值
                    ts.gameStart(ts.softid);
            });
        },


          //获取yy签名以及当前时间戳
        getSign(userId) {
            var _url = "/back/game/api/user/md5UserId?" + "&userId=" + userId;
            var ts = this;
            ts.jqajax(_url, { type: "get", dataType: "json" }, function(res) {
                ts.signs = res.data.out;
                ts.timestamp = res.data.timestamp;
                //获得以前玩的游戏
                ts.playAllLatest( ts.signs, ts.timestamp, ts.userId);
            });
        },

         
         //获取用户最近在玩的
        playAllLatest(sign, timestamp, userId) {// 最近在玩的所有游戏
            var ts = this;
            // &serverType=GENERAL
            var url = this.gmConf.domainHttps + "unionlogin.4366.com/lenovo/gamecenter/recently.do?jsonp&"+ "&sign=" + sign + "&timestamp=" + timestamp + "&userId=" + userId;
            console.log(url)
            this.jqajax(url, { type: "get", dataType: "jsonp" }, (res) => {
                console.log(res)
                //  ts.errorShow(url+"<br>"+JSON.stringify(res));
                $(".service-specific-container div").eq(0).remove();
                if(res.data.length>5){
                    ts.playLatests = res.data.slice(0,4);
                }else{
                    ts.playLatests = res.data
                }
                console.log(ts.playLatests)
            })
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
            
              window.location.href=_url
        },
        myStartGame:function(game,server){// 我之前玩过的游戏快速进入游戏

          let url ="http://passport.4366.com/channel/lenovo/gamecenter/login.do?token="+this.token+"&game="+game+"&server="+server+"&failUrl="+encodeURIComponent(window.location.href);
          
          window.open( url)
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
        moreGame(){
            this.$router.push({path:"../allGame"})
        }
       

    }

}