// api/save.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    console.log('✅ 收到数据:', JSON.stringify(body, null, 2));

    // 验证必填字段
    if (!body.deviceId || !body.level || !body.timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    res.status(200).json({
      success: true,
      message: "Battery data saved",
      received: body
    });
  } catch (error) {
    console.error('❌ 处理请求出错:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}