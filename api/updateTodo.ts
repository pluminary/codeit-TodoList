// api/updateTodo.ts
const tenantId = "hyejin-todolist";

export const updateTodo = async (
  id: string,
  updateData: { isCompleted: boolean }
) => {
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }
  );

  if (!res.ok) {
    throw new Error("할 일 업데이트 실패");
  }

  return res.json();
};