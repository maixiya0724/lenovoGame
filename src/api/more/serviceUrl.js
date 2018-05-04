/**
 * Created by zhang on 2017/5/17.
 */
export default {
    addMore: '/item?columnId=29114&relativeId=47&pageNumber=1',
    editMore(id){
    return `/item?columnId=29084?relativeId=46&pageNumber=${id}`
	},
	getMore(id1,id2){
    return `/back/game/get/game/item?columnId=${id1}&relativeId=47&pageNumber=${id2}`
	},
}
