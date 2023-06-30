import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { react } from '@babel/types';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);

  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearch] = React.useState('');
  const [success, setSuccess] = React.useState(false); 


  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
    }).catch(err => {
      console.warn(err);
      alert('Error!!!');
    })
    .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) =>{
    setSearch(event.target.value);
  }

  const onClickSendInvies = () =>{
    setSuccess(true);
  }

  const onClickInvite = (id) =>{
    if (invites.includes(id)){
      setInvites((prev) => prev.filter(_id => _id != id ));
    }
    else {
      setInvites((prev) => [...prev, id]);
    }
  }

  return (
    <div className="App">
      {success ? 
        <Success count = {invites.length} />
      : 
        <Users
          onClickSendInvies = {onClickSendInvies} 
          onChangeSearchValue = {onChangeSearchValue}
          searchValue = {searchValue} 
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
        />
      }
      
    </div>
  );
}

export default App;
