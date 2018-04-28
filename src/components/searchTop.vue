<template>
	<div class="searchGameTop">
		<div class="topLeft">联想游戏中心/找游戏</div>
		<div class="topRight">
			<div class="formInput">
				<span></span>
				<input type="text" name="" placeholder="Search..." />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">

@import "../common/base.less";

.searchGameTop{
	.px2rem(width,1200);
	.px2rem(height,117);
	.topLeft{
		float: left;
		.px2rem(line-height,117);
		.px2rem(font-size,24);
		color: #999999;
	}
	.topRight{
		float: right;
	}
	.formInput{
		.px2rem(width,290);
		.px2rem(height,30);
		.px2rem(margin-top,50);
		background: #eef1f6;
		.px2rem(border-radius,15);
		position: relative;
		span{
			display: block;
			float: left;
			.px2rem(width,20); 
			.px2rem(height,20);
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background: url("../../static/img/search_game.png");
			background-size: 100% 100%;
			.px2rem(margin-left,17);

		}
		input{
			float: right;
			.px2rem(width,215);
			.px2rem(height,30);
			.px2rem(margin-right,20);
			background: #eef1f6;
			.px2rem(font-size,12);
			border: none;
			outline:none;

		}

	}

}
</style>


<script type="text/javascript">
	export default{
		data(){
				return{}
		},

		
	}
</script>