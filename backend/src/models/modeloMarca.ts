import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Marca extends Model {
  declare marca_id: number;
  declare marca_nombre: string;
  declare marca_descripcion: string | null;
  declare marca_estado: string;
  declare marca_fecha_creacion: Date;
  declare marca_fecha_actualizacion: Date;
}

Marca.init(
  {
    marca_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    marca_nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    marca_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    marca_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    marca_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    marca_fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "marcas",
    modelName: "Marca",
    timestamps: false,
  }
);

export default Marca;