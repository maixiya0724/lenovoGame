<template>
    <div class="live-container">
        <!--<v-header :checked="checked"></v-header>-->
        <div class="live-content-container">
            <div class="live-title" v-for="(item,index) in result" v-if="index==0">
                <span v-on:click="jump('live',{})" style="cursor:pointer;">首页</span>&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;
                {{item.gameFullName}}
            </div>
            <div class="live-content clearfix">
                <div class="live-specific" v-for="item in result">
                    <div class="live-img" @click="playVideo()">
                        <img :src="item.screenshot">
                        <div class="mask" @click="popVideo(item.privateHost)">
                            <img src="/static/img/live/play.png">
                        </div>
                    </div>
                    <div class="live-introduce">
                        <div class="title-one clearfix" >
                            <div class="portrait">
                                <img :src="item.avatar180">
                            </div>
                            <div class="word-text">
                                {{item.nick}}
                            </div>
                        </div>
                        <div class="title-two">
                            <div>{{item.introduction}}</div>

                            <div class="word-text" v-if="item.totalCount<10000">
                                <em></em>
                                {{item.totalCount}}
                            </div>
                            <div class="word-text" v-if="item.totalCount>10000">
                                <em></em>
                                {{Math.round(item.totalCount/10000)}}万
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="loadMore">
            {{loadingText}}
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>
