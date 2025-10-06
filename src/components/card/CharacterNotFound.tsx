'use client';
export default function CharacterNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <h1 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          캐릭터를 찾을 수 없습니다.
        </h1>
        <p className="text-gray-500 text-center">
          선택한 서버와 입력하신 캐릭터명이 올바른지 다시 한 번 확인해 주세요.
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
