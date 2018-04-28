/**
 * Created by zhang on 2017/5/17.
 */
import {fetch} from  '../../../common/request';
import serviceUrl from './serviceUrl';

export default {
    getAwardList(data) {
        return fetch().get(serviceUrl.getAwardList, {params: data});
    },
    deleteAward(id){
        return fetch().delete(serviceUrl.deleteAward(id));
    },
}
