import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";
import gameItem from "../../components/gameItem.vue";
import page from "../../components/page.vue";
import getGame from '@/api/getSearch'
import getAwardDetail from '@/api/award/award-add'
import {jsCallNative} from "../../common/callnative"


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
				sliderList:[],
				// 推荐游戏的图片
				reImgList:[{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/call_of_duty_advanced_warfare-007.jpg",index:1,name:"王者荣耀"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue.jpg",index:2,name:"绝地求生"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-001.jpg",index:3,name:"英雄联盟"},{url:"http://img.ivsky.com/img/bizhi/pre/201411/06/assassin_s_creed_rogue-003.jpg",index:4,name:"贪玩蓝月"}],
				dataSerList:[{name:"英雄联盟",data:"100",time:"07.24"},{name:"英雄联盟",data:"100",time:"07.24"},{name:"英雄联盟",data:"100",time:"07.24"}],
				abbrList:["全部游戏","不限","ABCDE","FGHIJ","LMNOP","VWXYZ"],
				hotGame:[],
				goodGameRank:[],


			} 
	},
	mounted(){
		this.getGameLists()
	},
	methods:{
			sliderInit:function(){
				$('.carousel').carousel({
				  interval: 2000,
				  
				})
			},
			startGame:function(gameUrl){
				window.location.href="http://www.baidi.com"
			},
			selectGame:function(index,event){
				$(".allGameTitle a").removeClass("active");
				$(event.target).addClass("active")

			},
			 getGameLists () {
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
	                var goodGameRankList= Math.ceil(this.goodGameRank.length/10)
	                //处理goodGameRankList
	                for(var i=0;i<goodGameRankList;i++){
	                	(this.sliderList).push(i)
	                }
	                console.log(this.sliderList)
	                this.cont = res.data.channels[0].modules[4].elements;
	                // 热门游戏
	                this.hotGame = res.data.channels[0].modules[5].elements.slice(0,4);
	               
	                console.log(this.goodGameRank)

	            })
	        },
	        callNative(softType,softName,softId,softDownLoadUrl,softIcon,softPackName,openUrl){
		        	console.log(1)
		            //更多服务器
		            let ts = this;
		            let _port = "";
		            if(window.location.port!=""){
		                _port = ":"+window.location.port;
		            }
		            let _url = window.location.protocol+"//"+window.location.hostname+_port+"/#/servicepage?gameid="+softId;
		            let params = {
		                gameName:softName,
		                gameId:softId,
		                iconUrl:softIcon,
		                packageName:softPackName,
		                downLoadUrl:softDownLoadUrl,
		                openUrl:_url,
		                webUrl:this.webUrl,
		                browser:ts.isIe()?"ie":"chrome",
		            };
		            let _getUrl="/back/game/get/game/soft/data?softName=yy"+"&gameId="+softId;
		            ts.jqajax(_getUrl,{type:"get",dataType:"json"},function(res){
		                //console.log('game',res.data);
		                if(!ts.isLenovo()){
		                    return;
		                }
		                let softBrowser = res.data.softkernel;
		                jsCallNative(softType,params,softBrowser);
		            });
		        },

		}
	
}
