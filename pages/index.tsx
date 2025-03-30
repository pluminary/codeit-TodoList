// pages/index.tsx
import { useEffect, useState } from "react";
import { getTodos } from "../api/todos";
import { addTodo } from "../api/addTodo";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import { updateTodo } from "../api/updateTodo";

type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => console.error(err));
  };

  const handleAddTodo = async () => {
    if (todoText.trim() === "") {
      alert("할 일을 입력해주세요!");
      return;
    }

    try {
      await addTodo(todoText);
      setTodoText("");
      fetchTodos();
    } catch (err) {
      alert("추가 실패!");
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: string, done: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: done } : todo
      )
    );

    try {
      await updateTodo(id, { isCompleted: done });
    } catch (err) {
      alert("상태 변경 실패!");
      console.error(err);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !done } : todo
        )
      );
    }
  };

  // 분리 렌더링용
  const inProgressTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <main className="min-h-screen bg-brand-100">
      <Header />

      {/* 입력창 영역 */}
      <form
        className="flex gap-2 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="할 일을 입력하세요"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          추가
        </button>
      </form>

      {/* 목록 */}
      <section className="p-6 space-y-6">
        {/* 진행 중 목록 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🟡 진행 중</h2>
          <ul className="space-y-2">
            {inProgressTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                content={todo.name}
                done={todo.isCompleted}
                onToggle={handleToggleTodo}
              />
            ))}
          </ul>
        </div>

        {/* 완료된 목록 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">✅ 완료됨</h2>
          <ul className="space-y-2">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                content={todo.name}
                done={todo.isCompleted}
                onToggle={handleToggleTodo}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}