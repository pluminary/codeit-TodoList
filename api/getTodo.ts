const tenantId = "hyejin-todolist";

/**
 * 특정 ID의 할 일 정보를 가져오는 함수
 * @param id - 할 일 ID (예: "5776")
 */
export const getTodo = async (id: string): Promise<{
  id: string;
  name: string;
  memo: string;
  isCompleted: boolean;
  imageUrl?: string;
}> => {

  // API 요청을 통해 특정 ID의 할 일 정보를 가져옴
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`
  );

  // 응답이 성공적이지 않으면 에러를 던짐
  if (!res.ok) {
    throw new Error("할 일 가져오기 실패");
  }

  // 응답 JSON을 파싱하여 반환
  // id, name, memo, isCompleted, imageUrl 속성을 포함한 객체를 반환
  return res.json();
};