import axios from 'axios'
const baseUrl='/api/users'
const getAll=async()=>{
   const response = await axios.get(baseUrl)
   return response.data

}

const getuserblogs=async(username)=>{
   const response = await axios.get(`${ baseUrl }/${username}`)
   return response.data
}

const updateusers=async(obj)=>{
   const response=await axios.put(`${ baseUrl }/${obj.id}`,obj)
   return response.data
}
export default {getAll,getuserblogs,updateusers}