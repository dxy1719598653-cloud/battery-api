// api/save.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { deviceId, level, timestamp } = req.body;

  // 打印日志（调试用）
  console.log('Battery data received:', { deviceId, level, timestamp });

  // 这里你可以把数据存到数据库、文件、或只是记录
  // 示例：返回成功响应
  res.status(200).json({
    success: true,
    message: "Battery data saved",
    received: { deviceId, level, timestamp }
  });
}