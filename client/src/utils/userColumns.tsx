import { Button, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteRowOutlined } from '@ant-design/icons';
import { User } from '../types/users';
import { useUserStore } from '../store/users';

const columns: ColumnsType<User> = [
  {
    title: 'Personal Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (_, { address }) => {
      return `${address.city}, ${address.street}`;
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Actions',
    key: 'actions',
    render(_, { id }) {
      const { deleteUser } = useUserStore.getState();
      return (
        <Button
          onClick={() => {
            deleteUser(id);
            notification.success({ message: 'User Deleted', duration: 3 });
          }}
          danger
          icon={<DeleteRowOutlined />}
          size="middle"
        >
          <a>Delete</a>
        </Button>
      );
    },
  },
];

export default columns;
