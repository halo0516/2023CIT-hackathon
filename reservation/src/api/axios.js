import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080'
});

const baseURL ='http://localhost:8080'

export const register = async (newUser) => {
    try {
      const response = await axios.post(`${baseURL}/users`, newUser);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

export const getInfo = async() => {
  try{
    const response = await axios.get('http://localhost:8080/doc_account');
    return response.data.data;
  }catch (err){
    throw new Error(err);
  }
}

export const reserve_12 = async(docid,id) => {
  try{
    const response = await axios.post(`${baseURL}/reserve12/${docid}`, {id});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}
export const unreserve_12 = async(docid) => {
  try{
    const response = await axios.post(`${baseURL}/unreserve12/${docid}`, {});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}


export const reserve_13 = async(docid,id) => {
  try{
    const response = await axios.post(`${baseURL}/reserve13/${docid}`, {id});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}
export const unreserve_13 = async(docid) => {
  try{
    const response = await axios.post(`${baseURL}/unreserve13/${docid}`, {});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}

export const reserve_14 = async(docid,id) => {
  try{
    const response = await axios.post(`${baseURL}/reserve14/${docid}`, {id});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}
export const unreserve_14 = async(docid) => {
  try{
    const response = await axios.post(`${baseURL}/unreserve14/${docid}`, {});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}

export const reserve_15 = async(docid,id) => {
  try{
    const response = await axios.post(`${baseURL}/reserve15/${docid}`, {id});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}
export const unreserve_15 = async(docid) => {
  try{
    const response = await axios.post(`${baseURL}/unreserve15/${docid}`, {});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}

export const reserve_16 = async(docid,id) => {
  try{
    const response = await axios.post(`${baseURL}/reserve16/${docid}`, {id});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}
export const unreserve_16 = async(docid) => {
  try{
    const response = await axios.post(`${baseURL}/unreserve16/${docid}`, {});
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}

export const fetchUser = async(userid) => {
  try{
    const response = await axios.get(`${baseURL}/user/${userid}`);
    return response.data;
  }catch(err){
    throw new Error(err);
  }
}