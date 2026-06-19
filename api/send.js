export default async function handler(req, res) {
  // 3단계에서 Vercel 대시보드에 등록할 두레이 주소입니다.
  const DOORAY_WEBHOOK_URL = process.env.DOORAY_WEBHOOK_URL;

  // 특정 대화방으로 보낼 메시지 내용 (원하는 대로 수정하세요)
  const messagePayload = {
    botName: "테스트",
    text: "🔔 대화방 여러분, 정기 알림 시간입니다! 오늘 하루도 화이팅하세요. 🚀",
  };

  try {
    const response = await fetch(DOORAY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messagePayload),
    });

    if (!response.ok) throw new Error('두레이 전송 실패');
    res.status(200).json({ success: true, message: '발송 성공' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
