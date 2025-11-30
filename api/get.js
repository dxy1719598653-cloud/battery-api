// api/get.js
// 和save.js共享内存存储（仅测试用）
let batteryStorage = {};

// 暴露给save.js修改存储（关键：解决Serverless模块隔离问题）
export const updateBatteryStorage = (data) => {
  batteryStorage = { ...batteryStorage, ...data };
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Only GET allowed' });
  }

  try {
    const { deviceId } = req.query;
    if (!deviceId) {
      return res.status(400).json({ success: false, error: 'Missing deviceId' });
    }

    // 从内存读取数据
    const batteryData = batteryStorage[deviceId] || {
      deviceId,
      level: 0,
      timestamp: 0,
      updateTime: 'No data'
    };

    return res.status(200).json({
      success: true,
      data: batteryData
    });

  } catch (error) {
    console.error('Get battery data error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}