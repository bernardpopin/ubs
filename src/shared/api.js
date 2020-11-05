import axios from 'axios';
import { store } from '../actions/index'

const URL = 'http://www.mocky.io/v2/';

//params must be object

export function doApiPost (urlPath, params){
  console.log('doApiPost', urlPath, params);
  const url = URL+urlPath;
  console.log('doApiPost URL', url);
  return axios.post(url, params, {headers: {'Accept': 'application/json'}}).then((data) => {
    return data;
  }).catch((error) => {
    console.log('doApiPost error', error);
  })
}

export function doApiGet (urlPath){
  console.log('doApiGet', urlPath);
  const url = URL+urlPath;
  console.log('doApiGet URL', url);
  return axios.get(url, {headers: {'Accept': 'application/json'}}).then((data) => {
    return data;
  }).catch((error) => {
    console.log('doApiGet error', error);
  })
}
