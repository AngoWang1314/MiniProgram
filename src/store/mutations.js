/*jshint esversion: 6 */

import * as types from './mutation-types';

const mutations = {

    [types.SET_YUWEN_LIST](state, yuwenList) {
        state.yuwenList = yuwenList;
    },

    [types.SET_SHUXUE_LIST](state, shuxueList) {
        state.shuxueList = shuxueList;
    },

    [types.SET_YINGYU_LIST](state, yingyuList) {
        state.yingyuList = yingyuList;
    },

    [types.SET_WULI_LIST](state, wuliList) {
        state.wuliList = wuliList;
    },

    [types.SET_HUAXUE_LIST](state, huaxueList) {
        state.huaxueList = huaxueList;
    },

    [types.SET_SHENGWU_LIST](state, shengwuList) {
        state.shengwuList = shengwuList;
    },

    [types.SET_PAPERFILTER](state, paperFilter) {
        state.paperFilter = paperFilter;
    }
};

export default mutations;
