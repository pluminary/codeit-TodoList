// pages/items/[itemId].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTodo } from "../../api/getTodo";
import { updateTodo } from "../../api/updateTodo";
import { deleteTodo } from "../../api/deleteTodo";

// 할 일 목록의 타입 정의 (TodoItem 컴포넌트에서 사용되는 props 타입)
type Todo = {
  id: string;
  name: string;
  memo: string;
  isCompleted: boolean;
  imageUrl?: string;
};

// 할 일 상세 페이지 컴포넌트
export default function ItemDetail() {
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 객체를 가져옴
  const { itemId } = router.query;  // URL에서 itemId를 가져옴
  const [todo, setTodo] = useState<Todo | null>(null);  // 할 일 정보를 저장하는 상태
  const [name, setName] = useState(""); // 할 일 이름을 저장하는 상태
  const [memo, setMemo] = useState(""); // 할 일 메모를 저장하는 상태
  const [isCompleted, setIsCompleted] = useState(false);  // 할 일 완료 여부를 저장하는 상태

  const [imageUrl, setImageUrl] = useState(""); // 할 일 이미지 URL을 저장하는 상태
  const [imageFile, setImageFile] = useState<File | null>(null);  // 할 일 이미지 파일을 저장하는 상태
  const [imagePreview, setImagePreview] = useState<string | null>(null);  // 할 일 이미지 미리보기를 저장하는 상태

  // 컴포넌트가 마운트될 때 할 일 정보를 가져옴
  useEffect(() => {
    // itemId가 없거나 문자열이 아닌 경우 함수 종료
    if (!itemId || typeof itemId !== "string") return;

    // getTodo API를 호출하여 할 일 정보를 가져옴
    getTodo(itemId)
      .then((data) => {
        setTodo(data);
        setName(data.name);
        setMemo(data.memo ?? "");
        setIsCompleted(data.isCompleted);
        setImageUrl(data.imageUrl ?? "");
      })
      .catch((err) => {
        console.error(err);
        alert("할 일 정보를 불러오지 못했어요!");
      });
  }, [itemId]);

  // 이미지 파일 선택 시 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일이 선택되지 않은 경우 함수 종료
    if (!file) return;  // file이 null인 경우 함수 종료

    // 영어 파일명인지 확인하는 정규식
    const isEnglish = /^[a-zA-Z0-9._-]+$/.test(file.name);
    if (!isEnglish) {
      alert("파일명은 영어만 허용됩니다.");
      return;
    }
    // 파일 크기가 5MB 이하인지 확인
    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하 파일만 업로드 가능합니다.");
      return;
    }

    setImageFile(file); // 선택한 파일을 상태에 저장
    setImagePreview(URL.createObjectURL(file)); // 미리보기 URL 생성
  };

  // 할 일 수정 함수
  const handleUpdate = async () => {
    if (!itemId || typeof itemId !== "string") return;  // itemId가 없거나 문자열이 아닌 경우 함수 종료

    // 이름이 비어있는 경우 경고 메시지 표시
    if (name.trim() === "") {
      alert("내용은 비워둘 수 없어요!");
      return;
    }

    // 실제로는 서버에 이미지 업로드 후 imageUrl 받아야 함
    // 현재 테스트용 작업이라서 파일 선택 시 미리보기 URL을 그대로 보냄
    const uploadedUrl = imagePreview ?? imageUrl;

    // 이미지 파일이 선택된 경우 업로드 처리
    try {
      await updateTodo(itemId, {
        name,
        memo,
        isCompleted,
        imageUrl: uploadedUrl,
      });
      alert("수정 완료!");
      router.push("/");
    } catch (err) { // 수정 실패 시 에러 처리
      console.error(err);
      alert("수정 실패!");
    }
  };

  // 할 일 삭제 함수
  const handleDelete = async () => {
    if (!itemId || typeof itemId !== "string") return;  // itemId가 없거나 문자열이 아닌 경우 함수 종료
    if (!confirm("정말 삭제할까요?")) return; // 삭제 확인

    // 삭제 요청 처리
    try {
      await deleteTodo(itemId);
      alert("삭제 완료!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("삭제 실패!");
    }
  };

  // 할 일 정보가 없으면 로딩 중 메시지 표시
  if (!todo) return <p className="p-6">로딩 중...</p>;
  
  // 할 일 정보가 있으면 상세 페이지 렌더링
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">📝 할 일 상세</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded p-2 w-full text-lg font-semibold"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        완료됨
      </label>

      <textarea
        value={memo ?? ""}
        onChange={(e) => setMemo(e.target.value)}
        className="w-full h-40 p-4 bg-yellow-50 border rounded resize-none"
        placeholder="메모를 입력하세요"
      />

      {/* 이미지 업로드 */}
      <div className="space-y-2">
        <label className="font-semibold">이미지 업로드 (5MB 이하, 영어파일명)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview || imageUrl ? (
          <img
            src={imagePreview ?? imageUrl}
            alt="미리보기"
            className="w-48 h-48 object-cover border rounded"
          />
        ) : null}
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 rounded bg-white border shadow hover:bg-gray-50"
        >
          ✓ 수정 완료
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 rounded bg-red-500 text-white shadow hover:bg-red-600"
        >
          ✖ 삭제하기
        </button>
      </div>
    </div>
  );
}