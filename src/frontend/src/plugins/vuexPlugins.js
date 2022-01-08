import JWTService from "../services/jwt.service";
import { createResources } from "../common/createResourses";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = createResources();
}
