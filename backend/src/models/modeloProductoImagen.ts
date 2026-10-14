import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class ProductoImagen extends Model {
  declare imagen_id: number;
  declare producto_id: number;
  declare imagen_ruta: string;
  declare imagen_principal: boolean;
  declare imagen_orden: number;
  declare imagen_estado: string;
}

ProductoImagen.init(
  {
    imagen_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen_ruta: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imagen_principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imagen_orden: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    imagen_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "producto_imagenes",
    modelName: "ProductoImagen",
    timestamps: false,
  }
);

export default ProductoImagen;