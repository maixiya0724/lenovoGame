import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";


export default{
	components:{
		SearchTop:SearchTop,
		SearchTitle:SearchTitle,
		slider:slider
	},
	
	data(){
			return{  
				sliderList:[{url:"https://app.caizhanbao.cn/00030873-5852-47c8-ac75-ed094865354d.png",index:1},{url:"https://app.caizhanbao.cn/0006e261-6b8f-42b2-8c42-bfd8c9f6d81a.png",index:2},{url:"https://app.caizhanbao.cn/0026a103-f0a9-49dd-9bd5-dbc37a84f320.png",index:3},{url:"https://app.caizhanbao.cn/0026a103-f0a9-49dd-9bd5-dbc37a84f320.png",index:4}],
			} 
	},
	
}