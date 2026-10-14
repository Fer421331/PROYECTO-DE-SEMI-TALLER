import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Carrito extends Model {
  declare carrito_id: number;
  declare usercod: number;
  declare carrito_estado: string;
  declare carrito_fecha_creacion: Date;
  declare carrito_fecha_actualizacion: Date;
}

Carrito.init(
  {
    carrito_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usercod: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    carrito_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    carrito_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    carrito_fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "carrito",
    modelName: "Carrito",
    timestamps: false,
  }
);

export default Carrito;