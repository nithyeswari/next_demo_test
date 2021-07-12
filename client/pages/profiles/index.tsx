
import styles from '../../styles/Home.module.css'
import { useQuery, NetworkStatus } from '@apollo/client';
import React, { Suspense, useState } from 'react';
import { search_query_infinite } from '../../query';
import Profiles from '../../components/profiles';
/* const Profiles = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
        () =>
            import('../../components/profiles')
    );
}
) */

const pagenationData = {
    limit: 3,
    offset: 0,
    currentpage: 0,
    totalCount: 0
}

export default function ProfilePage() {
    const [name, setName] = useState('');
    // const [currentOffset, setCurrentOffset] = useState(0); <-- pagination
    //const [getProfiles, { loading, data, error, fetchMore, networkStatus }] =
    //useLazyQuery(search_query_infinite, { <--lazy loading
    const { loading, data, error, fetchMore, networkStatus, refetch } =
        useQuery(search_query_infinite, {
            variables: { name, limit: 20, afterCursor: '' },
            // pollInterval: 3000,
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true
        });

    const loadingMore = networkStatus === NetworkStatus.fetchMore;
    const { datalist } = data?.profilesByNameConcat || {};
    const { hasNextPage, lastCursor } = data?.profilesByNameConcat.pageInfo || {};

    return (
        <div >
            <div className={styles.grid}>
                <span className={styles.description}>Search profile</span>
                <p> <input name="name" type='search' data-cy="name" onChange={(x) => {
                    setName(x.currentTarget.value);
                    refetch({
                        name: x.currentTarget.value,
                        afterCursor: ''
                    })
                }}
                    placeholder='Enter name to search' className={styles.input}>
                </input></p>

            </div>
            <div className={styles.grid}>
                {
                    (loadingMore || loading) && <p>Loading...</p>

                }
                {
                    error && <p> <h3>{error.message}...</h3></p>

                }
            </div> 
            {
                !error &&
                <>
                    {/*  <Suspense fallback={<div className={styles.grid}>Loading (profiles)...</div>}> */}
                    <Profiles data={datalist} name={name}></Profiles>
                    {hasNextPage &&
                        <div className={styles.grid}>
                            <button className={styles.button} onClick={() => {
                                fetchMore({
                                    variables: {
                                        afterCursor: lastCursor
                                    }
                                })
                            }}>{loadingMore ? 'Loading..' : 'Load more'}</button>
                        </div>
                    }
                    {/*  </Suspense> */}
                </>
            }

        </div>
    )
}


