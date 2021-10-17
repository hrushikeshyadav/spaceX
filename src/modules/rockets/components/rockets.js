import React from 'react';
import { Card, Col, Row, Badge } from 'antd';
import { Spin, Space } from 'antd';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { ALL_ROCKETS } from '../graphql/query';
import '../rocket.css';

const Rockets = () => {
  const history = useHistory();

  const { loading, error, data = {} } = useQuery(ALL_ROCKETS);
  if (loading)
    return (
      <Space className='loading-gif' size='middle'>
        <Spin size='large' />
      </Space>
    );

  if (error) return <p>{error}</p>;

  const { rockets = [] } = data;

  return (
    <div>
      <h1>All Rockets</h1>
      {rockets.map(({ name = '', active = '', id = '', country = '' }) => (
        <div
          className='site-card-wrapper'
          onClick={() => history.push(`/rockets/${id}`)}
          key={id}
        >
          <Row>
            <Col>
              <Card hoverable title={name} bordered className='cardrockets'>
                <p>
                  {active ? (
                    <Badge status='success' text='Active' />
                  ) : (
                    <Badge status='error' text='Not Active' />
                  )}
                </p>

                <p>
                  Country : <span>{country}</span>
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
