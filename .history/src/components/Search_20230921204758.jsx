// eslint-disable-next-line react/prop-types
const Search = ({ value, onChange }) => {
    return (
        <div className="mb-10 w-full flex justify-center">
            <div className="relative w-3/4">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Search users..."
                    className="p-2 pl-10 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="absolute top-2 left-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M10 2a8 8 0 016.192 12.786l4.221 4.221a1 1 0 01-1.414 1.414l-4.221-4.221A8 8 0 1110 2zm1 2a6 6 0 100 12A6 6 0 0011 4z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Search;
