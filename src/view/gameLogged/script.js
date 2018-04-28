import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";
import gameItem from "../../components/gameItem.vue";
import page from "../../components/page.vue";


export default{
	components:{
		SearchTop:SearchTop,
		SearchTitle:SearchTitle,
		slider:slider,
		gameItem:gameItem,
		page:page
	},
	
	data(){
			return{  
				// 轮播图的图片
				sliderList:[{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/call_of_duty_advanced_warfare-007.jpg",index:1},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue.jpg",index:2},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-001.jpg",index:3},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-003.jpg",index:4}],
				// 推荐游戏的图片
				reImgList:[{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/call_of_duty_advanced_warfare-007.jpg",index:1,name:"王者荣耀"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue.jpg",index:2,name:"绝地求生"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-001.jpg",index:3,name:"英雄联盟"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-003.jpg",index:4,name:"贪玩蓝月"}],
				hotGame:[{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/call_of_duty_advanced_warfare-007.jpg",index:1,name:"王者荣耀"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue.jpg",index:2,name:"绝地求生"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-001.jpg",index:3,name:"英雄联盟"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-003.jpg",index:4,name:"贪玩蓝月"}],
				dataSerList:[{name:"英雄联盟",data:"100",time:"07.24"},{name:"英雄联盟",data:"100",time:"07.24"},{name:"英雄联盟",data:"100",time:"07.24"}],

			} 
	},
	methods:{
			sliderInit:function(){
				$('.carousel').carousel({
				  interval: 2000,
				  
				})
			}
		}
	
}
