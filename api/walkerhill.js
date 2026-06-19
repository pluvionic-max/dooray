export default async function handler(req, res) {
  // 대한민국 시간(KST) 기준으로 현재 요일 확인 (0: 일요일, 6: 토요일)
  const currentKstDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const dayOfWeek = currentKstDate.getDay();

  // 1일이 토요일(6)이거나 일요일(0)이면 두레이 메시지를 보내지 않고 즉시 종료합니다.
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return res.status(200).json({ success: true, message: '주말(토/일)이므로 알림을 건너뜁니다.' });
  }

  // 평일일 때만 아래 로직이 실행됩니다.
  const WEBHOOK_URL = process.env.WALKERHILL_DOORAY_WEBHOOK_URL;

  const messagePayload = {
    botName: "업무 알림봇",
    text: "🔔 **[정기 점검 알림]**\n\n매월 1일 정기 점검 시간입니다.\n**개인정보처리시스템 접속 로그 확인**을 진행해 주세요.\n\n업무 진행 시 아래 게시물을 참고하시기 바랍니다.\n🔗 [참고 게시물 바로가기](https://ninetree.dooray.com/project/tasks/4271895629149724057)",
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messagePayload),
    });

    if (!response.ok) throw new Error('두레이 전송 실패');
    res.status(200).json({ success: true, message: '워커힐 알림 발송 성공' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
