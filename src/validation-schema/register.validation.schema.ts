
import RegisterDto from '@/dtos/register.dto';
import * as yup from 'yup';
const registerValidationSchema: yup.ObjectSchema<RegisterDto> = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
  terms: yup.bool().oneOf([true], "You must accept the terms").required("You must accept the terms"),
});

export default registerValidationSchema;
