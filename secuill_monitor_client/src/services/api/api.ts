import axios from 'axios';
import { IResponseApi, responseAPi } from '../../interface/iResponseApi';

const baseAxios = axios.create({
	baseURL: import.meta.env.VITE_APP_API_PATH
})

let res:IResponseApi=responseAPi;
const api = (() => {
	
	const get = async(url: string, config: object = {}) =>
		{
			await baseAxios.get(url, config)
			.then((result)=>{
				res = result.data;
			})
			.catch((error)=>{
				if(error.response){
					res = error.response.data;
				} else{
					res.statusCode = error.code
					res.message = error.message
					res.payload = {};
				}
			});
			return res
		};
	const post = async(url: string, data: object = [], config: object = {}) => 
		{
			await baseAxios.post(url, data, config)
			.then((result)=>{
				res = result.data;
			})
			.catch((error)=>{
				if(error.response){
					res = error.response.data;
				} else{
					res.statusCode = error.code
					res.message = error.message
					res.payload = {};
				}
			});
			return res
		};
	const put = async(url: string, data: object = [], config: object = {}) => 
		{
			await baseAxios.put(url, data, config)
			.then((result)=>{
				res = result.data;
			})
			.catch((error)=>{
				if(error.response){
					res = error.response.data;
				} else{
					res.statusCode = error.code
					res.message = error.message
					res.payload = {};
				}
			});
			return res
		};
	const patch = async(url: string, data: object = [], config: object = {}) =>
		{
			await baseAxios.patch(url, data, config)
			.then((result)=>{
				res = result.data;
			})
			.catch((error)=>{
				if(error.response){
					res = error.response.data;
				} else{
					res.statusCode = error.code
					res.message = error.message
					res.payload = {};
				}
			});
			return res;
		} 

	return {
		get,
		post,		
        put,
		patch,
	}

})()

export default api;