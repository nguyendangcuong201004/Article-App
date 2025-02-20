import Article from "../models/article.model";
import Caterory from "../models/category.mode";

export const resolversArticle = {
    Query: {

        getListArticle: async (_, args) => {
            const { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword } = args;

            const find = {
                deleted: false,
            }

            // Filter
            if (filterKey && filterValue){
                find[filterKey] = filterValue
            }

            // Search
            if (keyword){
                const regex = new RegExp(keyword, 'i');
                find["title"] = regex;
            }
            
            // Sort
            const sort = {}
            if (sortKey && sortValue){
                sort[sortKey] = sortValue;
            }

            // Pagination
            const skip = (currentPage - 1) * limitItem;

            const articles = await Article
            .find(find)
            .sort(sort).limit(limitItem)
            .limit(limitItem)
            .skip(skip)
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

    },

    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;
            const category = await Caterory.findOne({
                _id: categoryId,
                deleted: false,
            })
            return category;
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
    }
}