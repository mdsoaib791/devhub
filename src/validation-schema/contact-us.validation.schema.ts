import { ContactUsModel } from '@/models/contact-us.model';
import * as Yup from 'yup';
import { emailField, messageField, nameField, phoneField, recaptchaTokenField } from './website-main-common-validations.schema';

const contactUsSchema: Yup.ObjectSchema<ContactUsModel> = Yup.object().shape({
  fullName: nameField(),
  email: emailField(),
  phone: phoneField(),
  companyName: Yup.string()
    .required('Company is required.')
    .test('companyValidation', 'Company name can only contain letters, numbers, spaces, periods, hyphens, and ampersands.', (value) => {
      if (value) {
        const matchPattern = /^[a-zA-Z0-9\s\.\-&]+$/;
        return matchPattern.test(value);
      }
      return true;
    })
    .max(100, 'Company name must not exceed ${max} characters.'),
  message: messageField({
    required: true,
    messages: {
      required: 'Comments is required.',
      invalid: 'Invalid characters in comments.',
    },
  }),
  recaptchaToken: recaptchaTokenField(),
});

export default contactUsSchema;
