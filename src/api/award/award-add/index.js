/**
 * Created by zhang on 2017/5/17.
 */
import {fetch} from  '../../../common/request';
import serviceUrl from './serviceUrl';

export default {
    addAward(data) {
        return fetch().post(serviceUrl.addAward, data);
    },
    editAward(data){
        return fetch().put(serviceUrl.editAward(data.id), data);
    },
    getAwardDetail(id) {
        return fetch().get(serviceUrl.getAwardDetail(id));
    }
}
