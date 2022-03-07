import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Pill } from '../../components/Pill';

import { PATHS } from '../../constant/Path';
import { BaseTIL, FullTIL } from '../../types';

const Home = () => {
  const navigate = useNavigate();

  const [tils, setTils] = React.useState<null | BaseTIL[]>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const isFirstPage = pageNumber === 1;
  const hasNextPage = tils?.length === 30;

  React.useEffect(() => {
    fetch(`${PATHS.DOCS}?page=${pageNumber}`)
      .then((res) => res.json())
      .then((res) => {
        const tils: BaseTIL[] = (res as FullTIL[]).map((til) => ({
          id: til.id,
          date_created: new Date(til.date_created),
          title: til.title,
          tags: til.tags,
        }));

        setTils(tils);
      })
      .catch((e) => console.log(e));
  }, [pageNumber]);

  return (
    <>
      <Navbar />
      <div className="h-96 bg-sky-900 flex flex-col justify-center items-center text-white">
        <h1>Welcome to the TIL App</h1>
        <h2 className="text-base">Browse below for your TIL entries</h2>
        <div className="flex flex-row justify-center">
          <a
            href="#entries"
            className="bg-sky-400 border-none p-4 rounded text-black m-2 w-40 text-lg no-underline text-center"
          >
            TIL Entries
          </a>
          <a
            href="/add/til"
            className="bg-sky-400 border-none p-4 rounded text-black m-2 w-40 text-lg no-underline text-center"
          >
            Create Entry
          </a>
        </div>
      </div>
      <div id="entries" className="w-9/12 mx-auto py-8 text-black">
        {tils && tils.length > 0 && (
          <table className="w-full text-white my-2">
            <thead className="h-16 bg-sky-500">
              <tr>
                <th className="w-3/6">Title</th>
                <th className="w-2/6">Tags</th>
                <th className="w-1/6">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {tils.map((til) => (
                <tr
                  onClick={() => navigate(`/til/${til.id}`)}
                  key={til.id}
                  className="h-12 bg-slate-300 text-sky-900 hover:cursor-pointer"
                >
                  <td className="px-2">{til.title}</td>
                  <td className="px-2">
                    {
                      <div className="flex flex-row">
                        {til.tags.map((tag, index) => (
                          <div key={`tag-${index}`} className="text-white mr-1">
                            <Pill text={tag} />
                          </div>
                        ))}
                      </div>
                    }
                  </td>
                  <td className="px-2">{til.date_created.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tils !== null && (
          <div className="flex flex-row justify-between">
            <div
              className={classNames(
                'w-8 h-8',
                isFirstPage ? 'text-gray-300' : 'hover:cursor-pointer'
              )}
              onClick={() => {
                if (!isFirstPage) {
                  setPageNumber((prevPage) => prevPage - 1);
                }
              }}
            >
              <ChevronDoubleLeftIcon />
            </div>
            <div
              className={classNames(
                'w-8 h-8',
                hasNextPage ? 'hover:cursor-pointer' : 'text-gray-300'
              )}
              onClick={() => {
                if (hasNextPage) {
                  setPageNumber((prevPage) => prevPage + 1);
                }
              }}
            >
              <ChevronDoubleRightIcon />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
