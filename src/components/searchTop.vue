<!-- 
	游戏头部搜索页面 含有搜索框   
	效果链接为  
	https://app.caizhanbao.cn/1524906737%281%294%E7%8E%A92.png
 -->

<template>
	<div class="searchGameTop">
		<div class="topLeft">联想游戏中心/找游戏</div>
		<div class="topRight">
			<div class="formInput">
				<span @click="search(searchInput)" ></span>
				<input type="text" @keyup.enter="search(searchInput)"  v-model="searchInput"  placeholder="Search..." />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">

@import "../common/base.less";

.searchGameTop{
	.px2rem(width,1200);
	.px2rem(height,117);
	.topLeft{
		float: left;
		.px2rem(line-height,117);
		.px2rem(font-size,24);
		color: #fff;
	}
	.topRight{
		float: right;
	}
	.formInput{
		.px2rem(width,290);
		.px2rem(height,30);
		.px2rem(margin-top,50);
		 background: rgba(0,0,0,0.2);
		.px2rem(border-radius,15);
		color: #fff;
		position: relative;
		span{
			display: block;
			float: left;
			.px2rem(width,20); 
			.px2rem(height,20);
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background: url("../../static/img/search_game.png");
			background-size: 100% 100%;
			.px2rem(margin-left,17);
		}
		input{
			float: right;
			.px2rem(width,215);
			.px2rem(height,30);
			.px2rem(margin-right,20);
			color: #fff;
			background: none;
			.px2rem(font-size,12);
			border: none;
			outline:none;
		}

	}

}
</style>
<script type="text/javascript">
	export default{
		data(){
				return{
					searchInput:"",
				}
		},
		mounted(){
		
		},
		methods:{
			
			 // 跳转搜索页传参
        	search(info){
        		console.log(0)
	            if(info==''){
		                return false
		            }
		            const options = {
		                eventId: '001',
		                eventDes: '搜索游戏',
		                searchName: info
		            };
		            this.$router.push({path: '../search', query: {info:info}});
		        },

			}


		
	}
</script>