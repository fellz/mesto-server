import pg from '../dbconfig';
import { User } from '../types';

export async function getUsers() {
  try {
    const res = await pg('users')
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getUser(args) {
  let user_id = args.id ? args.id : args.user_id
  try {
    const res = await pg('users').where('id', user_id).first()
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function addUser(args: User) {
  try {
    const res = await pg('users').insert({email: args.user.email, password: args.user.password}).returning('uid')
    return {uid: res[0]}
  } catch (error) {
    console.log(error)
    return error
  }
}