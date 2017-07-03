import { expect } from 'chai';

import { denormalize } from '../src';

import state from './state.mock.json';

describe('denormalize', function() {
  beforeEach(function() {
    const entity = state.books['1'];

    this.result = denormalize(state, entity);
  });

  it('works', function() {
    expect(this.result).to.be.eql({
      id: '1',
      title: 'The Stranger',
      authors: [
        {
          id: '1',
          name: 'Albert Camus',
          publisher: {
            id: '1',
            name: 'Penguin',
            locations: [
              {
                id: '1',
                city: 'Denver',
                state: 'Colorado'
              }
            ]
          }
        }
      ],
      tags: [
        {
          id: '1',
          name: 'Fiction'
        },
        {
          id: '2',
          name: 'Philosophy'
        },
        {
          id: '3',
          name: 'French'
        }
      ]
    });
  });

  describe('relationships', function() {
    it('generates an array for authors', function() {
      expect(this.result.authors).to.be.an('array');
    });

    it('generates an array for tags', function() {
      expect(this.result.tags).to.be.an('array');
    });

    it('generates a single publisher per author', function() {
      this.result.authors.map(author => {
        expect(author.publisher).to.be.an('object');
      });
    });
  });
});
