'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Interaction.belongsToMany(models.Post, {
        through: models.PostInteraction,
        foreignKey: 'interactionId',
        otherKey: 'postId'
      });
    }
  }
  Interaction.init({
    comment: DataTypes.STRING,
    upVotes: DataTypes.INTEGER,
    downVotes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};