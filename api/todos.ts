// api/todos.ts
const tenantId = "hyejin-todolist";

// 기본값 page = 1, pageSize = 100
export const getTodos = async (page = 1, pageSize = 100) => {
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items?page=${page}&pageSize=${pageSize}`
  );
  if (!res.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");
  return res.json();
};