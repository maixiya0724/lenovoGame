<template>
	<div  class="slider">
        <div id="myCarousel" class="carousel slide">
		  <ol class="carousel-indicators">
		    <li data-target="#myCarousel" v-for="(item,index) in sliderList" :index="index" data-slide-to="index" class="active"></li>
		    
		  </ol>
		  <!-- Carousel items -->
		  <div class="carousel-inner">
		    <div  class=" item" :class="{active:index===0}"  v-for="(item,index) in sliderList" >
		    	<img :src="item.url" alt=""/>
		    </div>		    
		    
		  </div>

		  <!-- Carousel nav -->
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