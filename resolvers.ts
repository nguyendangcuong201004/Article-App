import Article from "./models/article.model"
import Caterory from "./models/category.mode"

export const resolvers = {
    Query: {
        hello: () => {
            return 'Nguyen Dang Cuong'
        },

        getListArticle: async () => {
            const articles = await Article.find({
                deleted: false,
            })
            return articles
        },

        getArticle: async (_, args) => {
            const { id } = args; 
            const article = await Article.findOne({
                _id: id,
                deleted: false,
            })
            return article
        },

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
        createArticle: async (_, args) => {
            const { article } = args;
            const record = new Article(article);
            record.save();
            return record;
        },

        deleteArticle: async (_, args) => {
            const { id } = args;
            try {
                await Article.updateOne({
                    _id: id,
                    deleted: false,
                }, {
                    deleted: true
                })
                return "This article is deleted!"
            } catch (error) {
                return error;
            }
        }, 

        updateArticle: async (_, args) => {
            const { id, article } = args;
            console.log(article)
            try {
                await Article.updateOne({
                    _id: id,
                    deleted: false,
                }, article)
                const record = await Article.findOne({
                    _id: id,
                    deleted: false,
                })
                return record;
            } catch (error) {
                return error;
            }
        },

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