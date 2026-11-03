import { Sequelize } from "sequelize";
const ENV = process.env;

export const DB_LACTAXUME = new Sequelize({
  dialect: "mysql",
  host: ENV.DB_HOST!,
  port: 3306,
  username: ENV.DB_USER!,
  password: ENV.DB_PASSWORD!,
  database: ENV.DB_NAME!,
  logging: false,
  //logging: (msg:any) => console.log(msg),
  define: {
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
  },
  dialectOptions: {
    decimalNumbers: true,
    //READ
    useUTC: false,
    dateStrings: true,
    typeCast: true,
  },
  //WRITE
  timezone: ENV.TIMEZONE!,
});
