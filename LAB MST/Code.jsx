import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (count === 10) {
      setMsg("Maximum limit reached");
      const t = setTimeout(() => {
        setCount(0);
        setMsg("Counter Auto-Reset to 0");
        setTimeout(() => setMsg(""), 2000);
      }, 3000);
      return () => clearTimeout(t);
    }
    setMsg("");
  }, [count]);

  return (
    <div className="p-8 text-center border rounded-2xl shadow-xl max-w-sm mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4">Constrained Counter</h2>

      <div
        className={`text-6xl font-mono my-8 ${
          count === 0
            ? "text-gray-400"
            : count === 10
            ? "text-red-600"
            : "text-indigo-600"
        }`}
      >
        {count}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          disabled={count === 0}
          className={`px-6 py-2 rounded-xl font-semibold ${
            count === 0
              ? "bg-gray-300 text-gray-500"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(c => Math.min(10, c + 1))}
          disabled={count === 10}
          className={`px-6 py-2 rounded-xl font-semibold ${
            count === 10
              ? "bg-gray-300 text-gray-500"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Increment
        </button>
      </div>

      {msg && (
        <p className={`mt-2 font-bold ${count === 10 ? "text-red-500" : "text-green-600"}`}>
          {msg}
        </p>
      )}
      <p className="text-sm text-gray-500">Range: 0–10 {count === 10 && "(Auto-resets after 3s)"}</p>
    </div>
  );
}
