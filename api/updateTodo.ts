// api/updateTodo.ts
const tenantId = "hyejin-todolist";

/**
 * 특정 ID의 할 일을 업데이트하는 함수
 * @param id - 업데이트할 할 일의 ID (예: "5776")
 * @param updateData - 업데이트할 데이터 (name, memo, isCompleted, imageUrl)
 * @returns 업데이트된 할 일의 정보
 */
export const updateTodo = async (
  id: string,
  // 업데이트할 데이터의 타입 정의
  updateData: {
    name?: string;
    memo?: string;
    isCompleted?: boolean;
    imageUrl?: string;
  }
) => {
  // API 요청을 통해 특정 ID의 할 일을 업데이트
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`,
    {
      method: "PATCH",  // PATCH 메서드를 사용하여 부분 업데이트
      headers: {
        "Content-Type": "application/json", // 요청 헤더에 JSON 형식으로 데이터를 전송
      },
      body: JSON.stringify(updateData) // 업데이트할 데이터
    }
  );

  // 응답이 성공적이지 않으면 에러를 던짐
  if (!res.ok) {
    throw new Error("할 일 업데이트 실패");
  }

  // 응답 JSON을 파싱하여 반환
  // id, name, memo, isCompleted, imageUrl 속성을 포함한 객체를 반환
  return res.json();
};