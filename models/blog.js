const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImageURL:{
        type: String,
        required: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:'user',
    },
}, {timestamps: true});

const blogModel = model('blog', blogSchema);

module.exports = blogModel;