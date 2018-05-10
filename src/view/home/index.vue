

<template>
	<div class="clearfix gameLogout">
		<div class="gameLogoutMain">
			<SearchTop></SearchTop>
				<div class="centerTop">
					<div v-if="false"  class="centerTopL">
					<div class="userTitle">
						<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg" alt="">
					</div>
					<a class="goLogin" @click="mustLogin">立即登录</a>
					<p>登录以后显示您的游戏内容</p>
				</div>
				<div  class="centerTopL">
					<div class="userInfo">
						<div class="userInfoImg">
							<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2149816710,2448729299&fm=27&gp=0.jpg" alt="">
						</div>
						<div class="userInfoName">
							<div class="name">游戏名称最多4</div>
							<div class="logout">退出</div>
						</div>
					</div>
						<div class="myGameList">
							<div class="title">我的游戏</div>
							<div class="dataList">
								<a class="dataItem" v-for="(item,index) in playLatests">
									<div class="itemName">{{item.gameName}}</div>
									<div class="itemNum">{{item.serverName}}</div>
									<div class="itemStart" @click="myStartGame(item.gameAb,item.serverId)">进入游戏</div>
								</a>
							</div>
						</div>
					</div>
				<div  class="centerTopR">
					<slider v-bind:sliderList="banners" ></slider>
				</div>

			</div>
			<div class="reGame">
				<SearchTitle text="推荐游戏" imgUrl="../../../static/img/reImg.png"></SearchTitle>
				<a class="moreGame" @click="moreGame">更多</a>
				<div class="gameList">
					<div class="gameListMain">
					<div v-for="(item,index) in hotGame" class="gameItem">
						<div class="itemImg">
							<a :href="item.url">
								<img :src="item.poster" @click="getGameYY(item.gameElement.id)" alt=""/>
							</a>

							<div class="itemStart">
								<span class="gameIn"></span>
								<a  @click="getGameYY(item.gameElement.id)">进入游戏</a>
								<span class="gameC"></span>
								<a @click="goDetails(item.gameElement.id)">选服</a>
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
	      										    		<a class="allDataSub" @mouseout="hideStartGame(index)" @mouseover="showStartGame(index,$event)" v-for="(items,index) in goodGameRank" href="#">
	      										    			<li>
					      											<div class="one">{{items.elementName}}</div>
																	<div class="two">{{items.subTitle}}</div>
																	<div  class="three">{{items.subTitleLink}}</div>
																	<div @click="getGameYY(items.gameElement.id
)" style="color:#fff;" class="startGame">进入游戏</div>
					      										</li>
	      										    		</a>
				      										
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
						<a class="moreGame" @click="moreGame">更多</a>
							<SearchTitle text="热门游戏" imgUrl="../../../static/img/hot.png"></SearchTitle>

							<div class="imgList">
								<div class="imgOver">
									<a class="imgListItem" @click="getGameYY(item.gameElement.id)"  href="#" v-for="(item,index) in goodGame">
										<img :src="item.poster" alt="游戏图片"/>
									</a>
								</div>
							</div>
							<div class="allGame">
								<a class="moreGame" @click="moreGame">更多</a>
								<div class="allGameTitle">
									<a  @click="selectIndex(index,item)" :class="index===0?'active':''" v-for="(item,index) in gameCategory2" >{{item.cateName}}</a>
								</div>
								<div class="gameIconList">
									<div class="gameIconMove">
										<div class="gameIconItem" v-for="(item,index) in listGame">
											<div class="iconImg">
												<a>
												<img @click="getGameYY(item.id)" :src="item.icon" alt="游戏图标"/>
													
												</a>
											</div>
											<p>{{item.gameName}}</p>
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
         position: relative;
        .slider {
            .px2rem(width, 900);
        .px2rem(height, 400);
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
                        background: #4e92ff;
                        .px2rem(margin-top,-10);
                    }
                }
                .carousel-control{ // 控制上下样式
                	.px2rem(width,18);
                	.px2rem(height,48);
                	position:absolute;
                	top:50%;
  					transform: translateY(-50%);
  					opacity: 1;
                    filter: alpha(opacity=100);
                }
                .left{
                	background:url("../../../static/img/last.png");
                	background-size:100% 100%;
                }
                .right{
					background:url("../../../static/img/next.png");
                	background-size:100% 100%;
                }
            }
        }
    }



</style>




<script src="./script.js"></script>