import axios from "axios";
import React, { useEffect, useState } from 'react';
const Section = () => {
  const [cardsData, setCardsData] = useState([]);
  const [limit, setlimit]  = useState(10); 
  const [page, setpage] = useState(1);
  const [search, setsearch] =useState("");

  async function fetchData() {
    const {data} = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
    console.log(data.products);
    setCardsData(data.products);
  }

  async function searchData() {
    const {data} = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
    console.log(data.products);
    setCardsData(data.products);
  }
  useEffect(() =>{
    fetchData();
  }, [page,limit]);

  return (
   <>
    <div className="container">
    <div className="flex-row">
  <input
    type="text"
    className="input"
    value={search}
    onChange={(e) => setsearch(e.target.value)} // Note: corrected `setsearch` to `setSearch` for camelCase consistency
  />
  <div
    onClick={() => {
      if (search.trim() !== "" && search.length>3) {
        searchData();
      } 
    }}
  >
    Search
  </div>
</div>


        <div className='Main-card'>
            {cardsData.map((item,idx) => (
              <div className='card' key={idx + "card"}>       
            <img src={item.thumbnail} alt="" />
            <h1 className='heading'>{item.title.slice (0,14)}</h1>
            <div className='content'>{item.description.slice (0,124)}</div>
          </div>
          ))}
        </div>
        {! search && (

          <div className="flex-row">
              <div onClick={() => page > 1 && setpage(page - 1)}>page-</div>
              <div>{page}</div>
              <div onClick={() => setpage(page + 1)}>page+</div>

              <div>
                <select onChange={(e) => setlimit(e.target.value)}>
                  <option>select limit</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>
            )}
    </div>
  </>
    );
};

export default Section