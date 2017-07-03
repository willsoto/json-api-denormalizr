import { expect } from 'chai';
import normalize from 'json-api-normalizer';

import { denormalize } from '../src';

import response from './response.mock.json';

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
  describe('using their example', function() {
    beforeEach(function() {
      this.state = {
        entities: normalize(json)
      };
    });

    it('correctly denormalizes the state', function() {
      const entity = this.state.entities.postBlock['2620'];

      expect(
        denormalize(this.state, entity, {
          pathToEntities: 'entities'
        })
      ).to.eql({
        id: '2620',
        question: {
          id: '295',
          text: 'How are you?'
        },
        text: 'I am great!'
      });
    });
  });

  describe("using JSON API's example", function() {
    beforeEach(function() {
      this.state = normalize(response, {
        camelizeKeys: false
      });
    });

    it('correctly denormalizes the state', function() {
      const entity = this.state.articles['1'];

      expect(denormalize(this.state, entity)).to.eql({
        id: '1',
        title: 'JSON API paints my bikeshed!',
        author: { id: '9', 'first-name': 'Dan', 'last-name': 'Gebhardt', twitter: 'dgeb' },
        comments: [
          {
            id: '5',
            body: 'First!',
            author: { id: '2', 'first-name': 'Yehuda', 'last-name': 'Katz', twitter: 'wycats' }
          },
          {
            id: '12',
            body: 'I like XML better',
            author: { id: '9', 'first-name': 'Dan', 'last-name': 'Gebhardt', twitter: 'dgeb' }
          }
        ]
      });
    });
  });
});
