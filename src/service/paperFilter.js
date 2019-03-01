import { wxRequestFn } from "./wxService";
import { paper_filter } from '../mock/paper-filter';

const develop = process.env.NOD_ENV !== 'production';

export function getPaperFilter() {
  if(develop) {

    // 需开启本地服务
    // var url = 'http://192.168.0.190:8080/paper-filter.json'

    // 模拟数据返回一个promise对象
    return new Promise((resolve, reject) => {
      if(paper_filter) {
        resolve(paper_filter);
      }else{
        reject('数据错误，请检查');
      }
    });
  }else{
    return wxRequestFn({
      url: url,
      method: 'GET'
    });
  }
}
