import React from 'react';
import { Descriptions, Badge } from 'antd';
import { Spin, Space } from 'antd';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ROCKET_DETAILS } from '../graphql/query';
import '../rocket.css';

const Rocket_details = () => {
  let { id } = useParams();

  const { loading, error, data = {} } = useQuery(ROCKET_DETAILS, {
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
    rocket: {
      name = '',
      engines: {
        layout = '',
        version = '',
        engine_loss_max = '',
        type = '',
        thrust_vacuum: { kN = '', lbf = '' } = {},
      } = {},
      description = '',
      active = '',
      boosters = '',
      company = '',
      cost_per_launch = '',
      country = '',
      diameter: { feet = '', meters = '' } = {},
      success_rate_pct = '',
      stages = '',
      landing_legs: { material = '', number = '' } = {},
      height: { feet: hfeet = '', meters: hmeters = '' } = {},
      mass: { kg = '', lb = '' } = {},
      first_stage: {
        burn_time_sec: f_burn_time_sec = '',
        fuel_amount_tons: f_fuel_amount_tons = '',
        engines: f_engines = '',
      } = {},
      second_stage: {
        fuel_amount_tons: s_fuel_amount_tons = '',
        burn_time_sec: s_burn_time_sec = '',
        engines: s_engines = '',
      } = {},
    } = {},
  } = data;

  return (
    <div>
      <h1>{name}</h1>
      <Descriptions
        className='description'
        title='Rocket Info'
        layout='vertical'
        bordered
      >
        <Descriptions.Item label='Rocket name'>
          {name ? name : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Rocket Company'>
          {company ? company : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Country'>
          {country ? country : '-'}
        </Descriptions.Item>

        <Descriptions.Item label='Height'>
          {hfeet ? hfeet : '-'} (feet) <br />
          {hmeters ? hmeters : '-'} (meters)
        </Descriptions.Item>
        <Descriptions.Item label='Mass'>
          {kg ? kg : '-'} (KG) <br />
          {lb ? lb : '-'} (LB)
        </Descriptions.Item>
        <Descriptions.Item label='Diameter'>
          {feet ? feet : '-'} (feet) <br />
          {meters ? meters : '-'} (meters)
        </Descriptions.Item>
        <Descriptions.Item label='Active status'>
          {active ? (
            <Badge status='success' text='Active' />
          ) : (
            <Badge status='error' text='Not Active' />
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Boosters'>
          {boosters ? boosters : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Stages'>
          {stages ? stages : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='First Stage'>
          Burn time sec: {f_burn_time_sec ? f_burn_time_sec : '-'}
          <br />
          Fuel amount tons: {f_fuel_amount_tons ? f_fuel_amount_tons : '-'}
          <br />
          Engines: {f_engines ? f_engines : '-'}
          <br />
        </Descriptions.Item>
        <Descriptions.Item label='Second Stage'>
          Burn time sec: {s_burn_time_sec ? s_burn_time_sec : '-'}
          <br />
          Fuel amount tons: {s_fuel_amount_tons ? s_fuel_amount_tons : '-'}
          <br />
          Engines: {s_engines ? s_engines : '-'}
          <br />
        </Descriptions.Item>
        <Descriptions.Item label='Engine info'>
          Layout: {layout ? layout : '-'}
          <br />
          Version: {version ? version : '-'}
          <br />
          Engine loss max: {engine_loss_max ? engine_loss_max : '-'}
          <br />
          Type: {type ? type : '-'}
          <br />
          Thrust vacuum: {kN ? kN : '-'} (kN) / {lbf ? lbf : '-'} (lbf)
          <br />
        </Descriptions.Item>

        <Descriptions.Item label='success rate pct'>
          {success_rate_pct ? success_rate_pct : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Cost per launch'>
          ${cost_per_launch ? cost_per_launch : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='landing legs'>
          Material: {material ? material : '-'}
          <br />
          Number: {number ? number : '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Description' span={3}>
          {description ? description : '-'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Rocket_details;
