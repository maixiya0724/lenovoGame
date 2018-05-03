<template>
	<div class="allGame">
		<div class="allGameMian">
			<SearchTop></SearchTop>
			<div class="slideShow">
				<slider v-bind:sliderList="sliderList" ></slider>
			</div>
			<div class="gameTitle">
				<a :class="index===0?'active':'' "  @click="selectIndex(index,$event)" v-for="(item,index) in gameType">{{item}}</a>
			</div>

			<div class="allGameList clear">
				<div class="allGameMain">
					<gameItem  v-for="(item,index) in sliderList" :key="index" :gameName="item.name" :imgUrl="item.url"></gameItem>
				</div>
			</div>
            <div class="allGamePage">
                <page></page>
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
    }
}
</style>

<script src="./script.js"></script>


