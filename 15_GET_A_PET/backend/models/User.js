import mongoose from "mongoose"
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema(
        {
            name: {
                type: String, 
                require: true
            },
            email: {
                type: String, 
                required: true
            },
            password: {
                type: String,
                required: true
            },
            image: {
                type: String
            },
            phone: {
                type: String,
                require: true
            }
        },
        { timestamps: true }
    )
)

export default User