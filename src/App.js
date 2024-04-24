import React, { useState, useEffect, useMemo } from 'react';
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

  const [cardData,setCardData] = useState([])
  const [filteredData,setFilteredData] = useState([])
  const [query,setQuery] = useState("")
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

  useEffect(() => {
    if(data){
      const finalResult = []
      data?.pages.forEach((page,idx,arr) => {
        finalResult.push(...page.page['content-items'].content)
      })
      setCardData(()=>finalResult)
      // setFilteredData(()=>finalResult)
    }
  }, [data])
  
  const filterData = (searchInput, key) => {
    if(searchInput==="") return
    // Convert search input to lowercase for case-insensitive matching
    const searchTerm = searchInput.toLowerCase();
    
    // Filter the data array based on the search input
    const filteredData = cardData.filter(item => {
      // Convert the value of the specified key to lowercase for comparison
      const itemValue = item[key].toString().toLowerCase();
      
      // Check if the item value contains the search term
      return itemValue.includes(searchTerm);
    });
    setFilteredData(filteredData)
  }
  

  useEffect(() => {
    filterData(query,"name")
  }, [query,data])

  const onBackButtonClick = (e) => {
    console.log(e.target.value);
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value,"name")
  }
  //loading state
  if (status === 'loading') return <Loader />;

  //error state
  if (status === 'error') return <h4>Ups!, {`${error}`}</h4>;

  return (
    <div>
      {/* <h1 className="title">Diagnal Scroll</h1> */}
      <Header onBackButtonClick={onBackButtonClick} handleInputChange={handleInputChange} />
      {cardData?.length > 0 && <InfiniteScroll
        dataLength={cardData ? cardData.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loader />}
      >
        <div className="grid-container">
          {cardData &&
            cardData.map((card,idx,arr) => (
              <Card key={idx} cardData={{...card,imageUrl:`https://test.create.diagnal.com/images/${card?.['poster-image']}`}}/>
            ))}
        </div>
      </InfiniteScroll>}
    </div>
  );
}

export default App;
