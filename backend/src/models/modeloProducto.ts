import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Producto extends Model {
  declare producto_id: number;
  declare categoria_id: number;
  declare marca_id: number;
  declare producto_sku: string;
  declare producto_nombre: string;
  declare producto_slug: string;
  declare producto_descripcion: string | null;
  declare producto_costo: number;
  declare producto_precio: number;
  declare producto_stock: number;
  declare producto_activo: string;
  declare producto_estado: string;
  declare producto_fecha_creacion: Date;
  declare producto_fecha_actualizacion: Date;
}

Producto.init(
  {
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marca_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_sku: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    producto_nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    producto_slug: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    producto_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    producto_costo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    producto_precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    producto_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_activo: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    producto_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    producto_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    producto_fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "productos",
    modelName: "Producto",
    timestamps: false,
  }
);

export default Producto;