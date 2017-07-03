# json-api-denormalizr

## Getting Started

```sh
npm install json-api-denormalizr --save
```

## Documentation

* [Quick Start](#quickstart)
* [API](#api)
  - [denormalize](#denormalize)
* [Usage with Reselect](#usage-with-reselect)

## Quickstart

Given the following store / state in your Redux application:

```json
{
  "entities": {
    "postBlock": {
      "2620": {
        "id": "2620",
        "attributes": {
          "text": "I am great!",
          "id": "2620"
        },
        "relationships": {
          "question": {
            "data": {
              "id": "295",
              "type": "question"
            }
          }
        }
      }
    },
    "question": {
      "295": {
        "id": "295",
        "attributes": {
          "text": "How are you?",
          "id": "295"
        }
      }
    }
  }
}
```

```js
import { denormalize } from 'json-api-denormalizr';

denormalize(state, {
  id: '2620',
  attributes: {
    text: 'I am great!',
    id: '2620'
  },
  relationships: {
    question: {
      data: {
        id: '295',
        type: 'question'
      }
    }
  }
});

// equivalent to:
denormalize(state, state.entities.postBlock['2620'])
```

Will result in:

```json
{
  "id": "2620",
  "question": {
    "id": "295",
    "text": "How are you?"
  },
  "text": "I am great!"
}
```

## API

### `denormalize(state, entity, options = {})`

* `state`: your application state
* `entity`: the top level entity
* `options`:
  - `pathToEntities`: 
    - Where all your entities are located in the store. Assumes all your entities are at the same level of the store.

## Usage with [Reselect](https://github.com/reactjs/reselect)

Quick example using selectors:

```js
import { createSelector } from 'reselect';
import { denormalize } from 'json-api-denormalizr';

const entitiesSelector = state => state.entities;
const booksSelector = state => state.entities.books;

export const bookSelector = bookId => {
  return createSelector([entitiesSelector, booksSelector], (entities, books) => {
    const book = books[bookId];

    return denormalize(entities, book, {
      pathToEntities: 'entities'
    });
  });
};
```

## Contributing

```sh
npm test
```
