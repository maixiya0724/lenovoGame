/**
 * Created by zhang on 2017/5/17.
 */
export default {
    getAwardList: '/lepro/admin/award/list',
    deleteAward(id){
        return `/lepro/admin/award/${id}`
    },
}
