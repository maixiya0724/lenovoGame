import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import gameItem from "../../components/gameItem.vue"
import page from "../../components/page.vue";
import slider from "../../components/sliders.vue";
import getGame from '@/api/getSearch'
import getMore from '@/api/more'
import getAwardDetail from '@/api/award/award-add'
import {jsCallNative} from "../../common/callnative"

export default {
    components: {
        SearchTop: SearchTop,
        gameItem: gameItem,
        page: page,
        slider: slider
    },
    data() {
        return {
            sliderList: [{ url: "http://img.ivsky.com/img/bizhi/pre/201411/06/call_of_duty_advanced_warfare-007.jpg", index: 1, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue.jpg", index: 2, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-001.jpg", index: 3, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-003.jpg", index: 4, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/call_of_duty_advanced_warfare-007.jpg", index: 1, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue.jpg", index: 2, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-001.jpg", index: 3, name: "英雄联盟" }, { url: "http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-003.jpg", index: 4, name: "英雄联盟" }],
            gameType: ["全部游戏", "角色扮演", "战争策略", "体育竞技", "模拟经营"],
            banners:[],
            page:1,
            listId:29147
        }
    },
    mounted(){
    	this.getGameLists()
        this.getFirst()
    },

    methods: {
        selectIndex: function(index,event) { // 选项卡点击事件
            $(".gameTitle a").removeClass("active")
           
            $(event.target).addClass("active")
            
            switch (index) {
                case 0:
                    console.log("a")
                    break;
                case 1:
                    console.log("b")
                    break;
                case 3:
                    console.log("c")
                    break;
                case 4:
                    console.log("d")
                    break;
                case 5:
                    console.log("f")
                    break;
            }
        },

        getGameLists () {
                // 接口地址在serviceUrl里
                getAwardDetail.getAwardDetail(98).then((res) => {
                    console.log(res.data)
                    $(window).scrollTop(0);


                    // 轮播图
                    this.banners = res.data.channels[0].modules[1].elements;

                    this.banners.page = res.data.channels[0].channelName;
                    this.banners.pageId = res.data.channels[0].id;
                    // 精品游戏
                    this.goodGame = res.data.channels[0].modules[2].elements;
                    //  页游精品游戏开服表
                    this.goodGameRank = res.data.channels[0].modules[3].elements;
                    var goodGameRankList= Math.ceil(this.goodGameRank.length/10)
                    //处理goodGameRankList
                    for(var i=0;i<goodGameRankList;i++){
                        (this.sliderList).push(i)
                    }
                   
                    this.cont = res.data.channels[0].modules[4].elements;
                    // 热门游戏
                    this.hotGame = res.data.channels[0].modules[5].elements.slice(0,4);
                   
                   

                })
            },
            getFirst(){//请求全部游戏
                getMore.getMore(this.listId,this.page).then((res) => {
                console.log(res.data)
                if(res.data.datas.length<16){
                    this.loadingText='已无更多游戏...'
                }
                for (let i = 0; i < res.data.datas.length; i++) {
                    this.list.push(res.data.datas[i])
                }
                // 遍历把235*132的图片加到游戏list里
                for (let j=0;j<this.list.length;j++){
                    if(!this.list[j].captureFiles){
                        this.list[j].bgUrl = ''
                    }else {
                        for(let i =0;i<this.list[j].captureFiles.length;i++){
                            if(this.list[j].captureFiles[i].size=='235*132'){
                                this.list[j].bgUrl = this.list[j].captureFiles[i].url
                            }else{}
                        }
                    }
                }
                this.page++
            })
        }


    }

}