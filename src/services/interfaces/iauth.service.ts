import AuthModel from "@/models/auth.model";
import RegisterModel from "@/models/register.model";

export default interface IAuthService {
 login(model: AuthModel): Promise<any>;
 register(model: RegisterModel): Promise<any>;
  // delete(id: number): Promise<any>;
}
