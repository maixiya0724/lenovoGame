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

			} 
	},
	methods:{
		chooseData:function(event){
			console.log(event.target) // 选择当前的DOM结构
			
			$(event.target).toggleClass("active")

		}
	}
	
}