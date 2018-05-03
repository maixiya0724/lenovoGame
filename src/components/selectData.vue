<!-- 
下拉选项组件  
 -->

<template>
	<div class="dropdown">
		<button type="button" class="btn dropdown-toggle" id="dropdownMenu1" 
				data-toggle="dropdown">
			{{dataName}}
			<span class="caret"></span>
		</button>
		<ul class="dropdown-menu" @click="getValue" role="menu" aria-labelledby="dropdownMenu1">
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#">Java</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#">数据挖掘</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#">数据通信/网络</a>
			</li>
			<li role="presentation">
				<a role="menuitem" tabindex="-1" href="#">分离的链接</a>
			</li>

		</ul>
		
	</div>
</template>
<style scoped lang="less">

@import "../common/base.less";

.page{
	.px2rem(width,1200);
	height: auto;
}
.btn{
	display: block;
	.px2rem(width,100);
	.px2rem(height,38);
	.px2rem(line-height,38);
	.px2rem(border-radius,5);
	color: #fff;
	padding: 0;
	text-align: center;
	.px2rem(font-size,14);
	background: rgb(46,39,108,0.2);
	.px2rem(margin-left,10);
	.px2rem(margin-top,-8);
	overflow: hidden;
}
.caret{
	.px2rem(width,12);
	.px2rem(height,15);
	.px2rem(margin-left,15);
	background: url("../../static/img/jiantou.png");
	background-size: 100% 100%;
	border:none;
	vertical-align:inherit;
}


</style>

<script type="text/javascript">

	export default{
		data(){
				return{
					dataName:"测试服"
				}
		},
		props:{
			dataNameProps:"123"
		},
		methods:{
			getValue:function(e){
				console.log(e.target.innerHTML)// 选择的值
				this.dataName = e.target.innerHTML
			}
		}

	}
    
</script>