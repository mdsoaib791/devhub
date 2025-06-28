import { DeveloperModel } from '@/models/developer.model';
import * as yup from 'yup';

const developerValidationSchema: yup.ObjectSchema<DeveloperModel> = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string(),
  avatar: yup.string().url('Must be a valid URL'),
  skills: yup.array().of(yup.string().required()).min(1, 'At least one skill is required').required('Skills are required'),
  social: yup.object().shape({
    github: yup.string().url('Must be a valid URL'),
    twitter: yup.string().url('Must be a valid URL'),
    linkedin: yup.string().url('Must be a valid URL'),
    website: yup.string().url('Must be a valid URL'),
  }),
});

export default developerValidationSchema;
