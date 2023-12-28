const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetThreadDetailUseCase = require('../../../../Applications/use_case/threads/GetThreadDetailUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadDetailsHandler = this.getThreadDetailsHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id } = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload, id);

    const response = h.response({
      status: 'success',
      data: { addedThread },
    });
    response.code(201);
    return response;
  }

  async getThreadDetailsHandler(request, h) {
    const { threadId } = request.params;

    const getThreadDetails = this._container
      .getInstance(GetThreadDetailUseCase.name);

    const thread = await getThreadDetails.execute(threadId);

    return h.response({
      status: 'success',
      data: { thread },
    }).code(200);
  }
}

module.exports = ThreadsHandler;
