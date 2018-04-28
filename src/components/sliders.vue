<!-- 
	轮播图的组件 注意请在父组件里面定义轮播图的大小 下标的样式 和滑动组件的样式  
	在父组件的style 要设置为全局样式，这样样式才可以渲染到轮播图,为了避免污染全局，请给该插件创建一个父级div，并保证class唯一性，如果一个页面有多个轮播图，请保证data-target锚点值得唯一性。


 -->

<template>
	
	<div  class="slider">
	        <div id="myCarousel" class="carousel slide">
		  <ol class="carousel-indicators">
		    <li data-target="#myCarousel" v-for="(item,index) in sliderList" :index="index" :data-slide-to="index" class="active"></li>
		  </ol>
		  <div class="carousel-inner">
		    <div  class=" item" :class="{active:index===0}"  v-for="(item,index) in sliderList" >
		    	<img :src="item.url" alt=""/>
		    </div>		    
		    
		  </div>
		  
		  <a v-if="sliderList" class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
		  <a v-if="sliderList" class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
		</div>
	
	    </div> 
</template>
<style scoped lang="less">


</style>

<script type="text/javascript">

	export default{
		
		data(){
			return{
					
			}
		},
		
		mounted(){
			this.sliderInit()
		},

		props:["className","sliderList","switchImg"],
		methods:{
			sliderInit:function(){
				$('.carousel').carousel({
				  interval: 2000,
				  
				})
			}
		}

	}
</script>