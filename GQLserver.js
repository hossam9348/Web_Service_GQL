const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Article{
    id: Int,
    title: String, 
    content: String,
}

type Comment{
    title: String,
    content: String,
}

type ArticlesComments {
 article: Article,
 comments: [Comment], 
}

type Query{
    getArticleById(id: Int!): Article,
    getArticlesComments: [ArticlesComments],
}


type Mutation{
    createArticle(title: String!, content: String!): Article, 
}
`

function getArticleById(id){
return articles.find((article)=> article.id === id)
}

function getArticlesComments(){
    const ArticlesComments = []
    articlesCommentsRelatoin.forEach((articleComments, index)=> {
    ArticlesComments.push({article: articles[index], comments: articleComments}) 
    });
    return ArticlesComments
}


function createArticle(title, content){
    const article = {id:String(parseInt(articles[articles.length-1].id)+1), title, content}
    articles.push(article)
    return article
}




const articles = [
    {id: "1", title:"art1", content:"cont1"}, 
    {id: "2", title:"art2", content:"cont2"}, 
    {id: "3", title:"art3", content:"cont3"},
    {id: "4", title:"art4", content:"cont4"},
]

const Comments = [
    {title:"Comment1", content:"cont1"},
    {title:"Comment2", content:"cont2"},
    {title:"Comment3", content:"cont3"},
    {title:"Comment4", content:"cont4"},
    {title:"Comment5", content:"cont5"},
    {title:"Comment6", content:"cont6"},
    {title:"Comment7", content:"cont7"},
    {title:"Comment8", content:"cont8"},
    {title:"Comment9", content:"cont9"},
    {title:"Comment10", content:"cont10"},
    {title:"Comment11", content:"cont11"},
    {title:"Comment12", content:"cont12"},
]

const articlesCommentsRelatoin = [
 [
    { title:"Comment4", content:"cont4"},
    {title:"Comment5", content:"cont5"},
    {title:"Comment7", content:"cont7"},
 ],
 [
    { title:"Comment8", content:"cont8"},
    {title:"Comment1", content:"cont1"},
    {title:"Comment2", content:"cont2"},
 ],
 [
    { title:"Comment3", content:"cont3"},
    {title:"Comment6", content:"cont6"},
    {title:"Comment9", content:"cont9"},
 ],
 [
    { title:"Comment11", content:"cont11"},
    {title:"Comment10", content:"cont10"},
    {title:"Comment12", content:"cont12"},
 ],
]




const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            getArticleById(_, arg){
                return getArticleById(String(arg.id))
            },
            getArticlesComments(){ 
                return getArticlesComments()
            },
        },
        Mutation: {
            createArticle(_, args) {
                return createArticle(args.title, args.content)
            }
        }
    }
})
server.listen(3002).then(({ port }) => console.log('listening on', port) )