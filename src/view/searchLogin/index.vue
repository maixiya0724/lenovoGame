<template>
	<div class="searchLogin">
		<div class="searchLoginMain">
			
			<SearchTop></SearchTop>
			<div class="SlCenter">
				<img class="SlCenterL" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524656326299&di=d882497a9d0895776947cb8d647d2309&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019b695997cbcb000000212981bbbd.jpg%401280w_1l_2o_100sh.jpg" />
				<div class="SlCenterR">
					<SearchTitle text="用户信息" imgUrl="../../../static/img/search_user.png"></SearchTitle>
					<div class="userInfo">
						<div class="info">欢迎您,{{userInfo.name}}</div> <div class="data">您玩过的区服:{{userInfo.newData}}</div>
					</div>
					<SearchTitle text="服务器列表" imgUrl="../../../static/img/search_data.png"></SearchTitle>
					<div class="dataSev">
						<p class="title">推荐服务器</p>
						<div class="sevList">
							<a class="sevListItem active" @click="chooseData">不可能</a>
							<a class="sevListItem ">打工是</a>
						</div>
						<p class="title">选择服务器</p>
						<div class="chooseSev">
							
							<div class="changeData"><span>选择服务器类型</span>
								<div class="selectData"><selectData></selectData></div>
								
							</div>
							<div class="changeData"><span>选择公测服</span>
								<div class="selectData"><selectData></selectData></div>
							</div>

						</div>
						<div class="changeSev">
								<div class="dataNum">
									<span>0-1000</span>
									<span class="active">1000-2000</span>
								</div>
								<div class="changeData">
									<span>公测222服火爆</span>
									<span class="active">jjjjjjjj</span>
								</div>
							</div>
					</div>
				</div>
			</div>

		</div>
			
	</div>
	
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>