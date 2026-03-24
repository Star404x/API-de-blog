const posts = require("../data/posts.store");

function createPost(payload, currentUser) {
  const { title, content, category } = payload;

  if (!title || !content) {
    return {
      status: 400,
      data: { message: "Titre et contenu requis" },
    };
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    category: category || null,
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

function getAllPosts() {
  return {
    status: 200,
    data: {
      message: "liste des articles",
      posts,
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
    post.title = title;
  }

  if (content !== undefined) {
    post.content = content;
  }

  if (category !== undefined) {
    post.category = category;
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
