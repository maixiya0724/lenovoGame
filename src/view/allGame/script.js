import SearchTop from "../../components/searchTop.vue";
import SearchTitle from "../../components/searchTitle.vue";
import slider from "../../components/sliders.vue";
import getGame from '@/api/getSearch'
import getMore from '@/api/more'
import getAwardDetail from '@/api/award/award-add'
import { jsCallNative } from "../../common/callnative"

export default {
    components: {
        SearchTop: SearchTop,
        slider: slider
    },
    data() {
        return {
            gameType: [],
            banners: [{poster:"http://smtv-cms.oss-cn-beijing.aliyuncs.com/cms/2018-03-24/201803241617288423277.jpg"},{poster:"http://smtv-cms.oss-cn-beijing.aliyuncs.com/cms/2018-03-24/201803241617288423277.jpg"},{poster:"http://smtv-cms.oss-cn-beijing.aliyuncs.com/cms/2018-03-24/201803241617288423277.jpg"},{poster:"http://smtv-cms.oss-cn-beijing.aliyuncs.com/cms/2018-03-24/201803241617288423277.jpg"}],
            list: [],
            page: 1,
            listGame: [],
            gameCategory1: [],
            gameCategory2: [],
            category1: '',
            category2: '',
            subCategoryIndex: 0,
            categoryIndex: 0,
            channelInfo: {}, // 频道ID
            listId: 29147,
            //分页
            current: 1,
            showItem: 5,
            allpage: "",
            flag: true,
            token: "ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9RDY2QzNCOEZFMEM5NjlGQ0E4RTJGQzAxMTJDRjc3RTMxJmg9MTUyNjI2NDcxMDk4OSZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y26u1DL_GLJzhuU8iy_kJxSi",
            //token: "ZAgAAAAAAAGE9MTAxMTQ4OTU1MDYmYj0yJmM9NCZkPTI0NTA4JmU9REQ0RDkwQTBCRUMzQzk4NUJENDI5NjU5M0FBREY3NTExJmg9MTUyNjAyMDMyNTUwMSZpPTQzMjAwJm89QVNERjEyMzQmcD1zbiZxPTAmdXNlcm5hbWU9MTgzMDEyMTUzMzcmaWw9Y26-Kfd85C9BOZ0SpNjrq4My",
            //进入游戏接口
            gameurl: this.gmConf.domainHttps + "passport.4366.com",
            softid: "",
            gameArr: [], // 二级数组用来存放分页的数据
            dataArr: [],
            gotoInput: 1,
            noPage: true,
        }
    },
    mounted() {
        this.getGameLists()
        this.getGameTitle()
        //this.getLoginToken()

    },

    computed: {
        pages: {
            get: function() {
                var pag = [];
                if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if (middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }

                return pag
            },
            set: function(newValue) { //如果不写计算属性的set，vue会报错


            }
        }
    },

    methods: {
        //获取token

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
                console.log(data)
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
        //获得轮播图
        getGameLists() {
            getAwardDetail.getAwardDetail(104).then((res) => {
                console.log(res.data)
                $(window).scrollTop(0);
                // 轮播图
                this.banners = res.data.channels[0].modules[1].elements;
                this.banners.page = res.data.channels[0].channelName;
                this.banners.pageId = res.data.channels[0].id;
                // 频道信息
                this.channelInfo.id = res.data.channels[0].id;
                this.channelInfo.name = res.data.channels[0].channelName;
                console.log(this.banners)
                // console.log(this.goodGame)
            })
        },

        // 获取游戏列表
        async getGameTitle() {
            getGame.getMore().then((res) => {
                console.log(res)
                this.gameCategory1 = res.data.first
                this.gameCategory2 = res.data.second
                this.category1 = this.gameCategory1[2].category1
                this.category2 = this.gameCategory2[0].category1
                this.getGame();

            });
        },

        // 点击游戏列表分类
        selectIndex(index, item, event) {

            let value = event.target.text
            $(".gameTitle a").removeClass("active")
            $(event.target).addClass("active")
            this.subCategoryIndex = index;
            this.category2 = item.category1;
            this.current = 1;
            this.page = 1;
            console.log(this.dataArr)
            let arr = []
            console.log(value)
            if (value =="全部") {
                arr =this.dataArr
                
            } else {
                for (var i in this.dataArr) {
                    if (this.dataArr[i].category2 == value) {
                        arr.push(this.dataArr[i])
                    }

                }
            }


            if (JSON.stringify(arr) === '[]') {
                this.flag = false;
                this.noPage = false;
            } else {
                this.flag = true;
                this.noPage = true;
                this.handleData(arr)
            }

        },
        handleData(data) {

            this.allpage = Math.ceil(data.length / 16)
            if (this.allpage <= 1) {
                this.noPage = false;
            }

            // 处理数据
            for (let j = 0; j < data.length; j++) {
                if (!data[j].captureFiles) {
                    data[j].bgUrl = ''
                } else {
                    for (let i = 0; i < data[j].captureFiles.length; i++) {
                        if (data[j].captureFiles[i].size == '235*132') {
                            data[j].bgUrl = data[j].captureFiles[i].url

                        }
                        // 获取游戏服务页面的图片
                        if (data[j].captureFiles[i].size == '235*132') {
                            data[j].serviceImg = data[j].captureFiles[i].url
                        }
                    }
                }
            }
            // 创建一个二维数组来放分组的数据
            for (var i = 0; i < this.allpage; i++) {
                let arr = []
                arr.push(data.slice(i * 16, (i + 1) * 16))
                this.gameArr[i] = arr
            }
            this.listGame = data.slice(0, 16); // 初始化数据


        },

        async getGame() {
            getGame.getSearch('', this.category1, this.category2).then((res) => {
                console.log(res.data.datas)
                if (JSON.stringify(res.data.datas) === '[]') {
                    console.log(1)
                    this.flag = false;
                    this.noPage = false;
                    this.allpage = 0;
                } else {
                    this.flag = true;
                    this.noPage = true;
                    this.dataArr = res.data.datas
                    this.handleData(this.dataArr)

                }
            })
        },
        goDetails(Id, img) { // 选择服务器
            this.$router.push({ path: "../service", query: { gameId: Id, imgUrl: img } })
        },
        //分页
        goto: function(index) {
            index = parseInt(index)
            if (index == this.current) { // 点击当前页
                return false
            }
            if (typeof index === 'number' && index <= this.gameArr.length) {
                this.current = index;
                this.listGame = this.gameArr[index - 1][0]
                console.log(this.listGame)
            } else {
                alert("请输入正确的数字")
                this.gotoInput = 1;
            }
        },
        pages: function() {
            var pag = [];
            if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        },
        //获取YYgame
        getGameYY(gameId, callback) {
            var ts = this
            console.log(gameId)
            var _url = "/back/game/get/game/soft/data?softName=yy" + "&gameId=" + gameId;
            var ts = this;
            ts.jqajax(_url, { type: "get", dataType: "json" }, function(res) {


                ts.softBrowser = res.data.softkernel;
                ts.softid = res.data.softId; //game值
                ts.gameStart(ts.softid);
            });

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
            window.open(_url)
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
        // 进入选择服务器页面
        chooseSer(id) {
            console.log(id)
            this.$router.push({ path: "../service", qurey: { gameId: id } })
        }


    }

}