<template>
	<div class="allGame">
		<div class="allGameMian">
			<SearchTop></SearchTop>
			<div class="slideShow">
				<slider v-bind:sliderList="banners"></slider>
			</div>
			<div class="gameTitle">
				<a :class="index===0?'active':'' "  @click="selectIndex(index,item)" v-for="(item,index) in gameCategory2">{{item.cateName}}</a>
			</div>
			<div class="allGameList clear">
                <div v-if="!flag" class="searchNoGame">
                    <div class="noGame">
                        <div class="noGameImg"></div>
                        <p>"非常抱歉，没有找到您想要的内容"</p>
                    </div>
                </div>
                
				<div class="allGameMain" v-if="flag">
                        <div class="gameItem" v-for="(item,index) in listGame">
                            <div class="itemImg">
                                <a   @click="getGameYY(item.id)"><img v-bind:src="item.bgUrl" alt=""/></a>
                                <div class="itemStart">
                                    <span class="gameIn"></span>
                                    <a @click="getGameYY(item.id)">进入游戏</a>
                                    <span class="gameC"></span>
                                    <a @click="chooseSer(item.id)">选服</a>
                                </div>
                            </div>
                            <div class="itemName">{{item.gameName}}</div>
                        </div>  
				</div>
			</div>
            <div class="allGamePage">
                    <div id="page">
                        <ul class="pagination">
                            <li v-show="current != 1" @click="current-- && goto(current)" ><a class="next">上一页</a></li>
                            <li v-for="index in pages" @click="goto(index)" :key="index">
                              <a :class="{'active':current == index}"  href="#" >{{index}}</a>
                            </li>
                            <li  v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a class="next" href="#" >下一页</a></li>
                            <span class="allPage">共{{pages.length}}页</span>
                            <div class="jumpPage"><span>到第</span><input class="pageNum" value="1" /> <label>页</label> <input type="button" class="btnPage" value="确定"></div>
                        </ul>
                    </div>
            </div>
				
		</div>
	</div>
</template>

<style scoped lang="less" src="./style.less"></style>
<style lang="less"> // 全局样式 去掉scoped 为了控制子组件轮播图的样式
@import "../../common/base.less"; 

.allGame {
    .allGameMian {
        .slideShow{
			.px2rem(width, 1200);
        	.px2rem(height, 400);
        .slider {
            .px2rem(width, 1200);
            .px2rem(height, 400);
            .carousel {
                .px2rem(width, 1200);
                .px2rem(height, 400);
                .carousel-inner {
                    .item {
                        .px2rem(width, 1200);
                        .px2rem(height, 400);
                        img {
                            .px2rem(width, 1200);
                            .px2rem(height, 400);
                        }
                    }
                } // 轮播图图标的样式
                .carousel-indicators {
                    .px2rem(bottom, -10);
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
                         margin: none;
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
    }
}
</style>

<script src="./script.js"></script>


