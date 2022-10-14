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
    </div>
  )
}

const Home: NextPage = () => {
  const darkMode = useAppSelector(state => state.global.darkMode)
  const dispatch = useAppDispatch()

  useTitle('🤖️ Robot Notification');

  const { data, error } = useSWR<ApiType.MessageItem>(`${process.env.NEXT_PUBLIC_API}/messages`, fetcher)
  console.log('datta', data)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <section className='flex flex-col h-full'>
      {/* <Counter /> */}
      <div className="shadow-lg navbar bg-base-100">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost">
            🤖️ Robot Notification
            <div className="ml-2.5 badge badge-secondary">{data.meta.totalItems}</div>
          </a>
        </div>
        <div className="flex-none gap-2">
          <label className="swap swap-rotate">
            <input type="checkbox" checked={darkMode} onChange={(event) => dispatch(updateDarkMode({ darkMode: !darkMode }))} />
            <svg className="w-6 h-6 fill-current swap-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="w-6 h-6 fill-current swap-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="gap-1 normal-case btn btn-ghost">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
              <span className="hidden md:inline">Theme</span>
              <svg width="12px" height="12px" className="hidden w-3 h-3 ml-1 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </label>
            <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a href="#" onClick={() => dispatch(updateDarkMode({ darkMode: true }))}>Dark</a>
              </li>
              <li>
                <a href="#" onClick={() => dispatch(updateDarkMode({ darkMode: false }))}>Light</a>
              </li>
            </ul>
          </div>
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
                      <span className="font-medium title-font">{i.content}</span>
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
