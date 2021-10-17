import React from 'react';
import { Card, Col, Row } from 'antd';
import { Spin, Space } from 'antd';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../../common/utils';
import { ALL_LAUNCHES } from '../graphql/query';
import '../launches.css';

const Launches = () => {
  const history = useHistory();
  const { loading, error, data = {} } = useQuery(ALL_LAUNCHES);

  if (loading)
    return (
      <Space className='loading-gif' size='middle'>
        <Spin size='large' />
      </Space>
    );

  if (error) return <p>{error}</p>;

  const { launches = [] } = data;

  return (
    <div>
      <h1>All Launches</h1>
      {launches.map(({ mission_name = '', launch_date_utc = '', id = '' }) => (
        <div
          className='site-card-wrapper-launches'
          onClick={() => {
            history.push(`/launches/${id}`);
          }}
          key={mission_name}
        >
          <Row>
            <Col>
              <Card
                hoverable
                bordered
                className='cardlaunches'
                title={mission_name}
              >
                {launch_date_utc ? formatDate(launch_date_utc) : '-'}
              </Card>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Launches;
