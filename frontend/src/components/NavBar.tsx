import {NavLink} from 'react-router-dom'
import DarkToggle from './DarkToggle'

export default function NavBar(){
    return(
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-500 rounded-md font-medium text-white dark:text-gray-100" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-500 rounded-md font-medium text-white dark:text-gray-100" to={'/create'}>New Entry</NavLink>
        <DarkToggle></DarkToggle>
      </nav>
    )
}