/*jshint esversion: 6 */

import * as types from './mutation-types';

const yunwen_id = 2;
const shuxue_id = 3;
const yingyu_id = 4;
const wuli_id = 5;
const huaxue_id = 6;
const shengwu_id = 10;

export const getPaperList = function({ commit, state }, { list, id }) {

    switch (id) {
        case yunwen_id:
            commit(types.SET_YUWEN_LIST, list);
            break;
        case shuxue_id:
            commit(types.SET_SHUXUE_LIST, list);
            break;
        case yingyu_id:
            commit(types.SET_YINGYU_LIST, list);
            break;
        case wuli_id:
            commit(types.SET_WULI_LIST, list);
            break;
        case huaxue_id:
            commit(types.SET_HUAXUE_LIST, list);
            break;
        case shengwu_id:
            commit(types.SET_SHENGWU_LIST, list);
            break;
        default:
            console.log('未找到该课程信息！');

    }
    return new Promise((resolve, reject) => {
      resolve('commit success');
    });
};

// reset 重置
export const paperListFilter = function({commit}, {options,reset}) {
  if(reset){
    commit(types.SET_PAPERFILTER,{});
    return;
  }
  let params = Object.assign({}, this.getters.paperFilter, options);

  commit(types.SET_PAPERFILTER, params);
}
