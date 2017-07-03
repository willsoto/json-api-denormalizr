export const denormalize = (state, entity, options = {}) => {
  if (options.pathToEntities) {
    state = state[options.pathToEntities];
  }

  let result = {
    id: entity.id,
    ...entity.attributes
  };

  if (entity.relationships) {
    result = processRelationships(result, entity.relationships, state);
  }

  return result;
};

const processRelationships = (entity, relationships, state) => {
  for (let type in relationships) {
    const relationship = relationships[type];
    const { data } = relationship;

    if (!data) {
      continue;
    }

    if (Array.isArray(data)) {
      entity[type] = data.map(item => createRelationship(item, state));
    } else {
      entity[type] = createRelationship(data, state);
    }
  }

  return entity;
};

const createRelationship = (data, state) => {
  let entity = state[data.type][data.id];
  let result = {
    id: entity.id,
    ...entity.attributes
  };

  if (entity.relationships) {
    result = processRelationships(result, entity.relationships, state);
  }

  return result;
};
