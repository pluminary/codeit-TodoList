// api/addTodo.ts
const tenantId = 'hyejin-todolist';

/**
 * 새로운 할 일을 추가하는 함수
 * @param name - 추가할 할 일의 이름 (예: "새로운 할 일")
 * @returns 추가된 할 일의 정보
 */
export const addTodo = async (name: string) => {
  const res = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, {
    method: "POST", // POST 메서드를 사용하여 새로운 할 일을 추가
    headers: {
      "Content-Type": "application/json", // 요청 헤더에 JSON 형식으로 데이터를 전송
    },
    // POST 요청의 body 부분에 JSON 문자열로 할 일 데이터를 담음
    // 서버는 { name: string } 형식만 허용함 (Swagger 문서 기준)
    body: JSON.stringify({ name }),
  });

  console.log("추가 요청 데이터:", name);
  console.log("응답 상태코드:", res.status);

  // 응답이 성공적이지 않으면 에러를 던짐
  if (!res.ok) {
    const errorText = await res.text(); // 에러 메시지 출력
    console.error("서버 응답:", errorText);
    throw new Error("할 일 추가 실패");
  }

  // 응답 JSON을 파싱하여 반환
  // id, name, memo, isCompleted, imageUrl 속성을 포함한 객체를 반환
  return res.json();
};