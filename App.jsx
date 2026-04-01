import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaMoon, FaSun } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load data
  useEffect(() => {
    const data = localStorage.getItem("todos");
    const theme = localStorage.getItem("theme");

    if (data) setTodos(JSON.parse(data));
    if (theme === "dark") setDarkMode(true);
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAdd = () => {
    if (todo.trim().length <= 2) return;

    setTodos([
      ...todos,
      { id: uuidv4(), text: todo.trim(), completed: false },
    ]);
    setTodo("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const t = todos.find((t) => t.id === id);
    setTodo(t.text);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Filter + search 
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  }).filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-5 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold"> MG Task Pro</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
        
        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 rounded-lg border outline-none text-black"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-600 text-white px-4 rounded-lg hover:bg-violet-700"
          >
            Add
          </button>
        </div>

        {/* Search */}
        <input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg border outline-none text-black"
        />

        {/* Filters */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === f
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="text-sm">
            {completedCount}/{todos.length} done
          </div>
        </div>

        {/* Todos */}
        {filteredTodos.length === 0 && (
          <div className="text-center text-gray-400 py-5">
            No tasks found 
          </div>
        )}

        {filteredTodos.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center p-3 border-b"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />

              <span
                className={`${
                  t.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {t.text}
              </span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(t.id)}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(t.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;