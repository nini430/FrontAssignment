import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import columns from '../utils/userColumns';
import { useUserStore } from '../store/users';
import UserModal from '../components/UserModal';
import { User } from '../types/users';

const UserTable = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [record, setRecord] = useState<User | null>(null);
  const { users, getAllUsers } = useUserStore();
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  return (
    <>
      <Container>
        <Button
          icon={<UserAddOutlined />}
          onClick={() => {
            setIsAddUserModalOpen(true);
            setRecord(null);
          }}
          className="addBtn"
        >
          Add User
        </Button>
        <div className="table-wrapper">
          <Table
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  setIsAddUserModalOpen(true);
                  setRecord(record);
                },
              };
            }}
            columns={columns}
            dataSource={users || []}
            bordered
            size="large"
          />
        </div>
      </Container>
      {isAddUserModalOpen && (
        <UserModal
          record={record}
          onCancel={() => setIsAddUserModalOpen(false)}
          open={isAddUserModalOpen}
        />
      )}
    </>
  );
};

export default UserTable;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .addBtn {
    align-self: end;
  }
`;
