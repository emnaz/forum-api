const routes = (handler) => [
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes',
    handler: handler.putLikeUnlikeHandler,
    options: {
      auth: 'forum_jwt',
    },
  },
];

module.exports = routes;