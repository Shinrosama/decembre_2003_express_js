// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom doit avoir un nombre de caractères compris entre 2 et 50.",
                    args: [2, 50]
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le nom doit avoir un nombre de caractères compris entre 2 et 50.",
                    args: [8, 50]
                }
            }
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        }
    }
        );
    }
     
