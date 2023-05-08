const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose  = require("mongoose");

const app = express();

const badgeSchema = new mongoose.Schema({
    name: String,
    dateCreated: {
        type: Date,
        immutable: true,
        default: ()=>Date.now()
    },
    dateModified: {
        type: Date,
        default: ()=>Date.now()
    }
})

const userSchema = new mongoose.Schema({
    name: {type: String, default: null},
    bio:  {type: String, default: "வணக்கம்! தமிழ் சங்கத்தில் இணைந்திருக்கிறேன்!"},
    email: {
        type: String,
        unique: true,
    },
    phone: String,
    password: {
        type: String,
        required: true
    },
    token: { type: String },
    hash: String,
    salt: String,
    id: ObjectId,
    isSuperUser: Boolean,
    isStaff: Boolean,
    dateCreated: {
        type: Date,
        immutable: true,
        default: ()=>Date.now()
    },
    dateModified: {
        type: Date,
        default: ()=>Date.now()
    },
    badges: badgeSchema
});
    
const Badges = mongoose.model("Badge", badgeSchema);
const User = mongoose.model("User", userSchema);

module.exports = {Badges, User}