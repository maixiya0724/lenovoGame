import SearchTop from "../../components/searchTop.vue"
import SearchTitle from "../../components/searchTitle.vue"
import selectData from "../../components/selectData.vue"
import getAwardDetail from '@/api/award/award-add'



export default {
    components: {
        SearchTop: SearchTop,
        SearchTitle: SearchTitle,
        selectData: selectData
    },

    data() {
        return {
            userInfo: { name: "啦啦啦", newData: "20" },
            //gameId: this.$route.query.gameId,
            gameId:this.$route.query.gameId,
            imgUrl:this.$route.query.imgUrl,
            //获取用户信息
            token: 'ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9REQ0RDkwQTBCRUMzQzk4NUJENDI5NjU5M0FBREY3NTExJmg9MTUyNjAyMDMyNTUwMSZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y26-Kfd85C9BOZ0SpNjrq4My',
            userId: '10114895506',
            //YY签名以及时间戳
            signs: '',
            timestamp: '',
            //获取YY游戏标识即game值
            softid: '',
            tabs: ['双线服', '新服'],
            num: 0,
            list: '双线服,',
            //下拉加载
            fst: false,
            loading: false,
            loadingText: '加载中...',
            //分页参数
            gsPageNo: 1,
            latest: {
                servers: []
            },
            result: [],
            allServices: {
                servers: []
            },
            playLatests: [],
            //进入游戏
            ifEnter: '',
            inputText: '',
            //进入游戏接口
            gameurl: this.gmConf.domainHttps + "passport.4366.com",
            //区服号
            serverNumber: [],
            //未获取到数据时加载文字
            loadingTexts: '加载中...',
            softBrowser: 'chrome', //浏览器类型
        }
    },
    
    mounted() {
        //获取用户信息
        this.getLoginToken();
        //获取YY游戏标识game值
        this.getGame(this.gameId);
        //获取YY签名以及时间戳
        this.getSign(this.userId);
        // 获取游戏的简介 
        this.getInfo()

        console.log(this.imgUrl)
    },

    methods: {
       
       
        //获取YYgame
        getGame(gameId, callback) {
            var _url = "/back/game/get/game/soft/data?softName=yy" + "&gameId=" + gameId;
            var ts = this;
            ts.jqajax(_url, { type: "get", dataType: "json" }, function(res) {
                console.log('game', res);

                ts.softBrowser = res.data.softkernel;
                ts.softid = res.data.softId; //game值
                ts.getAllServer(ts.softid, ts.gsPageNo); //获取所有区服
            });
        },

        getUrlParam(par) {
            //获取当前URL
            var local_url = document.location.href;
            //获取要取得的get参数位置
            var get = local_url.indexOf(par + "=");
            if (get == -1) {
                return false;
            }
            //截取字符串
            var get_par = local_url.slice(par.length + get + 1);
            //判断截取后的字符串是否还有其他get参数
            var nextPar = get_par.indexOf("&");
            if (nextPar != -1) {
                get_par = get_par.slice(0, nextPar);
            }
            return get_par;
        },
       
        //检测客户端
        isLenovo() {
            var usr = navigator.userAgent;
            if (usr.toLowerCase().indexOf("lenovocenter") > -1) {
                return true;
            }
            return false;
        },
        //获取用户登录信息
        getLoginToken() {
            var ts = this;

            //回调请求token接口
            //if(!ts.isLenovo()){ return false;}
            window.tokenCallback = function(options) {
                if (!options) { return false; }
                var data = JSON.parse(options);
                if ($.trim(data.token) == "") { return false; }
                // ts.loginToken = data.token;
                ts.userId = data.userid;
                ts.token = data.token;
                // ts.errorShow(data);
            }

            if (!ts.isIe()) {
                if (!this.isLenovo()) { return; }
                callHostFunction.getYYPermission(tokenCallback);
            } else {
                if (!this.isLenovo()) { return; }
                let _data = window.external.getYYPermissionIe();
                var data = JSON.parse(_data);
                ts.userId = data.userid;
                ts.token = data.token;
                //ts.errorShow(data);
            }

        },
       
     
        getAllServer(game, gsPageNo) {
            var ts = this;
            var gsPageNo = gsPageNo ? gsPageNo : "1";
            ts.loading = true;
            var url = this.gmConf.domainHttps + "unionlogin.4366.com/lenovo/gamecenter/gslist.do?jsonp&serverType=GENERAL&gsPageSize=60&online" + "&game=" + game + "&gsPageNo=" + gsPageNo;
            this.jqajax(url, {}, (res) => {
                this.fst = true;
                ts.loading = false;
                var _servers = res[ts.softid].servers;
                console.log('所有', _servers, ts.softid);
                for (var item in _servers) {
                    ts.allServices.servers.push(_servers[item]);
                }
                if (ts.allServices.servers.length > 3) {
                    ts.allServices.servers=ts.allServices.servers.slice(0,5)
                }
                console.log('循环之后的结果数组', ts.allServices.servers)
                console.log('长度', ts.allServices.servers.length)
               
            });

                this.getNewInfo(this.softid)

        },

        getNewInfo(game) {
            var ts = this;
            var url = this.gmConf.domainHttps + "unionlogin.4366.com/lenovo/gamecenter/gslist.do?jsonp&serverType=GENERAL&order=opentime:desc&gsPageNo=1&gsPageSize=20&online" + "&game=" + game;
            ts.jqajax(url, {}, (res) => {
                console.log('最新区服信息', res);
               
                var _servers = res[ts.softid].servers;
                 for (var item in _servers) {
                    ts.latest.servers.push(_servers[item]);
                }
                ts.latest.servers=ts.latest.servers.slice(0,5);
                
                console.log('最新区服信息输出', ts.latest.servers)
            })
        },

        //获取yy签名以及当前时间戳
        getSign(userId) {
            var _url = "/back/game/api/user/md5UserId?" + "&userId=" + userId;
            var ts = this;
            ts.jqajax(_url, { type: "get", dataType: "json" }, function(res) {
                ts.signs = res.data.out;
                ts.timestamp = res.data.timestamp;
                //获得以前玩的游戏
                ts.playLatest(ts.softid, ts.signs, ts.timestamp, ts.userId);
            });
        },
        //进入游戏
        enterGame() {
            //获取用户输入的区服号
            var words = this.$refs.inputData.value;
            //console.log(words);
            if (words && words != "") {
                if (/^\+?[1-9][0-9]*$/.test(words)) {
                    this.inputText = 's' + this.$refs.inputData.value;
                    console.log(this.inputText)
                    this.gameStart(this.inputText);
                } else {
                    this.$toast.top('请输入数字格式的区服号');
                }
            } else {
                this.$toast.top('请输入数字格式的区服号');
            }
            // if(this.contains(this.serverNumber,this.inputText)==true){
            //      this.ifEnter==true
            // }
        },
       
        //获取用户最近在玩的
        playLatest(game, sign, timestamp, userId) {
            var ts = this;
            // &serverType=GENERAL
            var url = this.gmConf.domainHttps + "unionlogin.4366.com/lenovo/gamecenter/recently.do?jsonp&limit=4" + "&game=" + game + "&sign=" + sign + "&timestamp=" + timestamp + "&userId=" + userId;
            this.jqajax(url, {}, (res) => {
                console.log(res.data)
                //  ts.errorShow(url+"<br>"+JSON.stringify(res));
                $(".service-specific-container div").eq(0).remove();
                if(res.data.length>4){
                    ts.playLatests = res.data.slice(0,3);
                }else{
                    ts.playLatests = res.data.slice(0,3);

                }
                

            })
        },

        //开始游戏
        gameStart(_sid) {
            var ts = this;
            if (!_sid) return false;
            var _url = ts.gameurl + "/channel/lenovo/gamecenter/login.do";
            _url += "?game=" + ts.softid;
            _url += "&token=" + ts.token;
            _url += "&server=" + _sid;
            _url += "&failUrl=" + encodeURIComponent(window.location.href);
            console.log(_url, _sid);
            ts.popVideo(_url);
            //    window.location.href = _url;
            //区服列表页点击事件上报
            const options = {
                eventId: "023", //点击新闻页事件id
                eventDes: "列表页面选服",
                gameId: this.gameId,
                serviceId: _sid //每一个区服id
            };
            window.location.href=_url;
        },
        //客户端弹窗
        popVideo(_url) {
            var ts = this;
            if (!_url || !ts.isLenovo()) return;
            if (!ts.isIe()) {
                callHostFunction.callBackVideo(_url, ts.softBrowser);
            } else {
                window.external.callBackVideo(_url, ts.softBrowser);
            }

        },

     
    }

}