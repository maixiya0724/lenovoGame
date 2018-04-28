<!-- 
    展示游戏信息的页面
    效果为 
    https://app.caizhanbao.cn/1524906254%281%29.png
    
 -->


<template>
	<div class="gameItem">
		<div class="itemImg">
			<img v-bind:src="imgUrl" alt=""/>
			<div class="itemStart">
				<span class="gameIn"></span>
				<span>进入游戏</span>
				<span class="gameC"></span>
				<span>选服</span>
			</div>
		</div>
		<div class="itemName">{{gameName}}</div>
	</div>	
</template>

<style scoped lang="less">

@import "../common/base.less";
.clearfix {
    zoom: 1
}

.clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both
}

.gameItem{
    .px2rem(width,270);
    .px2rem(height,270);
    float: left;
    .px2rem(margin-top,20);
    .px2rem(margin-left,20);
    .px2rem(margin-right,20);
    .px2rem(margin-bottom,20);     
}

.itemImg{
    width: 100%;
    position: relative;
    .px2rem(height,210);
    img{
        width: 100%;
        .px2rem(height,210);

    }
    .itemStart{
        width: 100%;
        .px2rem(height,32);
        position: absolute;
        left: 0;bottom: 0;

        background: rgba(0,0,0,0.5);
        text-align: center;
        .px2rem(line-height,32);
        color: #fff;
        span{
            display: inline-block;
            .px2rem(font-size,16);
            float: left;
        }
        .gameIn{
            
            .px2rem(width,20);
            .px2rem(height,20);
            .px2rem(margin-top,6);
            .px2rem(margin-left,15);
            .px2rem(margin-right,10);
            background: url("../../static/img/icon_gameIn.png");
            background-size: 100% 100%;
        }
        .gameC{
            .px2rem(margin-left,10);
            .px2rem(width,20);
            .px2rem(height,20);
            .px2rem(margin-top,6);
            .px2rem(margin-left,15);
            .px2rem(margin-right,10);
            background: url("../../static/img/icon_gameC.png");
            background-size: 100% 100%;
            .px2rem(margin-left,60);
        }

    }

    
}
.itemName{
        .px2rem(width,270);
        .px2rem(height,55);
        .px2rem(font-size,18);
        .px2rem(line-height,55);
        .px2rem(text-indent,10);
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        background: rgba(0,0,0,0.5);
    }

</style>

<script type="text/javascript">

	export default{
		data(){
				return{}
		},
		props:["gameName","imgUrl"]

	}
    
</script>