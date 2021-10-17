import React from 'react';
import { Spin, Space } from 'antd';
import { Card, Col, Row } from 'antd';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { formatDate } from '../../../common/utils'
import { UPCOMING_LAUNCHES } from '../graphql/query';
import '../home.css';

const UPCOMING = () => {
  const history = useHistory();
  const { loading, data = {}, error } = useQuery(UPCOMING_LAUNCHES);

  if (loading)
    return (
      <Space className='loading-gif' size='middle'>
        <Spin size='large' />
      </Space>
    );

  if (error) return <p>{error}</p>;

  const { launchesUpcoming = [] } = data;

  return (
    <div>
      <h1>Upcoming Launches</h1>
      {launchesUpcoming.map(
        ({
          mission_name = '',
          launch_date_local = '',
          launch_site: { site_name_long = '' } = {},
          id = '',
        }) => (
          <div
            className='site-card-wrapper '
            onClick={() => {
              history.push(`/upcominglaunches/${id}`);
            }}
            key={id}
          >
            <Row>
              <Col>
                <Card
                  hoverable
                  className='cardhome'
                  title={`Mission name : ${mission_name}`}
                >
                  <p>
                    {launch_date_local ? formatDate(launch_date_local) : '-'}
                  </p>
                  <p>{site_name_long}</p>
                </Card>
              </Col>
            </Row>
          </div>
        )
      )}
    </div>
  );
};

export default UPCOMING;
