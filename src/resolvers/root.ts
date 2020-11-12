import { addUser } from './users';
import { getProfiles, getProfile, getContacts, addProfile, updateProfile } from './profiles';
import { getAvatar, ImageUpload } from './avatar';
import { User } from '../types';


// Provide resolver functions for your schema fields
// Test compilation
export const resolvers = {
  Query: {
    profiles: (root, args, context) =>{
      return getProfiles()
    },
    profile: (root, args, context)=>{
      return getProfile(args)
    }
  },
  Profile: {
    contacts: (profile, args, conext)=>{
      return getContacts(profile)
    },
    avatar: (profile, args, context)=>{
      return getAvatar(profile)
    }
  },
  Mutation: {
    createUser: (root, args: User, context)=>{
      return addUser(args)
    },
    createProfile: (root, args, context)=>{
      return addProfile(args)
    },
    updateProfile:(root, args, context)=>{
      return updateProfile(args)
    },
    singleImageUpload: async(parent, args) => {
      return ImageUpload(args)
    },
  }
};