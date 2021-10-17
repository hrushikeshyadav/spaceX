import React, { useContext, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Space, Input } from 'antd';
import { Popconfirm, message, Pagination } from 'antd';
import { Button } from 'antd';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { USER, SEARCH_FILTER, USER_COUNT } from '../graphql/query';
import { DELETE_USER } from '../graphql/mutation';
// import { USER_SUBSCRIPTION } from '../graphql/subscription';
import { AppContext } from '../../../AppContext';
import '../user.css';

let count = 0;

const User = () => {
  const { state, dispatch } = useContext(AppContext);
  console.log(state);
  const history = useHistory();
  const [offset, setOffSet] = useState(0);
  const [limit, setLimit] = useState(state.recordPerPage);

  const { loading, error, data = {}, fetchMore } = useQuery(USER, {
    fetchPolicy: 'network-only',
    variables: {
      offset: offset,
      limit: limit,
    },
  });

  // subscribeToMore({
  //   document: USER_SUBSCRIPTION,
  //   updateQuery: (prev, { subscriptionData }) => {
  //     if (!subscriptionData.data) return prev;
  //     const newUserItem = subscriptionData.data.users;
  //     console.log(newUserItem);
  //     return Object.assign({}, prev, {
  //       users: [newUserItem, users],
  //     });
  //   },
  // });

  const { data: totaluser, loading: countloading, refetch } = useQuery(
    USER_COUNT
  );
  const [userid, setUserid] = useState();
  const [searchText, setSearchText] = useState('');

  const [
    delete_user,
    { data: deleteData, loading: deleteLoading },
  ] = useMutation(DELETE_USER, {
    variables: {
      where: {
        id: {
          _eq: userid,
        },
      },
    },
    refetchQueries: [
      {
        query: USER,
      },
    ],
  });

  useEffect(() => {
    if (deleteData) {
      refetch();
    }
  }, [deleteData, deleteLoading, refetch]);

  const [
    executeSearch,
    { data: searchdata = {}, loading: searchloading },
  ] = useLazyQuery(SEARCH_FILTER);

  if ((count === 0 && loading) || countloading) {
    count = count + 1;
    return (
      <Space className='loading-gif' size='middle'>
        <Spin size='large' />
      </Space>
    );
  }

  if (error) return <h2>Ooops...., something went wrong!!</h2>;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rocket',
      dataIndex: 'rocket',
      key: 'rocket',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  function confirm(e) {
    console.log(e);
    delete_user()
      .then(() => {
        message.success('User deleted');
      })
      .catch(() => {
        message.error('Something went wrong');
      });
  }

  function cancel(e) {
    console.log(e);
  }

  const { users: allUsers = [] } = data;
  if (allUsers) {
    var userdata = allUsers.map(({ id = '', name = '', rocket = '' }) => ({
      key: id,
      name: name,
      rocket: rocket,
      action: (
        <Space size='middle'>
          <Button onClick={() => history.push(`users/${id}/edit`)} type='link'>
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this User?'
            onConfirm={confirm}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button
              id={data.id}
              danger
              onClick={() => setUserid(id)}
              type='link'
              loading={deleteLoading && id === userid}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    }));
  }

  const { users: searchUsers = [] } = searchdata;

  if (searchUsers) {
    var usersearchdata = searchUsers.map(
      ({ id = '', name = '', rocket = '' }) => ({
        key: id,
        name: name,
        rocket: rocket,
        action: (
          <Space size='middle'>
            <Button
              onClick={() => history.push(`users/${id}/edit`)}
              type='link'
            >
              Edit
            </Button>

            <Popconfirm
              title='Are you sure to delete this User?'
              onConfirm={confirm}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              <Button
                onClick={() => setUserid(id)}
                type='link'
                loading={deleteLoading && id === userid}
                danger
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      })
    );
  }

  function searchBtnClick() {
    if (searchText) {
      executeSearch({
        variables: {
          where: {
            name: {
              _ilike: `${searchText}%`,
            },
          },
          offset: 0,
          limit: limit,
        },
      });
    }
  }

  function onPageChange(pageNumber) {
    setOffSet(limit * pageNumber - limit);
    fetchMore({
      variables: {
        offset: offset,
        limit: limit,
      },
    });
  }
  const onShowSizeChange = (_, pageSize) => {
    dispatch({ type: 'RECORD_PER_PAGE', page_size: pageSize });
    setLimit(pageSize);
  };

  if (totaluser) {
    var {
      users_aggregate: { aggregate: { count: userCount = '' } = {} } = {},
    } = totaluser;
  }
  if (searchdata) {
    var { users = '' } = searchdata;
  }

  return (
    <>
      <h1>User's List</h1>
      <div>
        <Button onClick={() => history.push('users/create')} type='primary'>
          Add User +
        </Button>
        <div className='rightfloat'>
          <div className='rightfloat'>
            <Button
              type='primary'
              onClick={searchBtnClick}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>
          <div className='rightfloat'>
            <Input
              placeholder='search'
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />

      <Table
        dataSource={searchText && usersearchdata ? usersearchdata : userdata}
        columns={columns}
        pagination={false}
        loading={searchloading || loading}
      />
      <Pagination
        showSizeChanger={!searchText}
        onShowSizeChange={onShowSizeChange}
        className='rightfloat'
        onChange={onPageChange}
        defaultPageSize={limit}
        defaultCurrent={1}
        total={users && searchText ? users.length : userCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </>
  );
};

export default User;
