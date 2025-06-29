import LoginDto from '@/dtos/login.dto';
import * as yup from 'yup';
const loginValidationSchema: yup.ObjectSchema<LoginDto> = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default loginValidationSchema;
