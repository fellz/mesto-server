import fs from 'fs';
import pg from '../dbconfig';

export async function getAvatar(profile){
  const res = await pg('profiles').join('avatar', 'avatar.id', '=', 'profiles.avatar_id').where('avatar_id',profile.avatar_id).select('avatar.url')
  console.log(res)
  return res[0]
}

export async function ImageUpload(args){
  const {createReadStream, filename, mimetype} = await args.file
  const fileStream = createReadStream()
  const res = await fileStream.pipe(fs.createWriteStream(`./public/uploads/${filename}`))
  const avatar_resp = await pg('avatar').insert({url: `/uploads/${filename}`, profile_id: args.id}, ['id'])
  const profile_resp = await pg('profiles').where('id', args.id).update('avatar_id', avatar_resp[0].id)

  const {id} = avatar_resp[0]
  return `/uploads/${filename}`;
}