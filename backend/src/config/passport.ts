import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("La Variable de Entorno Secreta no esta Configurada");
}
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
      algorithms: ["HS256"],
    },
    (payload, done) => {
      return done(null, payload);
    }
  )
);

export default passport;