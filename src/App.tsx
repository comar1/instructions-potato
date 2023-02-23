import { useEffect, useState } from 'react'
import  axios  from 'axios'
import './App.css'

interface UserName {
  first: string;
  last: string;
  title: string;
}

interface UserPicture {
  thumbnail: string;
}

interface UserInfo {
  name: UserName;
  picture: UserPicture;
}

const fetchRandomdata = (): Promise<any> => {
  return axios.get('https://randomuser.me/api')
    .then(res => {
      //handle successful
      console.log(res);
      return res;
    })
    .catch((err) => {
      //handle error
      console.log("error");
    })
}

const getFullUserName = (userInfo: UserInfo) => {
  const {name: {first, last}} = userInfo;
  return `${first} ${last}`;
} 

function App() {
  const [count, setCount] = useState(0)
  const [userInfo, setUserInfo] = useState<any>([])
  const [randomUserData, setrandomUserData] = useState('');

  useEffect(() => {
    fetchRandomdata().then(randomData => {
      setrandomUserData(JSON.stringify(randomData, null, 2) || 'No user data found');
      setUserInfo(randomData.results);
    })
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{count}</p>
      <button onClick={() => {
        setCount(count + 1);
      }}>Increase Count</button>
    
      {/* {
        userInfo?.map((userInfo: UserInfo, idx: number) => (

          <div key={idx}>
            <p>{userInfo.name.first} {userInfo.name.last} </p>
            <img src={userInfo.picture.thumbnail}></img>
          </div>

        ))
      } */}
      <div>
        <p>{userInfo}</p>
      </div>
      <div>
        <button onClick={() => {
          fetchRandomdata();
        }}>fetchRandomdata</button> 
      </div>
      <div>
        <pre style={{color:"red"}}>{randomUserData}</pre>
      </div>
    </div>
  )

}

export default App
