'use strict';
import {Model, UUIDV4} from 'sequelize';

interface UserAttributes{
  id:string,
  name:string,
  username:string,
  email:string,
  image:string,
  address:string,
  password:string,
  birthday:string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    name!:string;
    username!:string;
    email!:string;
    image!:string;
    address!:string;
    password!:string;
    birthday!:string;
    static associate(models: any) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull:false,
      defaultValue : UUIDV4,
      primaryKey:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    birthday: {
      type:DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};