/**
 * Created by rzl on 2018/4/19
 */
export default{
    components:{
        // 'vHeader':Header,
    },
    data(){
        return{
            //是否加载
            fst:false,//第一次滚动
            loading:false,//加载中
            loadingText:'加载中...',
            result:[],
            page:1,
            gid:this.$route.query.gid,
            // loginToken:"",//请求token
            videoPopUrl: "https://udb3lgn.huya.com/lenovo/login",
            enterTime:'',//页面上报进入时间
            loginToken:this.$route.query.token,
        }
    },
    mounted(){
        this.getLoginToken(); //请求登录
        this.getInfo(this.page,this.gid);
        this.loading = true;
        this.winSrcoll();
    },
    methods:{
        getLoginToken(){
            // this.loginToken = this.getToken()
            if(this.loginToken === ''||this.loginToken === undefined){
                // alert('登录去');
                if(!this.isLenovo()){return false}
                window.external.LoginLenovoID();
            }
        },
        getInfo(page,gid){
            $(window).scrollTop(0);
            let ts = this;
            var page = page?page:"1";
            var gid = gid?gid:"1";
            ts.loading = true;
            // let url='http://open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":20,"page":'+page+',"gid":'+gid+'}';
            let url=this.gmConf.domainHttps+'open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":20,"page":'+page+',"gid":'+gid+'}';
            this.jqajax(url,{},(res)=>{
                this.fst = true;
                ts.loading = false;
                if(res.data.datas.length<20){
                    this.loadingText='已无更多游戏直播视频'
                }
                console.log(res);
                this.result=res.data.datas;
                console.log('结果',this.result);
                ts.page++;
                console.log('page1',this.page)


            })
        },
        getSecond(page,gid){
            let ts = this;
            var page = page?page:"1";
            var gid = gid?gid:"1";
            ts.loading = true;
            // let url='http://open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":20,"page":'+page+',"gid":'+gid+'}';
            let url=this.gmConf.domainHttps+'open.huya.com/cache.php?m=LiveList&do=getLiveListByPage&appId=huya_pc_189&data={"pageSize":20,"page":'+page+',"gid":'+gid+'}';
            this.jqajax(url, {}, (res) => {
                ts.loading = false;
                if (res.data.datas.length < 1) {
                    ts.loadingText = '已无更多游戏直播视频';
                    ts.fst = false;
                    return false;
                } else {
                    ts.result = ts.result.concat(res.data.datas);
                    console.log(ts.result);
                }
                console.log(res);
                console.log('结果', this.result);
            });
            ts.page++;
            console.log('page2',this.page)
        },
        popVideo(privateHost){
            // alert(privateHost);
            if(!privateHost)return;
            var _jumpUrl = this.videoPopUrl + "?redirect_uri="+this.gmConf.domainHttps+"www.huya.com/"+privateHost+"?promoter=huya_pc_189"+"&token="+this.loginToken;
          //  var _jumpUrl = "http://liveshare.huya.com/iframe/"+privateHost+"?promoter=huya_pc_189";
          //   console.log(_jumpUrl);
            // alert(this.loginToken);
            // callHostFunction.callBackVideo(_jumpUrl);
            // window.location.href = _jumpUrl;
            window.open(_jumpUrl);
        },
        bkImage(c) {
            return 'url(' + c + ') no-repeat center center '
        },
        playVideo(){
            console.log('播放游戏视频')
        },
        //scroll
        winSrcoll(){
            let ts=this;
            $(window).scroll(function(){
                if(ts.fst){
                    let scrollTop = $(this).scrollTop()//滑动的距离
                    let scrollHeight = $(document).height()//文本的高度
                    let windowHeight = $(this).height()//可视窗口的高度
                    // console.log('高度',scrollTop)
                    // console.log('高度',scrollHeight)
                    // console.log('高度', windowHeight)
                    // return;
                    if(scrollHeight-windowHeight-scrollTop<=100 && !ts.loading){
                        console.log('ajax &&');
                        ts.getSecond(ts.page,ts.gid);
                    }
                }
            });

        },
        //页面跳转
        jump(name,pms){
            if(!name || !pms)return;
            var _name = name.toString();
            if(_name == ""){ _name = "livelist";}
            this.$router.push({name:_name,query:pms});
        },
        //获得登录接口
        // getLoginToken(){
        //     var ts = this;
        //     if(!ts.isLenovo()){ return false;}
        //     //回调请求token接口
        //     window.tokenCallback = function(options){
        //         if(!options){ return false;}
        //         let data = JSON.parse(options);
        //         if($.trim(data.token) == ""){return false; }
        //         ts.loginToken = data.token;
        //         var redirect_uri = window.location.href;
        //     }
        //     //跳转
        //     callHostFunction.getToken(tokenCallback);
        // },

    },
}