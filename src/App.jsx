import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const App = () => {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(inputRef.current.value);
    inputRef.current.value = "";
  };
  const fuse = new Fuse(users, { keys: ["email"] });
  const onSearch = (e) => setQuery(e.target.value);
  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setResults(data);
    });
  }, []);
  const getAllUsers = async () => {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const { data } = await response.json();
    return data;
  };
  useEffect(() => {
    if (query.length) {
      const filters = fuse.search(query);
      setResults(filters.map((filter) => filter.item));
    } else {
      setResults(users);
    }
  }, [query]);
  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <h1 className="text-2xl font-medium">Results: {results.length}</h1>
      <form onSubmit={handleSubmit} className="flex items-center gap-4 my-4">
        <input
          className="py-3 px-4 border rounded-lg focus:ring-2 ring-indigo-500 duration-200"
          type={"text"}
          placeholder="enter your name"
          value={query}
          onChange={onSearch}
        />
        <input
          className="py-3 px-4 rounded-lg bg-indigo-500 text-white"
          type={"submit"}
          value="Send"
        />
      </form>
      <ul className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8">
        {results.length ? (
          results.map((user) => (
            <li
              key={user.id}
              className="bg-white gap-8 lg:flex-col lg:text-center sm:flex-col sm:text-center xl:text-left xl:flex-row rounded-lg flex items-center shadow-lg shadow-slate-300/30 p-10"
            >
              <img
                draggable='off'
                loading="lazy"
                width={40}
                height={40}
                alt={user.email}
                className="w-32 h-32 object-cover rounded-full shadow-xl shadow-slate-300/30"
                src={user.avatar}
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium">
                  {user.first_name}.{user.last_name}
                </h2>
                <h2 className="text-sm text-slate-400">{user.email}</h2>
              </div>
            </li>
          ))
        ) : (
          <p>User not Found!</p>
        )}
      </ul>
    </div>
  );
};
export default App;