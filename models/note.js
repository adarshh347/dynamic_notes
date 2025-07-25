const mongoose = require('mongoose');
const slugify = require('slugify');

const contentBlockSchema = new mongoose.Schema({
    type: {type:String, required: True},
    value: {type:String, required: True}
});

const noteSchema = new  mongoose.Schema({
    title: {type:String, required: True},
    slug: {type:String, unique: True},
    author: {type:String, default: 'Anonymous'},
    coverImage: {type:String, unique: True},
    content: [contentBlockSchema],
    tags: [String],
    template_slug:{type:String, default: 'minimalist'},
}, {timestamps: true});

noteSchema.pre('save', function(next){
    if(this.isModified('title')){
        this.slug = slugify(this.title,{lower:true,strict:true});
    }
    next();
});
module.exports = mongoose.model('Note',noteSchema);