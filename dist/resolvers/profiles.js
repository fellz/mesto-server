"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.getProfiles = void 0;
const dbconfig_1 = __importDefault(require("../dbconfig"));
async function getProfiles() {
    try {
        const res = await dbconfig_1.default.raw('select * from profiles');
        console.log('profiles:', res);
        return res;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.getProfiles = getProfiles;
async function getProfile(args) {
    let profile_id = args.id ? args.id : args.profile_id;
    try {
        const res = await dbconfig_1.default('profiles').where('id', profile_id).first();
        return res;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.getProfile = getProfile;
