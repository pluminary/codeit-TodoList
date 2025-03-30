// api/addTodo.ts
const tenantId = 'hyejin-todolist';

export const addTodo = async (name: string) => {
  const res = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // POST 요청의 body 부분에 JSON 문자열로 할 일 데이터를 담음
    // 서버는 { name: string } 형식만 허용함 (Swagger 문서 기준)
    body: JSON.stringify({ name }),
  });

  console.log("추가 요청 데이터:", name);
  console.log("응답 상태코드:", res.status);

  if (!res.ok) {
    const errorText = await res.text(); // 에러 메시지 출력
    console.error("서버 응답:", errorText);
    throw new Error("할 일 추가 실패");
  }

  return res.json();
};