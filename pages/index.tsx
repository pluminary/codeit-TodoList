// pages/index.tsx
import { useEffect, useState } from "react";
import { getTodos } from "../api/todos";
import { addTodo } from "../api/addTodo";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import { updateTodo } from "../api/updateTodo";

// 할 일 목록의 타입 정의 (TodoItem 컴포넌트에서 사용되는 props 타입)
type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};

// 할 일 목록을 가져오는 API
export default function Home() {

  // 할 일 목록을 관리하는 상태
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");

  // 컴포넌트가 마운트될 때 할 일 목록을 가져옴
  useEffect(() => {
    fetchTodos();
  }, []);

  // 할 일 목록을 가져오는 함수
  const fetchTodos = () => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => console.error(err));
  };

  // 할 일을 추가하는 함수
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

  // 할 일의 상태를 변경하는 함수
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

  // 진행 중인 할 일과 완료된 할 일을 분리
  const inProgressTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  // 진행 중인 할 일 목록과 완료된 할 일 목록을 각각 렌더링
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* 입력창 영역 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
        className="w-full max-w-[1200px] mx-auto px-4 mobile:px-6 pc:px-0 mt-4 tablet:mt-6 flex gap-3 tablet:gap-4"
      >
        {/* 입력창 */}
        <div className="flex items-center flex-1 bg-slate-100 border-[2px] border-slate-900 rounded-[24px] shadow-[4px_3.5px_0px_theme('colors.slate.900')] px-6 py-3">
          <input
            type="text"
            placeholder="할 일을 입력해주세요"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="w-full text-left text-base font-regular text-slate-500 placeholder:text-slate-500 bg-transparent outline-none"
          />
        </div>

        {/* 추가하기 버튼 */}
        <button
          type="submit"
          className="w-[55px] tablet:w-[158px] pc:w-[164px] flex items-center justify-center gap-1 
                    bg-slate-200 border-[2px] border-slate-900 rounded-[24px] 
                    shadow-[4px_3.5px_0px_theme('colors.slate.900')] 
                    px-5 py-3 text-slate-900 text-base font-bold 
                    hover:bg-violet-600 hover:text-white active:bg-violet-600 active:text-white group"
        >
          {/* + 아이콘 (인라인 SVG) */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 min-w-[16px] min-h-[16px] text-current"
          >
            <path
              d="M2 8L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 14L8 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* 텍스트 */}
          <span className="hidden tablet:inline">추가하기</span>
        </button>
      </form>

      {/* 목록 */}
      <section className="w-full max-w-[1200px] mx-auto px-4 mobile:px-6 pc:px-0 mt-10 pb-10 flex flex-col tablet:flex-row gap-y-12 tablet:gap-y-0 tablet:gap-x-6">
        {/* 진행 중 목록 */}
        <div className="w-full tablet:w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/images/todo.svg" alt="To Do" className="w-[101px] h-[36px]" />
          </div>
          <ul className="space-y-4">
            {inProgressTodos.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="/images/empty/todo-large.svg"
                  alt="할 일 없음"
                  className="w-[120px] tablet:w-[240px] pc:w-[240px] h-auto mb-6 tablet:mb-4"
                />
                <p className="text-slate-400 text-base font-bold leading-normal">
                  할 일이 없어요.<br />
                  TODO를 새롭게 추가해주세요!
                </p>
              </div>
            ) : (
              inProgressTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  content={todo.name}
                  done={todo.isCompleted}
                  onToggle={handleToggleTodo}
                />
              ))
            )}
          </ul>
        </div>

        {/* 완료된 목록 */}
        <div className="w-full tablet:w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/images/done.svg" alt="Done" className="w-[97px] h-[36px]" />
          </div>
          <ul className="space-y-4">
            {completedTodos.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="/images/empty/done-large.svg"
                  alt="완료된 일 없음"
                  className="w-[120px] tablet:w-[240px] pc:w-[240px] h-auto mb-6 tablet:mb-4"
                />
                <p className="text-slate-400 text-base font-bold leading-normal">
                  아직 다 한 일이 없어요.<br />
                  해야 할 일을 체크해보세요!
                </p>
              </div>
            ) : (
              completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  content={todo.name}
                  done={todo.isCompleted}
                  onToggle={handleToggleTodo}
                />
              ))
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}