/**
 * Created by zhang on 2017/5/17.
 */
import {fetch} from  '../../common/request';
import serviceUrl from './serviceUrl';

export default {
    addMore(data) {
    return fetch().post(serviceUrl.addMore, data);
	},
	editMore(data){
	    return fetch().put(serviceUrl.editMore(data.id), data);
	},
	getMore() {
	    return fetch().get(serviceUrl.getMore());
	},
	getSearch(...args){
        return fetch().get(serviceUrl.getSearch(...args));
	}
}
