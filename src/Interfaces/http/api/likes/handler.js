const LikeUnlikeUseCase = require('../../../../Applications/use_case/likes/LikeUnlikeUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;

    this.putLikeUnlikeHandler = this.putLikeUnlikeHandler.bind(this);
  }

  async putLikeUnlikeHandler(request, h) {
    const { threadId, commentId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    const likeUnLikeUseCase = this._container.getInstance(LikeUnlikeUseCase.name);

    const useCasePayload = {
      threadId,
      commentId,
      userId: credentialId,
    };

    await likeUnLikeUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;