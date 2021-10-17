import React from 'react';
import _ from 'lodash';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import { LAUNCH_DETAILS } from '../modules/launches/graphql/query';
import { ROCKET_DETAILS } from '../modules/rockets/graphql/query';
import { USER_DETAILS } from '../modules/users/graphql/query';
import './components.css';

const BreadCrumb = () => {
  let location = useLocation();
  let location_data = location.pathname.split('/');
  let data = location_data;
  data.splice(0, 1);
  localStorage.setItem('routes', data[0]);
  let nameToReplaceId = '';

  let hrefRoutes = [];
  for (let i = 0; i < data.length; i++) {
    hrefRoutes.push(_.join(_.slice(data, 0, i + 1), '/'));
  }

  if ((data[0] === 'launches' || data[0] === 'upcominglaunches') && data[1]) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: launchData = {} } = useQuery(LAUNCH_DETAILS, {
      variables: { id: data[1] },
    });
    if (launchData) {
      const { launch: { mission_name = '' } = {} } = launchData;
      nameToReplaceId = mission_name;
    }
  } else if (data[0] === 'rockets' && data[1]) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: rocketData = {} } = useQuery(ROCKET_DETAILS, {
      variables: { id: data[1] },
    });
    if (rocketData) {
      const { rocket: { name = '' } = {} } = rocketData;
      nameToReplaceId = name;
    }
  } else if (data[0] === 'users' && data[1]) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: userData } = useQuery(USER_DETAILS, {
      variables: {
        where: {
          id: {
            _eq: data[1],
          },
        },
      },
    });
    if (userData) {
      const { users = [] } = userData;
      const [{ name = '' } = {}] = users;
      nameToReplaceId = name;
    }
  }

  return (
    <Breadcrumb className='breadcrumb'>
      <Breadcrumb.Item>
        <a href={`/`}>{`Home`}</a>
      </Breadcrumb.Item>

      {data.map((route, i) => (
        <Breadcrumb.Item key={route} href={`/${hrefRoutes[i]}`}>
          {i === 1 && route !== 'create'
            ? route.replace(route, nameToReplaceId)
            : _.capitalize(route)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
