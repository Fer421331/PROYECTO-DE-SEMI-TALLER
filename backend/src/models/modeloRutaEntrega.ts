import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class RutaEntrega extends Model {
  declare id_ruta: number;
  declare origen: string;
  declare destino: string;
  declare distancia_km: number;
  declare duracion_min: number;
  declare estado: string;
}

RutaEntrega.init(
  {
    id_ruta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    origen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    distancia_km: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    duracion_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "rutas_entrega",
    modelName: "RutaEntrega",
    timestamps: false,
  }
);

export default RutaEntrega;