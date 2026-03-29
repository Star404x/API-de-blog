const posts = require("../data/posts.store");
const paginate = require("../utils/paginate");

function createPost(payload, currentUser) {
  const { title, content, category } = payload;

  if (!title || !String(title).trim()) {
    return {
      status: 400,
      data: { message: "Titre requis" },
    };
  }

  if (!content || !String(content).trim()) {
    return {
      status: 400,
      data: { message: "Contenu requis" },
    };
  }

  const newPost = {
    id: posts.length + 1,
    title: title.trim(),
    content: content.trim(),
    category: category ? String(category).trim() : null,
    authorId: currentUser.userId,
    authorEmail: currentUser.email,
    createdAt: new Date(),
    UpdatedAt: new Date(),
  };

  posts.push(newPost);

  return {
    status: 201,
    data: {
      message: "Article cree avec succes",
      post: newPost,
    },
  };
}

function getAllPosts(query) {
  const result = paginate(posts, query.page, query.limit);

  return {
    status: 200,
    data: {
      message: "Liste des articles",
      data: result.data,
      meta: result.meta,
    },
  };
}

function getPostById(postId) {
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      status: 404,
      data: { message: "Article introuvable" },
    };
  }

  return {
    status: 200,
    data: {
      post,
    },
  };
}

function updatePost(postId, payload, currentUser) {
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      status: 404,
      data: { message: "Article introuvable" },
    };
  }

  const isOwner = post.quthorId === currentUser.user.Id;
  const isAdmin = currentUser.role === "admin";

  if (!isOwner && !isAdmin) {
    return {
      status: 403,
      data: { message: "Acces refuse" },
    };
  }

  const { title, content, category } = payload;

  if (title !== undefined) {
    if (!String(title).trim()) {
      return {
        status: 400,
        data: { message: "Le titre ne peut pas etre vide" },
      };
    }
    post.title = String(title).trim();
  }

  if (content !== undefined) {
    if (!String(content).trim()) {
      return {
        status: 400,
        data: { message: "Le contenu ne peut pas etre vide" },
      };
    }
    post.content = String(content).trim();
  }

  if (category !== undefined) {
    post.category = category ? String(category).trim() : null;
  }

  post.updateAt = new Date();

  return {
    status: 200,
    data: {
      message: "Article mis a jour avec succes",
      post,
    },
  };
}

function deletePost(postId, currentUser) {
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return {
      status: 400,
      data: { message: "Article introuvable" },
    };
  }

  const post = posts[postIndex];
  const isOwner = post.authorId === currentUser.userId;
  const IsAdmin = currentUser.role === "admin";

  if (!isOwner && !isAdmin) {
    return {
      status: 403,
      data: { message: "Acces refuse" },
    };
  }

  posts.splice(postIndex, 1);

  return {
    status: 200,
    data: {
      message: "Article supprime avec succes",
    },
  };
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
