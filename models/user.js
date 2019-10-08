module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User',{
        userId: {
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        password : {
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        nickname:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
    });

    User.associate = (db) => {
        db.User.hasMany(db.UserBook);
    }

    return User;
}