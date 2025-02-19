import Article from "./models/article.model"

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
        }
    }
}