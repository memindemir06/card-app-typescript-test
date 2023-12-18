import React from 'react';
import { useDarkMode } from '../utilities/globalContext';


const DarkToggle: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <div>
            <button className="m-3 p-4 text-xl bg-blue-400 dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-500 rounded-md font-medium text-white dark:text-gray-100" onClick={toggleDarkMode}>
                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
};

export default DarkToggle;