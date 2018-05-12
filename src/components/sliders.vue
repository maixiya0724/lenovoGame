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
			    <a  class="item" @click="getGameYY(item.gameElement.id)" :class="{active:index===0}"  v-for="(item,index) in sliderList" >
			    	<img :src="item.poster" alt=""/>
			    </a>		    
			    
			  </div>
		  
		  <a  class="carousel-control left" href="#myCarousel" data-slide="prev"></a>
		  <a  class="carousel-control right" href="#myCarousel" data-slide="next"></a>
		</div>
	
	    </div> 
</template>
<style scoped lang="less">


</style>

<script type="text/javascript">

	export default{
		
		data(){
			return{
					gameurl:this.gmConf.domainHttps+"passport.4366.com",
                token:"ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9MTY4QUREMzIyMjUwMkEyQzBCRjVDRUIzRDQ0NEIyQzMxJmg9MTUyNjEwNzM2OTA0OCZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y25jStfP5s0L5O2aV5gFX27D",
			}
		},
		
		mounted(){
			this.sliderInit()
			this.getLoginToken()
			
		},
		
		props:["className","sliderList","switchImg"],
		methods:{
			sliderInit:function(){
				$('.carousel').carousel({
				  interval: 2000,
				  
				})
			},
			getLoginToken() {
	            var ts = this;
	            //回调请求token接口
	            //if(!ts.isLenovo()){ return false;}
	            window.tokenCallback = function(options) {
	                if (!options) { return false; }
	                var data = JSON.parse(options);
	                if ($.trim(data.token) == "") { return false; }
	                // ts.loginToken = data.token;
	                ts.userId = data.userid;
	                ts.token = data.token;
	                console.log(data)
	                // ts.errorShow(data);
	            }

	            if (!ts.isIe()) {
	                if (!this.isLenovo()) { return; }
	                callHostFunction.getYYPermission(tokenCallback);
	            } else {
	                if (!this.isLenovo()) { return; }
	                let _data = window.external.getYYPermissionIe();
	                var data = JSON.parse(_data);
	                ts.userId = data.userid;
	                ts.token = data.token;
	                //ts.errorShow(data);
	            }
	        },
			getGameYY(gameId,clk){
	            var ts=this
				console.log(this.sliderList)
	            console.log(gameId)
	            var _url="/back/game/get/game/soft/data?softName=yy"+"&gameId="+gameId;

	            var ts=this;
	            ts.jqajax(_url,{type:"get",dataType:"json"},function(res){
	                console.log(res)
	                ts.softBrowser = res.data.softkernel;
	                ts.softid=res.data.softId;//game值
	                    ts.gameStart(ts.softid);
	            });
	        },
	          //开始游戏
		        gameStart(_sid){
		            var ts = this;
		            if(!_sid)return false;
		            var _url = ts.gameurl+"/channel/lenovo/gamecenter/login.do";
		            _url += "?game="+ts.softid;
		            _url += "&token="+ts.token;
		            _url += "&server="+_sid;
		            _url += "&failUrl="+encodeURIComponent(window.location.href);
		            console.log(_url,_sid);
		           
		            
		            window.open(_url)
		        },
		}
	}
</script>