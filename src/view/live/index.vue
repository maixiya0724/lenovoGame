<template>
    <div id="appChoice">
        <!--头部-->
        <!--搜索栏-->
        <!--<div class="search-bar">-->
            <!--<ul>-->
                <!--<li>-->
                    <!--<p>大型网游</p>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<p>单机</p>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<p>流放之路</p>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<p>神武幻想</p>-->
                <!--</li>-->
            <!--</ul>-->
            <!--&lt;!&ndash;<div class="search">&ndash;&gt;-->
                <!--&lt;!&ndash;<input type="text" placeholder="搜索游戏" v-model="inputText" @keypress.13="search(inputText)">&ndash;&gt;-->
                <!--&lt;!&ndash;<i @click="search(inputText)"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<div class="clear"></div>-->
        <!--</div>-->

        <!-- video-carousel -->
        <div class="video-carousel part" id="video-carousel" >

            <div class="videos over" >
                <span class="btn goin none pos" v-on:click="popVideo2()"></span>
                <div></div>

            </div>
            <ul class="btnlist">
                <li  :_videoData="val.privateHost" v-for="(val,index) in carouselData" :class="{'on':index===0}"  >
                    <span></span>
                    <img :src="val.screenshot" /></li>

            </ul>
        </div>
        <!-- video-carousel -->
        <div class="clear"></div>

        <!--liveblist-->
        <div class="liveblist part">
            <div class="top-line">
                <i class="ic-zb"></i>
                <h2>直播精选</h2>
                <p class="more" v-on:click="jump('livelist',{modelId:01,token:loginToken})" >更多游戏 ></p>
            </div>
            <ul class="hv clearfix">
                <li v-for="(val,index) in selectedData" v-on:click="popVideos(val.privateHost)">
                    <div class="bg-img">
                        <div class="mask pos">
                            <span class="icon-bgtv"></span>
                        </div>
                        <img :src="val.screenshot" />
                    </div>
                    <div class="ft pes">
                        <h3>{{val.nick}}</h3>
                        <p>{{val.introduction}}</p>
                        <span class="icbox ic1 pos" v-if="val.totalCount<10000">
                            <em></em>
                            {{val.totalCount}}</span>
                        <span class="icbox ic1 pos" v-if="val.totalCount>10000">
                            <em></em>
                            {{Math.round(val.totalCount/10000)}}万</span>

                        <span class="face pos"><img :src="val.avatar180"/></span>
                    </div>
                </li>
            </ul>
        </div>
        <!--liveblist-->

        <!--hotlist-->
        <div class="hotlist part">
            <div class="top-line">
                <i class="ic-cton"></i>
                <h2>热门分类</h2>
                <!--<p class="more" v-on:click="jump('livelist',{})">更多游戏 ></p>-->
            </div>
            <ul class="clearfix">

                <li v-for="val in hotData" v-on:click="jump('livelist',{gid:val.gid,token:loginToken})">
                    <div class="img">
                        <img :src="val.img" />
                    </div>
                    <div class="ft pos">
                        <h3>{{ val.name }}</h3>
                    </div>
                </li>

            </ul>
        </div>
        <!--hotlist-->

        <!--liveblist-->
        <div class="liveblist part">
            <div class="top-line">
                <i class="ic-l"></i>
                <h2>英雄联盟</h2>
                <p class="more" v-on:click="jump('livelist',{gid:1,modelId:02,token:loginToken})">更多游戏 ></p>
            </div>
            <ul class="hv clearfix">
                <li v-for="(val,index) in yxlmData" v-on:click="popVideos(val.privateHost)">
                    <div class="bg-img">
                        <div class="mask pos">
                            <span class="icon-bgtv"></span>
                        </div>
                        <img :src="val.screenshot" />
                    </div>
                    <div class="ft pes">
                        <h3>{{val.nick}}</h3>
                        <p>{{val.introduction}}</p>
                        <span class="icbox ic1 pos" v-if="val.totalCount<10000">
                            <em></em>
                            {{val.totalCount}}</span>
                        <span class="icbox ic1 pos" v-if="val.totalCount>10000">
                            <em></em>
                            {{Math.round(val.totalCount/10000)}}万</span>
                        <span class="face pos"><img :src="val.avatar180"/></span>
                    </div>
                </li>
            </ul>
        </div>
        <!--liveblist-->



    </div>
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

