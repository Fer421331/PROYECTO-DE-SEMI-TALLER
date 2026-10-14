import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Favorito extends Model {
  declare favorito_id: number;
  declare usercod: number;
  declare producto_id: number;
  declare favorito_fecha: Date;
}

Favorito.init(
  {
    favorito_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usercod: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorito_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "favoritos",
    modelName: "Favorito",
    timestamps: false,
  }
);

export default Favorito;