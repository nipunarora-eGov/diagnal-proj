import React, { useState, useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from './components/Loader';
import { Card } from './components/Card';
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchFn = (page) => {
  return fetch(`https://test.create.diagnal.com/data/page${page}.json`).then(
    (res) => res.json()
  );
};

function App() {
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ['diagnal-images'],

    ({ pageParam = 1 }) => fetchFn(pageParam),

    {
      getNextPageParam: (lastPage) => {
        //here write the logic for next pageParam
        //if data is available to fetch for next page then return pageParam
        //otherwise return false so that it doesn't make another api call

        const requestedPage = lastPage?.page?.['page-num-requested'];
        const pageSizeRequested = lastPage?.page?.['page-size-requested'];
        const pageSizeReturned = lastPage?.page?.['page-size-returned'];
        const totalCount = lastPage?.page?.['total-content-items'];

        //we can calculate the total no of pages and current page then compare both
        const totalPages = parseInt(Math.ceil(totalCount / pageSizeRequested));
        if (requestedPage < totalPages) return parseInt(requestedPage) + 1;
        return false;
      },
      select: (data) => {
        return data;
      },
    }
  );

  const imageData = useMemo(
    () =>{
      const finalResult = []
      data?.pages.forEach((page,idx,arr) => {
        finalResult.push(...page.page['content-items'].content)
      })
      return finalResult
    },
    [data]
  );
debugger
  //loading state
  if (status === 'loading') return <Loader />;

  //error state
  if (status === 'error') return <h4>Ups!, {`${error}`}</h4>;

  return (
    <div>
      <h1 className="title">Diagnal Scroll</h1>

      {/* <div className="grid-container">
        {
          data && data?.pages[0].page?.["content-items"].content.map((card,idx,arr) => (
            <Card key={idx} cardData={{...card,imageUrl:`https://test.create.diagnal.com/images/${card?.['poster-image']}`}} />
          ))
        }
      </div> */}

      <InfiniteScroll
        dataLength={imageData ? imageData.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loader />}
      >
        <div className="grid-container">
          {imageData &&
            imageData.map((card,idx,arr) => (
              <Card key={idx} cardData={{...card,imageUrl:`https://test.create.diagnal.com/images/${card?.['poster-image']}`}}/>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
