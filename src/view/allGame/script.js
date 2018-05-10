import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import page from "../../components/page.vue";
import slider from "../../components/sliders.vue";
import getGame from '@/api/getSearch'
import getMore from '@/api/more'
import getAwardDetail from '@/api/award/award-add'
import { jsCallNative } from "../../common/callnative"

export default {
    components: {
        SearchTop: SearchTop,
        page: page,
        slider: slider
    },
    data() {
        return {
            
            gameType: [],
            banners: [],
            list: [],
            page: 1,
            listGame: [],
            gameCategory1: [],
            gameCategory2: [],
            category1: '',
            category2: '',
            subCategoryIndex: 0,
            categoryIndex: 0,
            channelInfo: {}, // 频道ID
            listId: 29147,
            //分页
            current: 1,
            showItem: 5,
            allpage: 13,
            flag:true,
             token:"ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9NkQwMTQ1RDMyNDQyM0FEMkFERTY4MEMzNTU5MTMxQ0UxJmg9MTUyNTk0OTIyMzYzNyZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y25lzUttbAqG1Uyf5XsNO10h",
            //进入游戏接口
            gameurl:this.gmConf.domainHttps+"passport.4366.com",
            softid:""
        }
    },
    mounted() {
        this.getGameLists()
        this.getGameTitle()
    },

    computed: {
        pages: {
            get: function() {
                var pag = [];
                if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if (middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                
                return pag
            },
            set: function(newValue) { //如果不写计算属性的set，vue会报错


            }
        }
    },

    methods: {
        //获得轮播图
        getGameLists() {
            getAwardDetail.getAwardDetail(98).then((res) => {
                console.log(res.data)
                $(window).scrollTop(0);
                // 轮播图
                this.banners = res.data.channels[0].modules[1].elements;
                this.banners.page = res.data.channels[0].channelName;
                this.banners.pageId = res.data.channels[0].id;
                // 频道信息
                this.channelInfo.id = res.data.channels[0].id;
                this.channelInfo.name = res.data.channels[0].channelName;
                console.log(this.banners)
                // console.log(this.goodGame)
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
            $(".gameTitle a").removeClass("active")
            $(event.target).addClass("active")
            this.subCategoryIndex = index;
            this.category2 = item.category1;
            this.getGame();
        },

        async getGame() {
            // console.log(this.category1,this.category2);
            getGame.getSearch('', this.category1, this.category2).then((res) => {
                if(!res.data.datas){
                    this.flag=false;
                }
                this.listGame = res.data.datas.slice(0, 16)
                // console.log(this.listGame)       
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
                console.log(this.listGame)
            })
        },
        goDetails(Id,img){ // 选择服务器
            this.$router.push({path:"../service",query:{gameId:Id,imgUrl:img}})
        },
        
        //分页
        goto: function(index) {
            if (index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
        },
        pages: function() {
            var pag = [];
            if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        },
        //获取YYgame
        getGameYY(gameId,callback){
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
              window.open(_url) 
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
         // 进入选择服务器页面
        chooseSer(id){
            console.log(id)
            this.$router.push({path:"../service",qurey:{gameId:id}})
        }
       

    }

}