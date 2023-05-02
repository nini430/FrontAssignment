import { SetStateAction, useEffect } from 'react';
import { Modal, Divider, Form, Input, Select, Alert, notification } from 'antd';
import { useFormik, getIn } from 'formik';
import {
  userFormInitialState,
  userValidationSchema,
} from '../form-validation/userValidation';
import { useUserStore } from '../store/users';
import { User } from '../types/users';

interface IUserModalProps {
  open: boolean;
  onCancel: () => SetStateAction<void>;
  record: User | null;
}

const UserModal = ({ open, onCancel, record }: IUserModalProps) => {
  const { createNewUser, users, updateUser } = useUserStore();
  const {
    setFieldValue,
    errors,
    handleSubmit,
    getFieldProps,
    touched,
    values,
    resetForm,
    dirty,
  } = useFormik({
    initialValues: userFormInitialState,
    validationSchema: userValidationSchema,
    onSubmit: () => {
      record
        ? updateUser({ ...values, id: record.id })
        : createNewUser({ ...values, id: users.length + 1 });
      notification.success({
        message: `User ${record ? 'Updated' : 'Added'}`,
        duration: 3,
      });
      onCancel();
    },
  });
  useEffect(() => {
    if (record) {
      resetForm({
        values: {
          name: record.name,
          email: record.email,
          address: {
            city: record.address.city,
            street: record.address.street,
          },
          phone: record.phone,
          gender: record.gender,
        },
      });
    }
  }, [record, resetForm]);
  return (
    <Modal
      okText="Save"
      okButtonProps={{
        disabled: Object.keys(errors).length > 0 || !dirty,
      }}
      open={open}
      onCancel={onCancel}
      onOk={() => handleSubmit()}
    >
      <h1>{record ? 'Update' : 'Add'} New User</h1>
      <Divider />
      <Form>
        <Input
          {...getFieldProps('name')}
          name="name"
          title="Name"
          placeholder="John Doe"
        />
        {errors.name && touched.name && (
          <Alert
            showIcon
            className="alert"
            type="error"
            message={errors.name}
          />
        )}
        <Input
          {...getFieldProps('email')}
          name="email"
          title="E-mail"
          placeholder="johndoe@gmail.com"
        />
        {errors.email && touched.email && (
          <Alert
            showIcon
            className="alert"
            type="error"
            message={errors.email}
          />
        )}
        <Select
          onChange={(val) => setFieldValue('gender', val)}
          placeholder="Gender"
          title="Gender"
          className="select"
          value={values.gender}
        >
          <Select.Option key="male" value="male">
            Male
          </Select.Option>
          <Select.Option key="female" value="female">
            Female
          </Select.Option>
        </Select>
        <Input
          {...getFieldProps('address.city')}
          name="address.city"
          placeholder="City"
        />
        {getIn(touched, 'address.city') && getIn(errors, 'address.city') && (
          <Alert
            showIcon
            className="alert"
            type="error"
            message={errors?.address?.city}
          />
        )}
        <Input
          {...getFieldProps('address.street')}
          name="address.street"
          placeholder="Street"
        />
        {getIn(touched, 'address.street') &&
          getIn(errors, 'address.street') && (
            <Alert
              showIcon
              className="alert"
              type="error"
              message={errors?.address?.street}
            />
          )}
        <Input
          {...getFieldProps('phone')}
          name="phone"
          title="Phone"
          placeholder="+1 (111) 111-111"
        />
        {errors.phone && touched.phone && (
          <Alert
            showIcon
            className="alert"
            type="error"
            message={errors.phone}
          />
        )}
      </Form>
    </Modal>
  );
};

export default UserModal;
