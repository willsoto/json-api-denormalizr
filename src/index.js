import _ from 'lodash';

export const denormalize = (state, entity, options = {}) => {
  const pathToEntities = options.entities || 'entities';
  const allEntities = _.get(state, pathToEntities);

  let result = {
    id: entity.id,
    ...entity.attributes
  };

  if (entity.relationships) {
    processRelationships(result, entity.relationships, allEntities);
  }

  return result;
};

const processRelationships = (entity, relationships, allEntities) => {
  for (let type in relationships) {
    const relationship = relationships[type];
    const { data } = relationship;

    if (!data) {
      continue;
    }

    if (_.isArray(data)) {
      entity[type] = _.map(data, item => createRelationship(item, allEntities));
    } else {
      entity[type] = createRelationship(data, allEntities);
    }
  }

  return entity;
};

const createRelationship = (data, allEntities) => {
  let entity = allEntities[data.type][data.id];
  let result = {
    id: entity.id,
    ...entity.attributes
  };

  if (entity.relationships) {
    result = processRelationships(result, entity.relationships, allEntities);
  }

  return result;
};
