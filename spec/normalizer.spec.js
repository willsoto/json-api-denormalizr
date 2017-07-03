import { expect } from 'chai';
import normalize from 'json-api-normalizer';

import { denormalize } from '../src';

const json = {
  data: [
    {
      type: 'post-block',
      relationships: {
        question: {
          data: {
            type: 'question',
            id: '295'
          }
        }
      },
      id: '2620',
      attributes: {
        text: 'I am great!',
        id: '2620'
      }
    }
  ],
  included: [
    {
      type: 'question',
      id: '295',
      attributes: {
        text: 'How are you?',
        id: '295'
      }
    }
  ]
};

describe('integration with json-api-normalizer', function() {
  beforeEach(function() {
    this.state = {
      entities: normalize(json)
    };
  });

  it('correctly denormalizes the state', function() {
    const entity = this.state.entities.postBlock['2620'];

    expect(denormalize(this.state, entity)).to.eql({
      id: '2620',
      question: {
        id: '295',
        text: 'How are you?'
      },
      text: 'I am great!'
    });
  });
});
