
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { memo } from 'react';

interface PropsType{
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  repos_url: string;
}

function ProfileCard({detail}: {detail: PropsType }) {
  
  
  return (
    <div className='w-150 p-8 '>
        <Card className='h-140'>
          <CardHeader className='m-10'>
            <CardTitle>GitHub Profile</CardTitle>
            <CardDescription className='flex items-center gap-2'>
             <img className='h-10 rounded-4xl' src={detail.avatar_url} />
             <h2>
              <span className='font-bold'> {detail.name}</span>
             
                <br/> 
              {detail.login}
             </h2>
            </CardDescription>
          </CardHeader>
          <CardContent className='m-10'>
            <p>No of public repos :<span className='text-blue-500'> {detail.public_repos} </span> </p>
            <p>Follower : {detail.followers}</p>
            <p>Following: {detail.following}</p>
          </CardContent>
          <CardFooter className='ml-10'>
            <a href={detail.html_url} target='_blank' className='text-blue-500'>🚀 {detail.html_url}</a>
          </CardFooter>
        </Card>
    </div>
  )
}

export default memo(ProfileCard)