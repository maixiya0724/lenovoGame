import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";
import selectData from "../../components/selectData.vue";
import Page from "../../components/page.vue"


export default{
	components:{
		SearchTop:SearchTop,
		SearchTitle:SearchTitle,
		slider:slider,
		selectData:selectData,
		Page:Page
	},
	
	data(){
			return{  
				sliderList:[{url:"https://app.caizhanbao.cn/00030873-5852-47c8-ac75-ed094865354d.png",index:1},{url:"https://app.caizhanbao.cn/0006e261-6b8f-42b2-8c42-bfd8c9f6d81a.png",index:2},{url:"https://app.caizhanbao.cn/0026a103-f0a9-49dd-9bd5-dbc37a84f320.png",index:3},{url:"https://app.caizhanbao.cn/0026a103-f0a9-49dd-9bd5-dbc37a84f320.png",index:4}],
				
			} 
	},
	mounted(){
		this.getLoginToken();
	},
	methods:{

		//获得登录接口
        getLoginToken(){
            var ts = this;
            if(!ts.isLenovo()){ return false;}
            //回调请求token接口
            window.tokenCallback = function(options){
            	console.log(options)
            	
                if(!options){ return false;}
                let data = JSON.parse(options);

                if($.trim(data.token) == ""){return false; }
                ts.loginToken = data.token;
                var redirect_uri = window.location.href;
            }
            //跳转
            callHostFunction.getToken(tokenCallback);
        },

	}
	
}