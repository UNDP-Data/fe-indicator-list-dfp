/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  data: any;
  ss: string;
  search?: string;
  WAFilter: boolean;
}

export function ListEl(props: Props) {
  const { data, ss, search, WAFilter } = props;
  const dataFilteredBySS =
    ss === 'All Signature Solutions'
      ? data
      : data.filter((d: any) => d.SignatureSolution.indexOf(ss) !== -1);
  const dataFilteredByWA = !WAFilter
    ? dataFilteredBySS
    : dataFilteredBySS.filter((d: any) => d.aggregatedAtWorld);
  const dataFilteredBySearch = !search
    ? dataFilteredByWA
    : dataFilteredByWA.filter((d: any) =>
        d.IndicatorLabelTable.toLowerCase().includes(search.toLowerCase()),
      );
  return (
    <div>
      <h5 className='undp-typography'>
        All Indicators ({dataFilteredBySearch.length})
      </h5>
      {dataFilteredBySearch.map((d: any, i: number) => (
        <div
          key={i}
          className='margin-bottom-07'
          style={{ width: '100%', backgroundColor: 'var(--gray-200)' }}
        >
          <div style={{ padding: 'var(--spacing-09)' }}>
            <h6 className='undp-typography'>{d.IndicatorLabelTable}</h6>
            <p className='undp-typography'>{d.IndicatorDescription}</p>
            <div className='margin-top-07'>
              <h6 className='undp-typography'>Signature Solutions</h6>
              <div className='flex-div flex-wrap'>
                {d.SignatureSolution.length > 0 ? (
                  <>
                    {d.SignatureSolution.map((el: string, j: number) => (
                      <div className='undp-chip' key={j}>
                        {el}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className='undp-typography'>
                    No Signature Solution attached
                  </p>
                )}
              </div>
            </div>
            <div className='margin-top-07'>
              <h6 className='undp-typography'>Viva Topics</h6>
              <div className='flex-div flex-wrap'>
                {d.SSTopics.length > 0 ? (
                  <>
                    {d.SSTopics.map((el: string, j: number) => (
                      <div className='undp-chip' key={j}>
                        {el}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className='undp-typography'>No Viva Topics attached</p>
                )}
              </div>
            </div>
            <div className='margin-top-09'>
              <h6 className='undp-typography margin-bottom-00'>Source</h6>
              <a href={d.DataSourceLink} className='undp-typography undp-style'>
                {d.DataSourceName}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
