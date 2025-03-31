// components/TodoItem.tsx
import { useRouter } from "next/router";

// TodoItem 컴포넌트의 props 타입 정의
interface Props {
  id: string;
  content: string;
  done: boolean;
  onToggle: (id: string, done: boolean) => void; // 할 일의 상태를 변경하는 함수
}

// TodoItem 컴포넌트
export default function TodoItem({ id, content, done, onToggle }: Props) {
  // useRouter 훅을 사용하여 라우터 객체를 가져옴
  const router = useRouter();

  // 항목 클릭 시 상세 페이지 이동
  const handleClick = () => {
    router.push(`/items/${id}`);
  };

  return (
    <li
      className={`w-full h-[50px] px-4 flex items-center gap-4 border-[2px] border-slate-900 rounded-full ${
        done ? "bg-violet-100" : "bg-white"
      } cursor-pointer`}
      onClick={handleClick}
    >
      {/* 체크박스 */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id, !done);
        }}
        className="flex-shrink-0 w-8 h-8"
      >
        <img
          src={done ? "/icons/checkbox-on.svg" : "/icons/checkbox-off.svg"}
          alt="check"
          className="w-8 h-8"
        />
      </button>

      {/* 텍스트 */}
      <span
        className={`flex-1 text-slate-800 text-base font-regular overflow-hidden text-ellipsis whitespace-nowrap ${
          done ? "line-through" : ""
        }`}
      >
        {content}
      </span>
    </li>
  );
}