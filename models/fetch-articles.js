const knex = require("../db/connection");
const fetchArticles = (
  sort_by = "author",
  order = "desc",
  author,
  topic,
  id
) => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .count("comments.article_id as comment_count")
    .from("articles")
    .groupBy("articles.article_id")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .modify(queryBuilder => {
      if (author) {
        queryBuilder.where({ "articles.author": author });
      }
      if (topic) {
        queryBuilder.where({ "articles.topic": topic });
      }
      if (id) {
        queryBuilder.where({ "articles.article_id": id });
      }
    })
    .orderBy(sort_by, order)
    .then(articles => {
      return { articles };
    });
};

module.exports = fetchArticles;
