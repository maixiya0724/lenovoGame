<!-- 
    标题组件  默认宽度是100% 如需处理可在外层div overflow:hidden;
    效果为
    https://app.caizhanbao.cn/1524906480%281%29.png
 -->

<template>
	<div class="gameScImgTitle">
		<img class="icon" v-bind:src="imgUrl" />
		<p>{{text}}</p>
	</div>
</template>
<style scoped lang="less">

@import "../common/base.less";

	.gameScImgTitle {
        .px2rem(width,
        170);
        .px2rem(height,
        32);
        .icon {
            display: inline-block;
            .px2rem(width,
            34);
            .px2rem(height,
            34);
           
        }

                        
        p {
            display: inline-block;
            .px2rem(font-size,
            24);
            position: relative;
            .px2rem(top,
            0);
            .px2rem(left,
            20);
            color: #fff;
        }
    }
</style>

<script type="text/javascript">
	export default{
		data(){
				return{}
		},
        props:["imgUrl","text"],

		
	}
</script>