/**
 * Created by Lzhang on 2018/1/3.
 */
const reportApi = {
    'event': '/back/gamelog/event',
    'page': '/back/gamelog/page',
    'player': '/back/gamelog/player',
    //虎牙直播数据上报接口
    'events':'/back/gamelog/livelog/event',//事件上报
    'pages':'/back/gamelog/livelog/page',//页面上报
    'players':'/back/gamelog/livelog/live',//点击直播间上报
};
function report(baseParams = {}, options = {}) {
    const reportType = options.reportType;
    delete options.reportType;

    let params =  {
        ...baseParams,
        actionTime: JSON.stringify(new Date().getTime()),
        ...options,
    };
    params = JSON.stringify(params);
    // alert(params, 'params===================');
    const encrypt = Encrypt(params);
    // console.log(encrypt)

    $.post(reportApi[reportType],{encrypt:`${encrypt}`,rootname:'w'},function(result){
        // alert('上报')
    })
}
function callback(options = {}) {
   // alert('进入native方法')
    return function (res) {
        // alert(res)
        let data = JSON.parse(res);
        let baseParams = {
            vipId: data.vipId || '',
            lenovoId: data.vipId ? '' : data.lenovoId,
            deviceId: data.vipId || data.lenovoId ? '' : data.deviceId,
            appId: 'lenovo-game',
            appVersion: data.appVersion,
            appChannel: data.appChannel,
            osType: data.osType,
            deviceStyle: data.deviceStyle,
            source: data.source
        };
        report(baseParams, options);
    };
    // //测试数据上报是否成功
    // let baseParams = {
    //     vipId:'1',
    //     appId:'lenovo-game',
    //     appVersion: 1,
    //     appChannel: 1,
    //     osType: 1,
    //     deviceStyle: 1,
    //     source: 1
    // };
    // report(baseParams, options);

}
export { callback }
