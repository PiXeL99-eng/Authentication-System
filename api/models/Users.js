module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Users;
}