/**
 * Created by rzl on 2018/4/19
 */
export default {
    name:"appChoice",
    data () {
        return {
            //热门数据
            hotData:[
                {
                    img:"/static/img/live/live-index1.png",
                    name:"英雄联盟",
                    gid:1,
                },
                {
                    img:"/static/img/live/live-index2.png",
                    name:"绝地求生",
                    gid:2793,
                },
                {
                    img:"/static/img/live/live-index3.png",
                    name:"王者荣耀",
                    gid:2336,
                },
                {
                    img:"/static/img/live/live-index4.png",
                    name:"星秀",
                    gid:1663,
                },
                {
                    img:"/static/img/live/live-index5.png",
                    name:"颜值",
                    gid:2168,
                },
                {
                    img:"/static/img/live/live-index6.png",
                    name:"体育竞技",
                    gid:100042,
                },

            ],
            webUrl:window.location.href,
            moreUrl:"/livelist", //更多链接
            allGmData:[], //所有游戏数据
            carouselData:[],//获得所有轮播数据
            carouselData1:"",//
            selectedData:[],//精选数据
            yxlmData:[],//英雄联盟数据
            videoPopHost:"",
            loginToken:"",//请求token
            // ZAgAAAAAAAGE9MTAxMTU5NTU3NDMmYj0yJmM9NCZkPTE2ODYwJmU9MUZERjUwN0JCM0VEMzQxMUIzNDlBMjhEQjA5QjIxMTcxJmg9MTUyMzk1NDAyMzMxMiZpPTMwMjQwMCZvPVZNd2FyZS01Nis0ZCsxYyszZitmYisyNCsxNStmYi02MyswYysxMCthZCszMitkYitjJnA9bXV1aWQmcT0wJnVzZXJuYW1lPTE1NjUyMjI4ODk4JmlsPWNuV6w5Nodl27ILeakxI3EC-w
            videoPopUrl: "https://udb3lgn.huya.com/lenovo/login",
            //?redirect_uri="+redirect_uri+"&token="+this.loginToken
            enterTime:'',
            gid:this.$route.query.gid,
            previousPage:''//页面上报上一个页面id
        }
    },
    created () {
        //开始创建
    },
    computed: {
        //计算属性
    },
    mounted() {
        // this.pageSendSrart();
        this.getLoginToken(); //请求登录

        //this.getGameLists();
        this.getAllGame(); //获得所有分类
        this.getRdmData(()=>{
            this.ccarouselChange();
        }); //获得所有随即数据
        this.getYxlmData(); //获得英雄联盟数据


        //适配插件
        //G.adaptation({
        //    size:1000, //适配宽度，以设计图为准,默认640
        //    cssUrl:[
        //        "/static/css/test.css", //要适配的样式表，支持 ID CLASS 和远程
        //    ],
        //    lastpx:0.5,//最小PX
        //    cbk:function(){  //适配成功后回调函数
        //        console.log("改变成功123");
        //    }
        //});

    },
    methods: {
        // pageSendSrart(){
        //     this.enterTime=+ new Date();
        // },
        //直播事件上报
        // sendReport(options){
        //     options.cpId='02';
        //     options.eventDes='更多游戏';
        //     options.reportType='events';
        //     console.log(options);
        //    // callHostFunction.findComputerInfo(callback(options));//调用客户端方法获取信息
        //     callback(options)//测试数据上报是否成功
        // },
        //点击直播间上报
        // studioReport(options){
        //     options.cpId='02';
        //     options.reportType='players';
        //     console.log(options);
        //     // callHostFunction.findComputerInfo(callback(options));//调用客户端方法获取信息
        //     callback(options)//测试数据上报是否成功
        // },
        //获取url中的参数
        getUrlParam(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            let r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
        //页面跳转
        jump(name,pms){
            if(!name || !pms)return;
            let _name = name.toString();
            if(_name == ""){ _name = "livelist";}
            this.$router.push({name:_name,query:pms});
          //   const options={
          //       modelId:pms.modelId
          //   }
          // //   this.sendReport(options)
        },
        btngoinShow(){
            $("#video-carousel").find(".goin").show();
        },
        btngoinHide(){
           // $("#video-carousel").find(".goin").hide();
        },
        //轮播切换
        ccarouselChange() {
            let _ckey = 0,_cobj = $("#video-carousel"),_ts=this,_nowobj;
            _cobj.find('.btnlist').find("li").eq(0).addClass("on").siblings("li").removeClass("on");
            _cobj.find('.btnlist').delegate("li","click",function(e){
                var _this = $(this);
                _nowobj = _this;
                 _ckey = _this.index();
                _this.addClass('on').siblings('li').removeClass('on');
                cgvideo(_this);
            });

            let _goin = false;
            $("#video-carousel .videos").hover(function(){
                $("#video-carousel").find(".goin").show();
            },function(){
                if(!_goin){
                    $("#video-carousel").find(".goin").hide();
                }
            });

            $("#video-carousel .btnlist").hover(function(){
                _goin = true;
            },function(){
                _goin = false;
            });

            $("#video-carousel .goin").hover(function(){
                _goin = true;
            },function(){
                _goin = false;
            });
            ////鼠标移动上去
            //_cobj.delegate('.goin',"mouseover",function(e){
            //    _cobj.find(".goin").fadeIn();
            //});
            ////_cobj.delegate.('.goin',"mouseout",function(e){
            ////    _cobj.find(".goin").fadeOut();
            ////});

            //切换读取当前值
            let cgvideo = function(_obj){
                console.log(_obj);
                var _videoData = _obj.attr("_videoData"),_videoData = $.trim(_videoData);
                console.log(_videoData);
                _ts.videoshow(_videoData);
                _ts.videoPopHost = _videoData;
            }

            setTimeout(function(){
                _nowobj = _cobj.find('.btnlist').find("li").eq(0);
                _nowobj.trigger("click");
                //window重置
                $(window).resize(function(){
                    cgvideo(_nowobj);
                });
            },300);
        },
        //显示播放器
        videoshow(_videoData){
            console.log(_videoData,'iframe播放框');
            let _videoDom = $("#video-carousel");
            let videlobj = _videoDom.find('.videos div');
            let _w = videlobj.width();
            let _h =videlobj.height();
            let videoDom = "<iframe  scrolling='no' frameborder='0' src='https://liveshare.huya.com/iframe/"+_videoData+"?playerflash=1&promoter=huya_pc_189'></iframe>";
            // var videoDom = "<iframe  scrolling='no' frameborder='0' src='this.gmConf.domainHttps+liveshare.huya.com/iframe/"+_videoData+"?playerflash=1&promoter=huya_pc_189'></iframe>";
            videoDom = $(videoDom);
            videoDom.css({
                width:_w,
                height:_h
            });
            videlobj.html(videoDom);

        },
        //获取所有随即数据
        getRdmData(cbk){
            let ts = this,
             //   url = 'http://open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":100,"page":2,"gid":2336}';
             //    url = 'http://open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":10,"page":1}';
             //    url = 'http://open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":10,"page":1}';
             url=this.gmConf.domainHttps+"open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={\"pageSize\":10,\"page\":1}"
            this.jqajax(url,{},(data)=>{
                if(data && data.statusCode == 200){
                    let _data = data.data.datas;
                    //拼接轮播
                    for(let i =0;i<6;i++){
                        if(i==0){
                            // ts.carouselData1 = "http://liveshare.huya.com/iframe/"+_data[i].privateHost+"?promoter=huya_pc_189"
                            ts.carouselData1 =this.gmConf.domainHttps +"liveshare.huya.com/iframe/"+_data[i].privateHost+"?promoter=huya_pc_189"
                        }
                        ts.carouselData.push(_data[i]);
                    }
                    //拼接精选
                    for(let i =0;i<8;i++){
                        ts.selectedData.push(_data[i]);
                    }
                    console.log(data,ts.carouselData,ts.selectedData);
                }
                if(cbk)cbk();
            });
        },
        //获得英雄联盟数据
        getYxlmData(cbk){
            let ts = this,
                // url = 'http://open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":8,"page":1,"gid":1}';
            url=this.gmConf.domainHttps+"open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={\"pageSize\":8,\"page\":1,\"gid\":1}"
            this.jqajax(url,{},(data)=>{
                if(data && data.statusCode == 200){
                    var _data = data.data.datas;
                    //拼接轮播
                    for(var i =0;i<8;i++){
                        ts.yxlmData.push(_data[i]);
                    }
                }
                if(cbk)cbk();
            });
        },
        //获得所欲数据
        getAllGame(){
            let ts = this;
            this.jqajax(this.gmConf.domainHttps+"open.huya.com/cache.php?m=InterModal&do=getGameInfo&appId=huya_pc_189",{},(data)=>{
                if(data && data.statusCode == 200){
                    ts.allGmData = data.data.datas;
                    //console.log(data.data.datas);
                }
            });
        },
        //获得所有数据
         jqajax(url,pms={},cbk){
            if(!url || $.trim(url) == "" || !cbk) return;
            let _type = pms.type?pms.type:"JSONP",
                _dataType = pms.dataType?pms.dataType:"jsonp",
                _data = pms.data?pms.data:"";
            $.ajax({
                type: _type,
                url: url,
                dataType:_dataType,
                data:_data,
                success:function(msg){
                    if(msg && cbk){
                        cbk(msg);
                    }
                },
                error:function(e){
                    console.log(e);
                }
            });
        },
        //pop时间
        popVideo2(){
            this.popVideos(this.videoPopHost);
        },
        //弹出窗口
        popVideos(privateHost){
            if(!privateHost)return;
            let _jumpUrl = this.videoPopUrl + "?redirect_uri="+this.gmConf.domainHttps+"www.huya.com/"+privateHost+"?promoter=huya_pc_189"+"&token="+this.loginToken;
            // ts.popVideo(_jumpUrl,"chrome");
            //callHostFunction.callBackVideo(_jumpUrl);
            // window.location.href = _jumpUrl;
            window.open(_jumpUrl)
        },
        //更多游戏
        // jumpMore(){
        //     window.location.href = this.moreUrl;
        // },
        // 获得登录接口,获取token
        getLoginToken(){
            //获取hash里的token
            // if(this.getToken().token){
            // }
            this.loginToken = this.getToken().token;
            // console.log(this.loginToken);
            // 如果token为空或未找到调起登录
            if (this.loginToken ===''||this.loginToken === undefined) {
                // if (is){};
                if(!this.isLenovo()){return false}
                window.external.LoginLenovoID();    //登录
                // window.external.LogoutLenovoID()  //登出
            }
        },

    },
    components: {
    },
}