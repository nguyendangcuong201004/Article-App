import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: String,
    avatar: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
})

const Caterory = mongoose.model("Caterory", categorySchema, "categories");

export default Caterory;