export default function InfoPage() {
	return (
	  <div className="max-w-4xl mx-auto py-8">
		<h1 className="text-3xl font-bold mb-6">ZMOsite 소개</h1>
		<div className="space-y-4">
		  <p>
			ZMOsite는 사용자들이 자유롭게 메시지를 남기고 소통할 수 있는 인터랙티브한 방명록 서비스입니다.
		  </p>
		  <p>
			우리의 목표는 사용자 친화적이고 안전한 플랫폼을 제공하여, 사람들이 자신의 생각과 경험을 공유할 수 있도록 하는 것입니다.
		  </p>
		  <h2 className="text-2xl font-semibold mt-6 mb-3">주요 기능</h2>
		  <ul className="list-disc pl-5 space-y-2">
			<li>간편한 회원가입 및 로그인 (이메일 또는 소셜 미디어 계정 사용)</li>
			<li>메시지 작성 및 공유</li>
			<li>다크 모드 지원</li>
			<li>관리자 대시보드 (웹사이트 통계 및 관리 기능)</li>
		  </ul>
		  <h2 className="text-2xl font-semibold mt-6 mb-3">연락처</h2>
		  <p>
			문의사항이나 피드백이 있으시면 언제든 연락 주세요: <a href="mailto:contact@zmosite.com" className="text-blue-600 hover:underline">contact@zmosite.com</a>
		  </p>
		</div>
	  </div>
	)
  }