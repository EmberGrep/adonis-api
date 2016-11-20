'use strict';

const Slide = use('App/Model/Slide');
const attributes = ['content'];

class SlideController {

  * index(request, response) {
    const slides = yield Slide.with('reason').fetch();

    response.jsonApi('Slide', slides);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      reason_id: request.jsonApi.getRelationId('reason'),
    };
    const slide = yield Slide.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Slide', slide);
  }

  * show(request, response) {
    const id = request.param('id');
    const slide = yield Slide.with('reason').where({ id }).firstOrFail();

    response.jsonApi('Slide', slide);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      reason_id: request.jsonApi.getRelationId('reason'),
    };

    const slide = yield Slide.with('reason').where({ id }).firstOrFail();
    slide.fill(Object.assign({}, input, foreignKeys));
    yield slide.save();

    response.jsonApi('Slide', slide);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const slide = yield Slide.query().where({ id }).firstOrFail();
    yield slide.delete();

    response.status(204).send();
  }

}

module.exports = SlideController;
