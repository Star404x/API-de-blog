const paginate = require("../utils/paginate");
const comments = require("../data/comments.store");
const posts = require("../data/posts.store");

function createComment(payload, currentUser) {
  const { content, postId } = payload;

  if (!content || !postId) {
    return {
      status: 400,
      data: { message: "Contenu et postId requis" },
    };
  }

  const numericPostId = parseInt(postId, 10);

  if (Number.isNaN(numericPostId)) {
    return {
      status: 400,
      data: { message: "postId invalide" },
    };
  }

  const post = posts.find((post) => post.id === numericPostId);

  if (!post) {
    return {
      status: 404,
      data: { message: "Article introuvable" },
    };
  }

  const newComment = {
    id: comments.length + 1,
    content,
    postId: numericPostId,
    authorId: currentUser.userId,
    authorEmail: currentUser.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  comments.push(newComment);

  return {
    status: 201,
    data: {
      message: "Commentaire cree avec succes",
      comment: newComment,
    },
  };
}

function getAllComments(query) {
  const search = query.search ? String(query.search).trim().toLowerCase() : "";

  let filteredComments = comments;

  if (search) {
    filteredComments = comments.filter((comment) => {
      const content = comment.content ? comment.content.toLowerCase() : "";
      return content.includes(search);
    });
  }

  const result = paginate(filteredComments, query.page, query.limit);

  return {
    status: 200,
    data: {
      message: "Liste des commentaires",
      filters: {
        search: search || null,
      },
      data: result.data,
      meta: result.meta,
    },
  };
}

function getCommentById(commentId) {
  const comment = comments.find((comment) => comment.id === commentId);

  if (!comment) {
    return {
      status: 404,
      data: { message: "commentaire introuvable" },
    };
  }

  return {
    status: 200,
    data: { comment },
  };
}

function getCommentsByPostId(postId) {
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      status: 404,
      data: { message: "Article introuvable" },
    };
  }

  const postComments = comments.filter((comment) => comment.postId === postId);

  return {
    status: 200,
    data: {
      message: "Commentaires de l'article",
      comments: postComments,
    },
  };
}

function updateComment(commentId, payload, currentUser) {
  const comment = comments.find((comment) => comment.id === commentId);

  if (!comment) {
    return {
      status: 404,
      data: { message: "Commentaire introuvable" },
    };
  }

  const isOwner = comment.authorId === currentUser.userId;
  const isAdmin = currentUser.role === "admin";

  if (!isOwner && !isAdmin) {
    return {
      status: 403,
      data: { message: "Acces refuse" },
    };
  }

  const { content } = payload;

  if (content !== undefined) {
    comment.content = content;
  }

  comment.updatedAt = new Date();

  return {
    status: 200,
    data: {
      message: "Commentaire mis a jour avec succes",
      comment,
    },
  };
}

function deleteComment(commentId, currentUser) {
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId,
  );

  if (commentIndex === -1) {
    return {
      status: 404,
      data: {
        message: "Commentaire introuvable",
      },
    };
  }

  const comment = comments[commentIndex];
  const isOwner = comment.authorId === currentUser.userId;
  const isAdmin = currentUser.role === "admin";

  if (!isOwner && !isAdmin) {
    return {
      status: 403,
      data: {
        message: "Acces refuse",
      },
    };
  }

  comments.splice(commentIndex, 1);

  return {
    status: 200,
    data: {
      message: "Commentaire supprime avec succes",
    },
  };
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
