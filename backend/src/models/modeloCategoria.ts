import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Categoria extends Model {
  declare categoria_id: number;
  declare categoria_nombre: string;
  declare categoria_descripcion: string | null;
  declare categoria_estado: string;
  declare categoria_fecha_creacion: Date;
  declare categoria_fecha_actualizacion: Date;
}

Categoria.init(
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoria_nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categoria_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categoria_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    categoria_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    categoria_fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "categorias",
    modelName: "Categoria",
    timestamps: false,
  }
);

export default Categoria;