import React from 'react';
import { Carousel } from 'antd';
import { Descriptions, Badge } from 'antd';
import { Spin, Space } from 'antd';
import { Image } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LAUNCH_DETAILS } from '../graphql/query';
import { formatDate } from '../../../common/utils';
import noImage from '../../../assets/images/noImage.png';
import '../launches.css';

const Launch_details = () => {
  let { id } = useParams();

  const { loading, error, data = {} } = useQuery(LAUNCH_DETAILS, {
    variables: { id },
  });

  if (loading)
    return (
      <Space className='loading-gif' size='middle'>
        <Spin size='large' />
      </Space>
    );
  if (error) return <p>{error}</p>;

  const {
    launch: {
      mission_name = '',
      links: { flickr_images = [] } = {},
      launch_site: { site_name = '', site_name_long = '' } = {},
      rocket: {
        rocket_name = '',
        rocket_type = '',
        rocket: {
          id: rocket_id = '',
          engines: { type = '', number = '', layout = '' } = {},
          company = '',
          cost_per_launch = '',
          country = '',
          height: { feet, meters } = {},
        } = {},
      } = {},
      tentative_max_precision = '',
      static_fire_date_unix = '',
      static_fire_date_utc = '',
      launch_year = '',
      launch_success = '',
      details = '',
      upcoming = '',
      launch_date_local = '',
      launch_date_utc = '',
    } = {},
  } = data;
  return (
    <div>
      <h1>{mission_name}</h1>
      {flickr_images.length > 0 ? (
        <Carousel autoplay>
          {flickr_images.map((flickr_image) => (
            <div>
              <h3 className='contentStyle'>
                <img alt='mission_img' height={500} src={flickr_image}></img>
              </h3>
            </div>
          ))}
        </Carousel>
      ) : (
        <Image
          className='noimage'
          src='error'
          height='400px'
          width='400px'
          fallback={noImage}
        />
      )}

      <br />
      <Descriptions
        className='description'
        title='Mission Info'
        layout='vertical'
        bordered
      >
        <Descriptions.Item label='Mission name'>
          {mission_name ? mission_name : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='launch date local'>
          {launch_date_local ? formatDate(launch_date_local) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='launch date utc'>
          {launch_date_utc ? formatDate(launch_date_utc) : '-'}
        </Descriptions.Item>

        <Descriptions.Item label='static fire date utc'>
          {static_fire_date_utc ? formatDate(static_fire_date_utc) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='static fire date unix'>
          {static_fire_date_unix ? formatDate(static_fire_date_unix) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='tentative max precision'>
          {tentative_max_precision ? tentative_max_precision : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Launch Upcoming:'>
          {upcoming ? (
            <Badge status='success' text='YES' />
          ) : (
            <Badge status='error' text='NO' />
          )}
        </Descriptions.Item>
        <Descriptions.Item label='launch year'>
          {launch_year ? launch_year : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='launch success'>
          {launch_success ? (
            <Badge status='success' text='Success' />
          ) : upcoming ? (
            <Badge status='warning' text='Yet to launch' />
          ) : (
            <Badge status='error' text='Fail' />
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Launch site'>
          Site name: {site_name ? site_name : '-'}
          <br />
          Site name (long): {site_name_long ? site_name_long : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Rocket Info' span={2}>
          Rocket name:{' '}
          <a href={`/rockets/${rocket_id}`}>
            {rocket_name ? rocket_name : '-'}
          </a>
          <br />
          Rocket type: {rocket_type ? rocket_type : '-'}
          <br />
          Company: {company ? company : '-'}
          <br />
          Cost per Launch: ${cost_per_launch ? cost_per_launch : '-'}
          <br />
          Country: {country ? country : '-'}
          <br />
          Rocket height: {feet ? feet : '-'}
          (feet) / {meters ? meters : '-'}
          (meters)
          <br />
          engine type: {type ? type : '-'}
          <br />
          engine number: {number ? number : '-'}
          <br />
          engine layout: {layout ? layout : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Details' span={3}>
          {details ? details : '-'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Launch_details;
