import React from "react";
import { useNavigate } from "react-router-dom";
import { Pill } from "../../components/Pill";

import { createDocUrl, PATHS } from "../../constant/Path";
import { BaseTIL, FullTIL } from "../../types";

const Home = () => {

  const navigate = useNavigate();

  const [tils, setTils] = React.useState<null | BaseTIL[]>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    fetch(`${PATHS.DOCS}?page=${pageNumber}`)
      .then(res => res.json())
      .then(res => {
        const tils: BaseTIL[] = (res as FullTIL[]).map(til => ({
          id: til.id,
          date_created: new Date(til.date_created),
          title: til.title,
          tags: til.tags
        }));

        setTils(tils);
      })
      .catch(e => console.log(e))
  }, [pageNumber])

  return (
    <>
      <div className="h-96 bg-red-200 flex flex-col justify-center items-center">
          <h1>Welcome to the TIL App</h1>
          <h2 className="text-base">Browse below for your TIL entries</h2>
          <div className='flex flex-row justify-center'>
            <a href="#entries" className="bg-red-700 border-none p-4 rounded m-2 text-white w-40 text-lg no-underline text-center">
              TIL Entries
            </a>
            <a href="/add/til" className="bg-red-700 border-none p-4 rounded m-2 text-white w-40 text-lg no-underline text-center">
              Create Entry
            </a>
          </div>
      </div>
      <div id='entries' className="w-9/12 mx-auto py-8">
        {tils && tils.length > 0 && (
          tils.map((til, idx) => (
            <div 
              key={`til-${idx}`} 
              className="w-full px-4 py-8 mb-4 h-36 bg-blue-200 rounded border-4 border-white flex flex-row justify-between items-center"
              onClick={() => navigate(`/til/${til.id}`)}
            >
              <div>
                <h1>{til.title}</h1>
                <div className='flex flex-row'>
                  {til.tags.map((tag, idx) => (
                    <div key={`tag-${idx}`} className='mr-2'><Pill text={tag}/></div>
                  ))}
                </div>
              </div>
              <div>{til.date_created.toDateString()}</div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Home;