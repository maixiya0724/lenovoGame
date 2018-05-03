<!-- 
	分页组件
	
 -->

<template>
	<div id="page">
		<ul class="pagination">
            <li v-show="current != 1" @click="current-- && goto(current)" ><a class="next">上一页</a></li>
            <li v-for="index in pages" @click="goto(index)" :key="index">
              <a :class="{'active':current == index}"  href="#" >{{index}}</a>
            </li>
            <li  v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a class="next" href="#" >下一页</a></li>
            <span class="allPage">总共{{pages.length}}</span>
        </ul>
	</div>
</template>

<style scoped lang="less">
@import "../common/base.less";
#page{
  .px2rem(width,740);
  .px2rem(height,40);
  margin: 0 auto;
  background: blue;
	.pagination li{
		.px2rem(width,40);
		.px2rem(height,40);
		
		a{
			.px2rem(width,40);
			.px2rem(height,40);
			.px2rem(line-height,40);
			.px2rem(font-size,12);
      .px2rem(margin-left,7);
			text-align: center;
			padding: 0;
			color: #4f504f;
      border:none;
		}
		.active{
			background: #4e92ff;
			color: #fff;
		}

		.next{
			.px2rem(height,40);
			.px2rem(width,65);
		}

		
	}
  .allPage{
    .px2rem(line-height,40);
    .px2rem(margin-left,20)
  }

}

</style>


<script type="text/javascript">


	export default{
		data(){
				  return{
		            current:1,
		            showItem:5,
		            allpage:13,
		          }
		},
		computed:{
			
          pages:{
          	get:function(){
          		var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                       console.log(pag)
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                   
                 return pag
             },
             set:function(newValue){//如果不写计算属性的set，vue会报错
             	

             }
          }
      },
		methods:{
			 goto:function(index){
	          if(index == this.current) return;
	            this.current = index;
	            //这里可以发送ajax请求
	        },
	        pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
		}

	}
    
</script>