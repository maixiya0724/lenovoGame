
<template>
	<div class="searchLogin">
		<div class="searchLoginMain">
			
			<SearchTop></SearchTop>
			<div class="SlCenter">
				<img class="SlCenterL" :src="imgUrl"/>
				<div class="SlCenterR">
					<SearchTitle text="用户信息" imgUrl="../../../static/img/search_user.png"></SearchTitle>
					<div class="userInfo">
						<div class="info">欢迎您 , {{userInfo.name}}</div> <div class="data"><span>您玩过的区服 :</span> <a v-for="(item,index) in playLatests" @click="gameStart(item.serverId)">{{item.serverName}}</a></div>
					</div>
					<SearchTitle text="服务器列表" imgUrl="../../../static/img/search_data.png"></SearchTitle>
					<div class="dataSev">
						<p class="title">推荐服务器</p>
						<div class="sevList">
							<a class="sevListItem " @click="gameStart(item.id)"  v-for="(item,index) in latest.servers">{{item.name}}</a>
						</div>
						<p class="title">选择服务器</p>
						<div class="chooseSev">
							<div class="changeData"><span>输入服务器</span>
								<input ref="inputData" if="inputData" class="selectData" type="text"/>
							</div>
							<button class="btn" @click="enterGame">进入游戏</button>
						</div>
						<div class="changeSev">
								<div class="changeData">
									<a v-for="(item,index) in allServices.servers"  @click="gameStart(item.id)">{{item.name}}</a>
								</div>
									<p class="loading">{{loadingText}}</p>
							</div>

					</div>
				</div>
			</div>

		</div>
			
	</div>
	
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>