/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { json } from 'd3-request';
import { queue } from 'd3-queue';
import { ListEl } from './ListEl';

const ssList = [
  'Environment',
  'Energy',
  'Gender',
  'Governance',
  'Poverty and Inequality',
  'Resilience',
];

export function DataList() {
  const [indicators, setIndicators] = useState<any>(undefined);
  const [selectedSS, setSelectedSS] = useState<string>(
    'All Signature Solutions',
  );
  const [WAFilter, setWAFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);
  const [searchFilter, setSearchFilter] = useState<undefined | string>(
    undefined,
  );
  useEffect(() => {
    queue()
      .defer(
        json,
        'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign/indicatorMetaData.json',
      )
      .defer(
        json,
        'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/regionData/WLD.json',
      )
      .await((_err: any, data: any, wData: any) => {
        const dWithWorld = data.map((d: any) => {
          const aggregatedAtWorld =
            wData.indicators.findIndex(
              (el: any) => el.indicator === d.DataKey,
            ) !== -1;
          return { ...d, aggregatedAtWorld };
        });
        setIndicators(dWithWorld);
      });
  }, []);
  return (
    <div>
      {!indicators ? (
        <div
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: 'var(--gray-100)',
            paddingTop: '180px',
            minHeight: 'calc(100vh - 470px)',
          }}
        >
          <div className='undp-loader' style={{ margin: 'auto' }} />
        </div>
      ) : (
        <div className='max-width margin-top-07'>
          <div
            className='flex-div flex-vert-align-center'
            style={{ justifyContent: 'space-between' }}
          >
            <h2 className='undp-typography margin-top-00 margin-bottom-00'>
              Indicator List on Data Futures Platform
            </h2>
          </div>
          <div className='max-width-1440'>
            <div
              className='flex-div flex-wrap margin-top-07'
              style={{ alignItems: 'flex-end' }}
            >
              <div
                style={{
                  width: 'calc(33.33% - 0.67rem)',
                  minWidth: '15rem',
                }}
              >
                <p className='undp-typography label'>
                  Filter by Signature Solutions
                </p>
                <Select
                  className='undp-select'
                  defaultValue='All Goals'
                  value={selectedSS}
                  showSearch
                  allowClear
                  onChange={e => {
                    const val = e ? `${e}` : 'All Signature Solutions';
                    setSelectedSS(val);
                  }}
                  clearIcon={<div className='clearIcon' />}
                >
                  {ssList.map((d, i) => (
                    <Select.Option
                      className='undp-select-option'
                      value={d}
                      key={i}
                    >
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className='margin-bottom-05'>
                <Checkbox
                  className='undp-checkbox'
                  checked={WAFilter}
                  onChange={e => {
                    setWAFilter(e.target.checked);
                  }}
                >
                  Only show indicator with world aggregate
                </Checkbox>
              </div>
            </div>
            <div className='margin-top-07 flex-div margin-bottom-07'>
              <Input
                placeholder='Search for a signal'
                className='undp-input'
                size='large'
                value={searchQuery}
                onChange={d => {
                  setSearchQuery(d.target.value);
                }}
                onPressEnter={() => {
                  setSearchFilter(searchQuery);
                }}
                style={{ flexShrink: 1, flexGrow: 1 }}
              />
              <button
                type='button'
                className='undp-button button-secondary'
                onClick={() => {
                  setSearchFilter(searchQuery);
                }}
                style={{ flexShrink: 0, flexGrow: 0 }}
              >
                Search
              </button>
            </div>
            <ListEl
              data={indicators}
              ss={selectedSS}
              search={searchFilter}
              WAFilter={WAFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
}
