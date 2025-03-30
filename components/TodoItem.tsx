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

  // 할 일 항목을 클릭했을 때 상세 페이지로 이동
  return (
    <li
      className="p-4 bg-white rounded shadow flex justify-between items-center cursor-pointer"
      onClick={() => router.push(`/items/${id}`)}
    >
      <input
        type="checkbox"
        checked={done}
        onClick={(e) => e.stopPropagation()} // 상세페이지 이동 막기
        onChange={() => onToggle(id, !done)}
      />
      <span className={done ? "line-through text-gray-400" : ""}>
        {content}
      </span>
    </li>
  );
}