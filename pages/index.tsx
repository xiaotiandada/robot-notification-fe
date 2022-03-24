import type { NextPage } from 'next'
import useSWR from "swr";
import { useTitle } from 'ahooks';
import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatch'
import { decrement, increment } from 'state/counter/actions'
import { updateDarkMode } from 'state/global/actions'


// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export function Counter() {
  const count = useAppSelector(state => state.counter.value)
  const darkMode = useAppSelector(state => state.global.darkMode)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment(count + 1))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement(count - 1))}
        >
          Decrement
        </button>
      </div>

      <button onClick={() => dispatch(updateDarkMode({ darkMode: !darkMode }))}>DarkMode - {darkMode.toString()}</button>
    </div>
  )
}

const Home: NextPage = () => {
  useTitle('🤖️ Robot Notification');

  const { data, error } = useSWR<ApiType.MessageItem>(`${process.env.NEXT_PUBLIC_API}/messages`, fetcher)
  console.log('datta', data)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <section className='flex flex-col h-full'>
      <Counter />
      <div className="shadow-lg navbar bg-base-100">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost">
            🤖️ Robot Notification 
            <div className="ml-2.5 badge badge-secondary">{ data.meta.totalItems }</div>
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://avatars.githubusercontent.com/u/24250627?v=4" />
              </div>
            </label>
            <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a href='https://github.com/xiaotiandada' target="_blank" rel="noreferrer noopener">
                  Github
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a href='https://github.com/xiaotiandada/robot-notification-fe' target="_blank" rel="noreferrer noopener">
                  Robot notification FE
                </a>
              </li>
              <li>
                <a href='https://github.com/xiaotiandada/robot-notification' target="_blank" rel="noreferrer noopener">
                  Robot notification BE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main className='flex justify-center flex-1'>
        <section className="w-full text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="mb-20 text-center">
              <h1 className="mb-4 text-2xl font-medium text-center sm:text-3xl title-font">
                🤖️ Robot
              </h1>
              <p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4">All message content</p>
            </div>
            <div className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2 max-h-[1000px] overflow-auto">
              {
                data.data.map((i, idx) => (
                  <div className="w-full p-2 sm:w-1/1" key={idx}>
                    <div className="flex items-center h-full p-4 bg-gray-100 rounded">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="font-medium title-font">{ i.content }</span>
                      <time className="ml-auto text-sm font-normal" dateTime="20202">{i.createdAt}</time>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </main>
      <footer className="p-4 footer bg-base-300 text-base-content footer-center">
        <div>
          <p>Copyright © 2022 - All right reserved by xiaotian</p>
        </div>
      </footer>
    </section>
  )
}

export default Home
