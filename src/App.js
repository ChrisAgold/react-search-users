import LingUsers from './leaderboard.json';
import {useState} from 'react';

// SORTED USERS ARRAY
const sortedArray = Object.entries(LingUsers).sort((a, b) => {
  return b[1].bananas - a[1].bananas
})

//Array of top 10
const displayArray = [];
sortedArray.slice([0], [10]).map((item, i) => {
  return displayArray.push(item);
});

function App() {
  const [topTenState, setTopTenState] = useState(displayArray)
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(["", {
    "bananas": 0,
    "lastDayPlayed": "", "longestStreak": 0,
    "name": "",
    "stars": 0,
    "subscribed": false,
    "uid": ""
  }])

  return (
      <div style={{
        backgroundColor: '#fffdd0',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
      }}>

        <div>
          <div style={{
            fontWeight: 'bold',
            padding: '20',
            fontSize: '20px',
            marginBottom: 20,
          }}>Current User: {currentUser[1].name} </div>
          <form>
            <label style={{
              fontWeight: 'bold',
              padding: '20',
              fontSize: '15px',
              marginBottom: 20,
            }}>
              Enter User UID:
              <div style={{
                fontWeight: 'bold',
                padding: '20',
                fontSize: '15px',
                marginBottom: 20,
              }}>
                <input type="text" name="name" onChange={event => {
                  setSearchTerm(event.target.value);
                }} placeholder="Enter UID"/>
              </div>
            </label>
          </form>
          {searchTerm !== "" &&
          <div style={{width: '50%', height:100,borderRadius: 10, padding: 10, backgroundColor: '#e6e6e6',overflowY:'scroll'}}>
            {sortedArray.map((user) => {
              const displayResults = []
              if (user[1].uid.includes(searchTerm) && searchTerm !== "") {
                displayResults.push(<div onClick={() => {
                  if (sortedArray.indexOf(user) > 10) {
                    setTopTenState(current => {
                      current.pop();
                      current.push(user)
                      return current;
                    })
                  } else {
                    if (sortedArray.indexOf(topTenState[9]) > 10) {
                      setTopTenState(current => {
                        current.pop();
                        current.push(sortedArray[9])
                        return current;
                      })
                    }}
                  setSearchTerm('')
                  setCurrentUser(user)
                }}>
                  {user[1].name}</div>)
              }
              return displayResults
            })}
          </div>}
          <table style={{
            padding: '20px',
            borderSpacing:'0 15px',
            backgroundColor: 'pink',
            width:'500px',
            height:'50px',
          }}>
            <tr>
              <th>Name</th>
              <th>Bananas</th>
              <th>Rank</th>
              <th>Is User</th>
            </tr>
            {topTenState.map((user) => {
              return (
                  <tr onClick={() => {
                    setCurrentUser(user)
                  }} style={{backgroundColor: user[1].uid === currentUser[1].uid ? 'lightblue' : null}}>
                    <td>{user[1].name !== '' ? user[1].name : 'NAME NOT PROVIDED'}</td>
                    <td>{user[1].bananas}</td>
                    <td>{sortedArray.indexOf(user) + 1}</td>
                    <td>{user[1].uid === currentUser[1].uid ? "Yes" : 'No'}</td>
                  </tr>
              )
            })}
          </table>
        </div>
      </div>);
}

export default App;
