/**
 * Created by zhang on 2017/5/17.
 */
export default {
	getMore(){
    return `/back/search/catchGameTag`
	},
    getSearch(name,category1,category2){
        return `/back/search/searchGame?name=${name}&category1=${category1}&category2=${category2}`
    }
}
