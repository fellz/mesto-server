"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = void 0;
const dbconfig_1 = __importDefault(require("../dbconfig"));
async function getUsers() {
    try {
        const res = await dbconfig_1.default('users');
        return res;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.getUsers = getUsers;
async function getUser(args) {
    let user_id = args.id ? args.id : args.user_id;
    try {
        const res = await dbconfig_1.default('users').where('id', user_id).first();
        return res;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
exports.getUser = getUser;
