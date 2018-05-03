

<template>
	<div class="clearfix search">
		<div class="searchMain">
			<SearchTop></SearchTop>
			<div class="searchCenter">
				<div class="searchCenLeft">
					<div class="searchCengame">
						<img :src="gameData.url" class="gameImg" alt="游戏图片"/>
						<div class="gameInfo">
							<p class="name">{{gameData.name}}</p>
							<p class="info">{{gameData.info}}</p>
						</div>
						<a class="gameStart" :href="startUrl" target="_blank">开始游戏</a>
					</div>
					<div class="gameScImg">
						<SearchTitle text="游戏截图" imgUrl="../../../static/img/search_sc.png"></SearchTitle>
						<img class="gameScImgPhoto" :src="gameData.sreenUrl" />
					</div>
				</div>

				<div class="searchCenRight">
					<SearchTitle  text="游戏截图" imgUrl="../../../static/img/search_hot_game.png"></SearchTitle>
					<div class="gameItem" v-for="(item,index) in hotGameList" >
						<img :src="item.imgUrl" class="itemImg"/>
						<div class="itemInfo">
							<p>{{item.name}}</p>
							<a href="http://www.baidu.com" target="_blank" class="startGame">开始游戏</a>
						</div>
					</div>


					
				</div> 
			</div>
			
		</div>
	</div>
</template>

<style scoped lang="less" src="./style.less"></style> 
<script src="./script.js"></script>