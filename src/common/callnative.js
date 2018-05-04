/**
 * Created by Lzhang on 2018/1/3.
 */

const softType = {
    game_online: {
        name: '网游',
        value: 1
    },
    game_web: {
        name: '页游',
        value: 2
    }
}
const jsCallNative = (type, params = {},browser) => { // 判断是端游还是页游
    for (let game in  softType) {
        if (type == softType[game].name) {
            params.gameType = softType[game].value;
            break;
        } else {
            params.gameType = '';
        }
    }
    params.webUrl = params.webUrl.split("#")[0] + '#/officialwebsite'+`?gameId=${params.gameId}`;
    let a = JSON.stringify(params);
    //alert(browser);
    let bs = typeof browser == "undefined"?"chrome":browser;
    callHostFunction.callBackStartGame(a,bs);
}
export  {jsCallNative}