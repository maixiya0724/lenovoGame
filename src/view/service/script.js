import SearchTop from "../../components/searchTop.vue"  
import SearchTitle from "../../components/searchTitle.vue"
import selectData from "../../components/selectData.vue"


export default{
	components:{
		SearchTop:SearchTop,
		SearchTitle:SearchTitle,
		selectData:selectData
	},

	data(){
			return{ 

			userInfo:{name:"啦啦啦",newData:"20"},
			gameId:this.$route.query.gameId

			} 
	},
	methods:{
		chooseData:function(event){
			console.log(event.target) // 选择当前的DOM结构
			
			$(event.target).toggleClass("active")
		},
		mounted(){
			console.log(this.gameId)
		},
		getInfo(cbk){
            getAwardDetail.getAwardDetail(this.gameId).then((res) => {
                $(window).scrollTop(0)
                this.result=res.data.data;
                this.banners=res.data.data.captureFiles;
                for(var i=0;i<this.banners.length;i++){
                    this.bgSize.push(this.banners[i].size);
                    if(this.bgSize[i]=='660*290'){
                        this.Banners.push(this.banners[i].url)
                    }else{
                        //this.bgBanners.push(bg.url)
                    }
                }
                if(cbk)cbk();
                //  上报页面
                this.sendPageInfo()
            })
        },
	}
	
}