

<template>
	<div class="clearfix gameLogout">
		<div class="gameLogoutMain">
			<SearchTop></SearchTop>
			<div class="centerTop">
				<div  class="centerTopL">

					<div class="userTitle"></div>
					<div class="goLogin">立即登录</div>
					<p>登录以后显示您的游戏内容</p>
				</div>
				<div v-if="false" class="centerTopL">
					<div class="userInfo">
						<div class="userInfoImg"></div>
						<div class="userInfoName">
							<div class="name">游戏名称最多4</div>
							<div class="logout">退出</div>
						</div>
					</div>
					
						<div class="myGameList">

							<div class="title">我的游戏</div>
							<div class="dataList">
								<div class="dataItem">
									<div class="itemName">游戏名称七个字</div>
									<div class="itemNum">909服</div>
									<div class="itemStart">进入游戏</div>
								</div>

							</div>
					
					</div>
				</div>
				<div class="centerTopR">
					<slider v-bind:sliderList="sliderList" ></slider>
				</div>

			</div>

			<div class="reGame">
				<SearchTitle text="推荐游戏" imgUrl="../../../static/img/reImg.png"></SearchTitle>

				<div class="gameList">
					<div class="gameListMain">
					<div v-for="(item,index) in reImgList" class="gameItem">
						<div class="itemImg">
							<img :src="item.url" alt=""/>
							<div class="itemStart">
								<span class="gameIn"></span>
								<span>进入游戏</span>
								<span class="gameC"></span>
								<span>选服</span>
							</div>
						</div>
						<div class="itemName">{{item.name}}</div>
					</div>

				</div>
				</div>
			</div>

			<div class="dataListGame">
					<div class="dataListL">
						<div class="list">
							<SearchTitle text="开服列表" imgUrl="../../../static/img/search_list.png"></SearchTitle>
							<div class="dataSevList">
								 <div class="listTitle">
									<div class="one">游戏名称</div>
									<div class="two">开服区</div>
									<div class="three">日期</div>
								</div>
								
								<div class="swiperList">
									<!-- 轮播图 -->
									<div  class="slider">
										<!-- 注意这里ID是要保持唯一性 -->

								  			 <div id="myCarousel2" class="carousel slide">
	      										  <ol class="carousel-indicators">
	      										    <li data-target="#myCarousel2" v-for="(item,index) in sliderList" :index="index" :data-slide-to="index" class="active"></li>
	      										    
	      										  </ol>
	      										 
	      										  <div class="carousel-inner">
	      										    <div  class=" item" :class="{active:index===0}"  v-for="(item,index) in sliderList" >
	      										    	<ul class="allData">
				      										<li v-for="(items,index) in dataSerList">
				      											<div class="one">{{items.name}}</div>
																<div class="two">{{items.data}}</div>
																<div class="three">{{items.time}}</div>
				      										</li>
				      									</ul>
	      										    </div>		    
	      										    
	      										  </div>
	      									</div>
								    </div> 
									
								</div> 

								
							</div>
						</div>
					</div>

					<div class="dataListR">
							<SearchTitle text="热门游戏" imgUrl="../../../static/img/hot.png"></SearchTitle>
							<div class="imgList">
								<div class="imgOver">
									<div class="imgListItem" v-for="(item,index) in hotGame">
										<img :src="item.url" alt="游戏图片"/>
									</div>
								</div>
							</div>
							<div class="allGame">
								<div class="allGameTitle">
									<div class="active">123232</div>
									<div>1232</div>
									<div>1223232</div>
									<div>123243</div>
								</div>
								<div class="gameIconList">
									<div class="gameIconMove">
										<div class="gameIconItem">
											<div class="iconImg">
												<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg" alt="游戏图标"/>
											</div>
											<p>游戏名称</p>
										</div>
																				
									</div>
								</div>


							</div>
					</div>
			</div>

				<page></page>
			
		</div>
	</div>
</template>

<style scoped lang="less" src="./style.less"></style>

<style lang="less"> // 全局样式 去掉scoped 为了控制子组件轮播图的样式

@import "../../common/base.less"; 




    .centerTopR {
        .px2rem(width, 900);
        .px2rem(height, 400);
        background: red;
        .slider {
            .px2rem(width, 900);
        .px2rem(height, 400);
            background: red;
            .carousel {
                .px2rem(width, 900);
        		.px2rem(height, 400);
                .carousel-inner {
                    .item {
                        .px2rem(width, 900);
        				.px2rem(height, 400);
                        img {
                           .px2rem(width, 900);
        				   .px2rem(height, 400);
                        }
                    }
                } // 轮播图图标的样式
                .carousel-indicators {
                    .px2rem(bottom, 10);
                    li {
                        .px2rem(width, 10);
                        .px2rem(height, 10);
                        .px2rem(margin-left, 3);
                        .px2rem(margin-right, 3);
                        background: #383838;
                        border: none;
                    }
                    .active {
                        .px2rem(width, 10);
                        background: #fff;
                        margin: none;
                    }
                }
                .carousel-control{ // 控制上下样式
                	display: none;
                }
            }
        }
    }



</style>




<script src="./script.js"></script>