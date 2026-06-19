export default async function handler(req, res) {
  // 3단계에서 Vercel 대시보드에 등록할 두레이 주소입니다.
  const DOORAY_WEBHOOK_URL = process.env.DOORAY_WEBHOOK_URL;

  // 특정 대화방으로 보낼 메시지 내용 (원하는 대로 수정하세요)
  const messagePayload = {
    botName: "기획팀 BOT",
    text: "어깨와 허리가 굽어있진 않나요? 지금 바로 쭉 펴주세요! 🧘",
  "30초만 투자하세요! 기지개 한번 켜고 물 한 잔 어때요? 💧",
  "거북목 주의! 고개를 뒤로 젖히는 스트레칭 3회만 해주세요! 🐢",
  "집중력 저하의 원인은 경직된 근육일 수 있어요. 가볍게 어깨 돌리기!",
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
