import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import getGame from '@/api/getSearch'
import getAwardDetail from '@/api/award/award-add'
import {jsCallNative} from "../../common/callnative"
export default{
	components:{
		SearchTop:SearchTop,
		SearchTitle:SearchTitle
	},

	data(){
			return{  
				inputText:this.$route.query.info,//路由传递过来的值
				gameList:[],//搜索到的游戏数组
				flag:false,//搜索结果
				hotGame:[],// 热门推荐
			} 
	},
	mounted(){
		this.getSearch(this.inputText)
		this.getGameLists()
	},
    watch:{

    $route(){
          this.inputText=this.$route.query.info;
          this.getSearch(this.inputText)
      }

    },

	methods:{
		startGame:function(){
			window.location.href=this.startUrl
		},
		// 页面执行请求搜索数据
        getSearch(info){
            getGame.getSearch(info,'','').then((res) => {
            	console.log(res)
                if(!res.data.datas[0]){
                    this.gameList = [];
                    this.flag = false
                }else{
                	this.flag = true
                    this.gameList = res.data.datas
                    console.log(this.gameList)
                }

                // 遍历把235*132的图片加到游戏list里
                for (let j=0;j<this.gameList.length;j++){
                    if(!this.gameList[j].captureFiles){
                        this.gameList[j].bgUrl = ''
                    }else {
                        for(let i =0;i<this.gameList[j].captureFiles.length;i++){
                            if(this.gameList[j].captureFiles[i].size=='235*132'){
                                this.gameList[j].bgUrl = this.gameList[j].captureFiles[i].url
                            }else{}
                        }
                    }
                }
            })
        },
        //请求游戏数据
        getGameLists () {
            // 接口地址在serviceUrl里
            getAwardDetail.getAwardDetail(98).then((res) => {
            	console.log(res.data)
                // 热门游戏
                this.hotGame = res.data.channels[0].modules[5].elements.slice(0,4);

                console.log(this.hotGame)
                
            })
        },
        // 向native交互传参 开始游戏
        callNative(softType,softName,softId,softDownLoadUrl,softIcon,softPackName,openUrl){
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