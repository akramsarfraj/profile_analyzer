import { Card } from "@/components/ui/card"
import axios from "axios"
import { memo, useEffect, useState } from "react"

interface Rtype {
    "id": number;
    "name": string;
    "full_name": string;
    "description": string;
    "html_url": string;
    "language": string;
}


function RepoList({ repo }: { repo: string }) {

   


    let [repoList, setRepoList] = useState<Rtype[]>([])

    useEffect(() => {
        axios.get(repo)
            .then((res) => {
                setRepoList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        
    }, [repo])

   

    return (
        <div className=" h-140 mt-8 overflow-auto rounded-md  ">
            <Card className="p-3  ">
                {
                   repoList.map((k) => {
                        return (
                            <div key={k.id} >
                            
                            <div  className="flex justify-between items-center">
                                <div className="w-100">
                                    <h2 className="font-bold text-[18px] text-blue-500">{k.name}</h2>
                                    <p className="font-light">{k.full_name}</p>
                                    <p className="font-light">language : {k.language}</p>
                                </div>
                                <a href={k.html_url} className="text-blue-400 text-sm" target="_blank"> 🚀 {k.html_url}</a>
 
                            </div>
                            <hr className="mt-5"></hr>

                            </div>
                        )
                    })
                }



            </Card>
        </div>
    )
}

export default memo(RepoList)