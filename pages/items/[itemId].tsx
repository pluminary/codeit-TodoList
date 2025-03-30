// pages/items/[itemId].tsx
import { useRouter } from "next/router";

export default function ItemDetail() {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📝 할 일 상세</h1>
      <p>현재 보고 있는 할 일 ID: {itemId}</p>
    </div>
  );
}