import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Spin, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { USER, USER_DETAILS } from '../graphql/query';
import { EDIT_USER, CREATE_USER } from '../graphql/mutation';
import '../user.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const EditUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const [userName, setUserName] = useState();
  const [rocketName, setRocketName] = useState();

  const { loading, error, data = {} } = useQuery(USER_DETAILS, {
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  });
  const [update_users, { data: updData, loading: updLoading }] = useMutation(
    EDIT_USER,
    {
      variables: {
        where: {
          id: {
            _eq: id,
          },
        },
        _set: {
          name: userName,
          rocket: rocketName,
        },
      },
      refetchQueries: [
        {
          query: USER,
        },
      ],
    }
  );
  const [insert_users, { data: insData, loading: insLoading }] = useMutation(
    CREATE_USER,
    {
      variables: {
        objects: {
          id: uuidv4(),
          name: userName,
          rocket: rocketName,
        },
      },
      refetchQueries: [
        {
          query: USER,
        },
      ],
    }
  );

  useEffect(() => {
    if (!insLoading && insData) {
      history.push('/users');
    } else if (!updLoading && updData) {
      history.push('/users');
    }
  }, [insLoading, insData, history, updLoading, updData]);

  if (loading)
    return (
      <Space className='loading-gif' size='middle'>
        <Spin size='large' />
      </Space>
    );
  if (error) return <p>{error}</p>;

  const onFinish = () => {
    id
      ? update_users().catch(() => {
          message.error('Something went wrong');
        })
      : insert_users().catch(() => {
          message.error('Something went wrong');
        });
  };

  const { users = [] } = data;
  const [{ name = '', rocket = '' } = {}] = users;
  
  return (
    <div className='form'>
      {id ? <h1>Update Details</h1> : <h1>Add User</h1>}
      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label='Name'
          initialValue={id ? name : ''}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            className='input'
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name={['user', 'rocket']}
          label='Rocket name'
          initialValue={id ? rocket : ''}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            className='input'
            onChange={(e) => setRocketName(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
          <Button
            type='primary'
            htmlType='submit'
            loading={insLoading || updLoading}
          >
            Save
          </Button>

          <Button
            onClick={() => {
              history.push('/users');
            }}
            htmlType='button'
            className='cancelButton'
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
