<!-- 
    展示游戏信息的页面
    效果为 
    https://app.caizhanbao.cn/1524906254%281%29.png
    
 -->


<template>
	<div class="gameItem">
		<div class="itemImg">
            <a   @click="goDetails(channelInfo.name,`${channelInfo.id}`,ItemID)"><img v-bind:src="imgUrl" alt=""/></a>
			<div class="itemStart">
				<span class="gameIn"></span>
				<a @click="getGame(ItemID)">进入游戏</a>
				<span class="gameC"></span>
				<a>选服</a>
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
a:hover, a:focus {
    text-decoration: none;
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
        color: #f6f6f6;
        span,a{
            display: inline-block;
            .px2rem(font-size,16);
            float: left;
            color: #f6f6f6;
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
        color: #f6f6f6;
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
				return{
                    token:"ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9QzAwQjE5OTQ1QTBENjFEMjFBMDQ3RTNFRUZFQjM2QUYxJmg9MTUyNTY4ODEzNDMxOCZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y25SQaOHJZQ0p025MiLRZoRp",
            //进入游戏接口
            gameurl:this.gmConf.domainHttps+"passport.4366.com",
            softid:""
                }
		},
        props:{
            gameName:String,
            imgUrl:String,
            ItemID:Number,
            channelInfo:Object,
            gameItem:Object,
            

        },
        methods:{
             // 跳转详情页路由传参
        goDetails(name,channelId,id){
            console.log(name+'/'+channelId+'/'+id)
            const options = {
                eventId:'003',
                eventDes:'查看游戏详情',
                gameId:id
            }
            this.$router.push({name: 'gamedetail', query: {name:name,channelId:channelId,id: id,pageId:'101'}});
        },
        mounted(){

        },

      //获取YYgame
        getGame(gameId,callback){
            var ts=this
            console.log(gameId)
            var _url="/back/game/get/game/soft/data?softName=yy"+"&gameId="+gameId;
            var ts=this;
            ts.jqajax(_url,{type:"get",dataType:"json"},function(res){
               
                ts.softBrowser = res.data.softkernel;
                ts.softid=res.data.softId;//game值
                ts.gameStart(ts.softid);
            });
        },
         //开始游戏
        gameStart(_sid){
            var ts = this;
            if(!_sid)return false;
            var _url = ts.gameurl+"/channel/lenovo/gamecenter/login.do";
            _url += "?game="+ts.softid;
            _url += "&token="+ts.token;
            _url += "&server="+_sid;
            _url += "&failUrl="+encodeURIComponent(window.location.href);
            console.log(_url,_sid);
            ts.popVideo(_url);
            
              window.location.href = _url;
        },
          //客户端弹窗
        popVideo(_url){
            var ts = this;
            if(!_url || !ts.isLenovo())return;
            if(!ts.isIe()){
                callHostFunction.callBackVideo(_url,ts.softBrowser);
            }else{
                window.external.callBackVideo(_url,ts.softBrowser);
            }

        },
        
        }

	}
    
</script>