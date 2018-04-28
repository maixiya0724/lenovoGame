

<template>
	<div class="clearfix search">
		<div class="search_sliders">
			<slider v-bind:sliderList="sliderList" ></slider>
		</div>
	</div>
</template>

<style scoped lang="less" src="./style.less"></style> 

<style lang="less"> // 全局样式 去掉scoped 为了控制子组件轮播图的样式
@import "../../common/base.less"; 

.search {
    .search_sliders {
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
}
</style>

<script src="./script.js"></script>