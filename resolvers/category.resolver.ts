import Caterory from "../models/category.mode";


export const resolversCategory = {
    Query: {
    
        getListCategory: async () => {
            const categorys = await Caterory.find({
                deleted: false
            })
            return categorys;
        },

        getCategory: async (_, args) => {
            const { id } = args;
            try {
                const category = await Caterory.findOne({
                    _id: id,
                    deleted: false,
                })
                return category;
            } catch (error) {
                return error;
            }
        }
    },


    Mutation: {
        createCategory: async (_, args) => {
            const { category } = args;
            const record = new Caterory(category);
            record.save();
            return record;
        },

        deleteCategory: async (_, args) => {
            const { id } = args;
            try {
                await Caterory.updateOne({
                    _id: id,
                    deleted: false,
                }, {
                    deleted: true
                })
                return "This Category is deleted!"
            } catch (error) {
                return error;
            }
        }, 

        updateCategory: async (_, args) => {
            const { id, category } = args;
            try {
                await Caterory.updateOne({
                    _id: id,
                    deleted: false,
                }, category)
                const record = await Caterory.findOne({
                    _id: id,
                    deleted: false,
                })
                return record;
            } catch (error) {
                return error;
            }
        },
    }
}