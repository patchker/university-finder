import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="relative mt-1 h-1 w-full overflow-hidden bg-gray-200">
            <div className="absolute top-0 left-0 h-full w-full bg-stone-800 animate-progress-bar"></div>
        </div>
    );
};

export default Loader;
