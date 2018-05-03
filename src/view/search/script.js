import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";


export default{
	components:{
		SearchTop:SearchTop,
		SearchTitle:SearchTitle
	},
	
	data(){
			return{  
				inputText:this.$route.query.info,
				gameData:{
					
					name:"英雄联盟",
					info:"游戏简介",
					url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg",
					sreenUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg",
				},
				startUrl:"https://www.baidu.com",
				hotGameList:[{name:"绝地求生",imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg"},{name:"绝地求生",imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg"},{name:"绝地求生",imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg"},{name:"绝地求生",imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg"}]
			} 
	},
	mounted(){
		console.log(this.inputText)
	},
	methods:{
		startGame:function(){
			window.location.href=this.startUrl
		}
	}
	
}