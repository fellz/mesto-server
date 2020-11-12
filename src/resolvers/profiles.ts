import pg from '../dbconfig';

export function getProfiles() {
  return pg('profiles').then( (res)=> res).catch( (err)=> err)
}

export function getProfile(args) {
  return pg.raw('select * from profiles where uid=?', [args.uid])
    .then( (res)=> res.rows[0])
    .catch( (err)=> err)
}

export function getContacts(profile){
  return pg.raw('select profiles.uid, contact_id, fullname from profile_contacts inner join profiles on contact_id = profiles.id where profile_id=?',[profile.id])
    .then( (res)=> res.rows)
    .catch( (err)=> err)
}
export async function addProfile(args){
  console.log('Args', args)
  try {
    const res: {id: number, uid: string}[] = await pg('profiles').insert({
      city: args.profile.city,
      about: args.profile.about,
      fullname: args.profile.fullname,
      user_id: args.profile.user_id
    }, ['id', 'uid'])

    const {id, uid} = res[0]
    const re = await pg('users').where('id', args.profile.user_id).update('profile_id', id)    
    
    return { uid }
  } catch (error) {
    console.log(error)
    return error
  }
}
export async function updateProfile(args){
  try {
    const res = await pg('profiles').where('uid', args.uid).update({
      about: args.about,
      city: args.city,
      fullname: args.fullname
     }).returning('uid')
     
    return {uid: res[0]}    
  } catch (error) {
    console.log(error)
    return error
  }
}