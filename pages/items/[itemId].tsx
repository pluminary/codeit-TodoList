// pages/items/[itemId].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTodo } from "../../api/getTodo";
import { updateTodo } from "../../api/updateTodo";
import { deleteTodo } from "../../api/deleteTodo";
import Header from "../../components/Header";

// 할 일 항목의 타입 정의
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

  const [isEditingName, setIsEditingName] = useState(false); // 이름 수정 모드

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
  
  // 할 일 정보가 있으면 상세 페이지 렌더링
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section
        className="w-full max-w-[1200px] bg-white mx-auto px-[24px] pc:px-[102px] pt-10 pb-10 space-y-6"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        {/* 이름 + 체크 상태 */}
        <div className="w-full h-[60px] flex justify-center items-center border-[2px] border-slate-900 rounded-[24px] px-6 py-3 shadow-[4px_3.5px_0px_theme('colors.slate.900')] bg-white">
          {/* 체크박스 */}
          <button
            type="button"
            onClick={() => setIsCompleted(!isCompleted)}
            className="w-8 h-8 flex-shrink-0"
          >
            <img
              src={isCompleted ? "/icons/checkbox-on.svg" : "/icons/checkbox-off.svg"}
              alt="check"
              className="w-8 h-8"
            />
          </button>

          {/* 이름 텍스트 or 인풋 */}
          {isEditingName ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              autoFocus
              className="ml-4 text-xl font-bold text-slate-900 border-b border-slate-300 outline-none bg-transparent w-full max-w-[600px]"
            />
          ) : (
            <span
              className="ml-4 text-xl font-bold text-slate-900 underline overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
              onClick={() => setIsEditingName(true)}
            >
              {name}
            </span>
          )}
        </div>
        
        {/* 이미지 + 메모 */}
        <div className="flex flex-col tablet:flex-row gap-6">
          {/* 이미지 업로드 영역 */}
          <div
            className={`tablet:flex-[4] h-[300px] tablet:h-[300px] rounded-[24px] relative overflow-hidden flex items-center justify-center 
              bg-slate-50 ${imagePreview || imageUrl ? 'border-0' : 'border-[2px] border-dashed border-slate-300'}`}
          >
            {imagePreview || imageUrl ? (
              <>
                <img
                  src={imagePreview ?? imageUrl}
                  alt="미리보기"
                  className="w-full h-full object-cover rounded-[24px]"
                />
                {/* 수정 아이콘 */}
                <label className="absolute bottom-4 right-4 w-16 h-16 rounded-full 
                                  bg-[#0F172A80] border-[2px] border-slate-900 
                                  flex items-center justify-center cursor-pointer">
                  <img
                    src="/icons/edit.svg"
                    alt="edit"
                    className="w-6 h-6"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </>
            ) : (
              <>
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <img
                    src="/images/img-file.svg"
                    alt="upload icon"
                    className="w-16 h-16 mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* 오른쪽 하단 + 버튼 */}
                <label className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer">
                  <img
                    src="/icons/plus-large.svg"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>

          {/* 메모 영역 */}
          <div
            className="tablet:flex-[6] rounded-[24px] p-6 bg-[url('/images/memo.svg')] bg-repeat bg-[length:100%] relative overflow-hidden"
          >
            <h3 className="text-center text-amber-800 text-base font-bold mb-4">
              Memo
            </h3>

            {/* 텍스트에어리어를 스크롤 되게 */}
            <div className="h-[216px] overflow-y-auto">
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력하세요"
                className="w-full h-full bg-transparent outline-none resize-none text-slate-800 text-center"
              />
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-4 pc:justify-end justify-center">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-1 w-[164px] justify-center 
                      bg-slate-200 border-[2px] border-slate-900 rounded-[24px] 
                      shadow-[4px_3.5px_0px_#0F172A] px-5 py-3 
                      text-slate-900 text-base font-bold
                      hover:bg-lime-300 active:bg-lime-300"
          >
            <img src="/icons/check.svg" alt="수정" className="w-4 h-4" />
            수정 완료
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 w-[164px] justify-center bg-rose-500 border-[2px] border-slate-900 rounded-[24px] shadow-[4px_3.5px_0px_#0F172A] px-5 py-3 text-white text-base font-bold hover:bg-rose-600"
          >
            <img src="/icons/close.svg" alt="삭제" className="w-4 h-4" />
            삭제하기
          </button>
        </div>
      </section>
    </main>
  );
}