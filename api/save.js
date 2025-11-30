import { updateBatteryStorage } from './get.js';
// api/save.js
// 内存临时存储（Serverless环境下非持久化）
let batteryStorage = {};

export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method Not Allowed, only POST' 
    });
  }

  try {
    // 获取请求体中的电量数据
    const { deviceId, level, timestamp } = req.body;

    // 校验必填参数
    if (!deviceId || level === undefined || !timestamp) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: deviceId/level/timestamp'
      });
    }

    // 校验电量范围（0-100）
    if (level < 0 || level > 100) {
      return res.status(400).json({
        success: false,
        error: 'Battery level must be between 0 and 100'
      });
    }

    // 存储数据（按设备ID区分）
    const batteryData = {
      deviceId,
      level: Number(level), // 确保是数字
      timestamp: Number(timestamp),
      updateTime: new Date().toLocaleString() // 服务器接收时间
    };
    updateBatteryStorage({ [deviceId]: batteryData });

    // 返回成功响应
    return res.status(200).json({
      success: true,
      message: 'Battery data saved successfully',
      data: batteryData
    });

  } catch (error) {
    // 捕获异常
    console.error('Save battery data error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      details: error.message
    });
  }
}