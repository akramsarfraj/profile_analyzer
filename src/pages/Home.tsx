import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import RepoList from './RepoList'
import ProfileCard from './ProfileCard'
import { useState } from 'react'
import axios from 'axios'
import CommitChat from './CommitChat'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ErrorPage from './ErrorPage'




function Home() {
  let [username, setUserName] = useState("");
  let [status,setStatus] = useState<number>(0)

  let [data, setData] = useState({
    "login": "",
    "name": "",
    "avatar_url": "",
    "public_repos": 0,
    "followers": 0,
    "following": 0,
    "html_url": "",
    "repos_url": ""
  })

  let handleSubmit = () => {

    axios.get(`https://api.github.com/users/${username}`)
      .then((res) => {
        setStatus(res.status)
        setData(res.data);
      })
      .catch((err) => {
        setStatus(err.response.status)
        setData({...data,login:""})
        console.log(err);

      })
  }

  console.log(status);
  console.log(data.login);
  

  return (
    <div className='home'>

      <div className='w-auto pt-10 flex justify-center gap-2 '>
        <Input type='text' className='w-100' placeholder='Username' value={username} onChange={(e) => {
          setUserName(e.target.value)
        }} />
        <Button onClick={handleSubmit}>search</Button>
      </div>

      
        
      { status ===404 || status ===403 ? <>
          <ErrorPage/>
        </>: 
        data.login === ""?
                <div className='p-20 '>
                  <Card className='h-100 flex justify-center mt-10'>
                    <CardHeader className='flex flex-col items-center'>
                      <CardTitle className='animate-pulse'>GITHUB PROFILE ANALYZER</CardTitle>
                      <CardDescription>
                        Enter the the username to show list of public repositories
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
        :<></>        

      }


      <div className='flex  gap-10'>
        {
          data.login === "" ? <p></p> : <>
            <ProfileCard detail={data} />
            <RepoList repo={data.repos_url} />

          </>

        }


      </div>
      {
        data.login === "" ? <></> :
          <> <CommitChat user={data.login} /></>
      }
    </div>
  )
}

export default Home