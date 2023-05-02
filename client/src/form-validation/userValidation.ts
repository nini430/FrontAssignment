import { ObjectSchema, object, string } from 'yup';

import { UserInput } from '../types/users';

const userFormInitialState: UserInput = {
  name: '',
  email: '',
  gender: 'male',
  address: {
    street: '',
    city: '',
  },
  phone: '',
};

const userValidationSchema: ObjectSchema<UserInput> = object({
  name: string().required('Name field is required'),
  email: string()
    .required('Email field is required')
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      { message: 'Email is not valid' }
    ),
  gender: string().oneOf(['male', 'female']).required('Please select gender'),
  address: object({
    street: string().required('Street field is required'),
    city: string().required('City field is required'),
  }),
  phone: string().required('Phone field is required'),
});

export { userValidationSchema, userFormInitialState };
