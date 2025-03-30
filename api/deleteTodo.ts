// api/deleteTodo.ts
const tenantId = "hyejin-todolist";

/**
 * 특정 ID의 할 일을 삭제하는 함수
 * @param id - 삭제할 할 일의 ID (예: "5776")
 * @returns 삭제된 할 일의 정보
 */
export const deleteTodo = async (id: string) => {
  // API 요청을 통해 특정 ID의 할 일을 삭제
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`,
    {
      method: "DELETE"
    }
  );

  // 응답이 성공적이지 않으면 에러를 던짐
  if (!res.ok) {
    throw new Error("할 일 삭제 실패");
  }
  // 응답 JSON을 파싱하여 반환
  // id, name, memo, isCompleted, imageUrl 속성을 포함한 객체를 반환
  return res.json();
};