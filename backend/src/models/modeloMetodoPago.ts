import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class MetodoPago extends Model {
  declare metodo_pago_id: number;
  declare metodo_nombre: string;
  declare metodo_descripcion: string | null;
  declare metodo_estado: string;
  declare metodo_fecha_creacion: Date;
}

MetodoPago.init(
  {
    metodo_pago_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    metodo_nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    metodo_descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    metodo_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    metodo_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "metodos_pago",
    modelName: "MetodoPago",
    timestamps: false,
  }
);

export default MetodoPago;
