import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class DireccionUsuario extends Model {
  declare direccion_id: number;
  declare usercod: number;
  declare direccion_alias: string;
  declare direccion_receptor: string;
  declare direccion_telefono: string;
  declare direccion_departamento: string;
  declare direccion_ciudad: string;
  declare id_ruta: number;
  declare direccion_detalle: string;
  declare direccion_referencia: string | null;
  declare direccion_predeterminada: boolean;
  declare direccion_estado: string;
  declare direccion_fecha_creacion: Date;
  declare direccion_fecha_actualizacion: Date;
}

DireccionUsuario.init(
  {
    direccion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usercod: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    direccion_alias: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    direccion_receptor: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    direccion_telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    direccion_departamento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion_ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion_detalle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    direccion_referencia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    direccion_predeterminada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    direccion_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    direccion_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    direccion_fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "direcciones_usuario",
    modelName: "DireccionUsuario",
    timestamps: false,
  }
);

export default DireccionUsuario;