// components/TodoItem.tsx
import { useRouter } from "next/router";

interface Props {
  id: string;
  content: string;
  done: boolean;
  onToggle: (id: string, done: boolean) => void;
}

export default function TodoItem({ id, content, done, onToggle }: Props) {
  const router = useRouter();

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