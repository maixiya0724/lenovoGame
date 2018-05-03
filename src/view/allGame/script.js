import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import gameItem from "../../components/gameItem.vue"
import page from "../../components/page.vue";
import slider from "../../components/sliders.vue";
import data from "../../common/config.js"

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
            gameType: ["全部游戏", "角色扮演", "战争策略", "体育竞技", "模拟经营"]
        }
    },
    mounted(){
    	
    },
    methods: {
        selectIndex: function(index,event) { // 选项卡点击事件
            $(".gameTitle a").removeClass("active")
            console.log(event.target)
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
        requestGame:function(url,data){
            //

        },

    }

}