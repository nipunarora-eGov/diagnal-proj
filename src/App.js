import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from './components/Loader';
import { Card } from './components/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/Header';

const fetchFn = (page) => {
  return fetch(`https://test.create.diagnal.com/data/page${page}.json`).then(
    (res) => res.json()
  );
};

const App = () => {
  const [cardData, setCardData] = useState([]);
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('Search...');

  //calling a hook to handle infinite scroll's pagination
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ['diagnal-images'],

    ({ pageParam = 1 }) => fetchFn(pageParam),

    {
      getNextPageParam: (lastPage) => {
        //here write the logic for next pageParam
        //if data is available to fetch for next page then return pageParam
        //otherwise return false so that it doesn't make another api call

        const requestedPage = parseInt(lastPage?.page?.['page-num-requested']);
        const pageSizeRequested = parseInt(
          lastPage?.page?.['page-size-requested']
        );
        const totalCount = parseInt(lastPage?.page?.['total-content-items']);

        //we can calculate the total no of pages and current page then compare both
        const totalPages = parseInt(Math.ceil(totalCount / pageSizeRequested));
        if (requestedPage < totalPages) return requestedPage + 1;

        return false;
      },
      select: (data) => {
        return data;
      },
    }
  );

  //an effect to update the cardData state with consolidated data from multiple pages
  useEffect(() => {
    if (data) {
      setTitle(data?.pages?.[0]?.page?.title);
      const finalResult = [];
      data?.pages.forEach((page, idx, arr) => {
        finalResult.push(...page.page['content-items'].content);
      });
      setCardData(() => finalResult);
    }
  }, [data]);

  //filter which images to render according to the query
  const filterData = (card) => {
    const searchTerm = query.toLowerCase();
    const itemValue = card.name.toLowerCase();
    return itemValue.includes(searchTerm);
  };

  const onBackButtonClick = (e) => {
    // console.log(e.target.value);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  //loading state
  if (status === 'loading') return <Loader />;

  //error state
  if (status === 'error') return <h4>Oops!, {`${error}`}</h4>;

  return (
    <div className="titillium-web-regular">
      <Header
        onBackButtonClick={onBackButtonClick}
        handleInputChange={handleInputChange}
        defaultText={title}
        setQuery={setQuery}
      />

      <div className="infinite-scroll-container">
        {cardData?.length > 0 && (
          <InfiniteScroll
            dataLength={
              cardData ? cardData.filter((card) => filterData(card)).length : 0
            }
            next={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            loader={<Loader />}
            scrollThreshold={0.5}
          >
            <div className="grid-container">
              {cardData &&
                cardData
                  .filter((card) => filterData(card))
                  .map((card, idx, arr) => (
                    <Card
                      key={idx}
                      cardData={{
                        ...card,
                        imageUrl: `https://test.create.diagnal.com/images/${card?.['poster-image']}`,
                      }}
                    />
                  ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default App;
