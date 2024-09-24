'use client'

import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">인증 오류</h1>
        <p className="text-gray-700">
          {error === 'Configuration' && '서버 설정에 문제가 있습니다. 관리자에게 문의해 주세요.'}
          {error === 'AccessDenied' && '접근이 거부되었습니다. 권한이 없는 것 같습니다.'}
          {error === 'Verification' && '인증 과정에서 문제가 발생했습니다. 다시 시도해 주세요.'}
          {!error && '알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.'}
        </p>
        <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}