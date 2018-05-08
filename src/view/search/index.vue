

<template>
	<div class="clearfix search">
		<div class="searchMain">
			<SearchTop></SearchTop>
			<div  class="searchCenter clear">
				<div v-if="flag" class="searchFloat">
					<div  class="searchCenLeft" :class="index==0?'noPadding':''" v-for="(item,index) in gameList">
						<div class="searchCengame">
							<img :src="item.icon" class="gameImg" alt="游戏图片"/>
							<div class="gameInfo">
								<p class="name">{{item.gameName}}</p>
								<p class="info">{{item.detailInfo}}</p>
							</div>
							<a class="gameStart" href="" target="_blank">开始游戏</a>
						</div>
						<div class="gameScImg">
							<SearchTitle text="游戏截图" imgUrl="../../../static/img/search_sc.png"></SearchTitle>
							<img class="gameScImgPhoto" :src="item.bgUrl" />
						</div>
					</div>
				</div>
				<div v-if="!flag" class="searchNoGame">
					<div class="noGame">
						<div class="noGameImg"></div>
						<p>"非常抱歉，没有找到您想要的内容"</p>
					</div>
				</div>
				<div class="searchCenRight">
					<SearchTitle  text="游戏截图" imgUrl="../../../static/img/search_hot_game.png"></SearchTitle>
					<div class="gameItem" v-for="(item,index) in hotGame">
						<img :src="item.poster" class="itemImg"/>
						<div class="itemInfo">
							<p>{{item.elementName}}</p>
							<a @click="callNative(item.category1,item.elementName,item.gameElement.id,item.gameElement.downLoadUrl,item.gameElement.icon,item.gameElement.packageName,item.gameElement.gameUrl)" target="_blank" class="startGame">开始游戏</a>
						</div>
					</div>
				</div> 
			</div>


			
		</div>
	</div>
</template>

<style scoped lang="less" src="./style.less"></style> 
<script src="./script.js"></script>