import React from 'react';
import {Collection} from './Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [collection, setCollection] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId !== 0 ? `category=${categoryId}` : '' ;
    const pageIndex = `page=${page}`;

    fetch(`https://649fcbaded3c41bdd7a6b256.mockapi.io/gallary?${pageIndex}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollection(json);
    })
    .catch((err) => {
      console.warn(err);
      alert('Error Data!!!')
    }).finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map(
              (obj, index) => <li onClick={() => setCategoryId(index)} key={obj.name} className={categoryId === index ? 'active' : ''}>{obj.name}</li>
            )
          }
        </ul>
        <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? 
          <h2>LOADING...</h2>
          :
          collection.filter((obj) => obj.name.toLowerCase().includes(searchVal.toLowerCase())).map((obj, index) => (
            <Collection
              key = {index}
              name = {obj.name}
              images = {obj.photos}
            />
          )) 
        }
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, index) => <li className={page === index + 1 ? 'active' : ''} onClick={() => setPage(index+1)} >{index+1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
