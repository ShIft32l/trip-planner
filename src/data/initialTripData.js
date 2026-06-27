export const generateInitialTripData = () => {
  const today = new Date();
  
  // Helper to get a date string for today + offset days
  const getDateStr = (offsetDays) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offsetDays);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return [
    {
      id: "day-1",
      date: getDateStr(0),
      title: "Ngày 1: Đến Singapore & Khám phá Marina Bay",
      activities: [
        { id: "a1", time: "10:00", endTime: "12:00", title: "Đến sân bay Changi & Nhận phòng", location: "Changi Airport", completed: false },
        { id: "a2", time: "12:00", endTime: "13:30", title: "Ăn trưa (Cơm gà Hải Nam)", location: "Maxwell Food Centre", completed: false },
        { id: "a3", time: "14:00", endTime: "17:00", title: "Tham quan Gardens by the Bay", location: "Marina Bay", completed: false },
        { id: "a4", time: "18:00", endTime: "19:30", title: "Ăn tối & Dạo Marina Bay Sands", location: "Marina Bay Sands", completed: false },
        { id: "a5", time: "20:00", endTime: "21:00", title: "Xem nhạc nước Spectra Show", location: "Marina Bay Sands", completed: false }
      ]
    },
    {
      id: "day-2",
      date: getDateStr(1),
      title: "Ngày 2: Vui chơi tại Sentosa",
      activities: [
        { id: "b1", time: "08:30", endTime: "09:30", title: "Ăn sáng (Kaya Toast)", location: "Ya Kun Kaya Toast", completed: false },
        { id: "b2", time: "10:00", endTime: "16:00", title: "Universal Studios Singapore", location: "Sentosa", completed: false },
        { id: "b3", time: "16:30", endTime: "18:30", title: "Tắm biển Siloso Beach", location: "Sentosa", completed: false },
        { id: "b4", time: "19:00", endTime: "21:00", title: "Ăn tối & Wings of Time", location: "Sentosa", completed: false }
      ]
    },
    {
      id: "day-3",
      date: getDateStr(2),
      title: "Ngày 3: Văn hóa & Mua sắm",
      activities: [
        { id: "c1", time: "09:00", endTime: "11:30", title: "Khám phá Chinatown & Chùa Răng Phật", location: "Chinatown", completed: false },
        { id: "c2", time: "12:00", endTime: "13:30", title: "Ăn trưa Dimsum", location: "Chinatown", completed: false },
        { id: "c3", time: "14:00", endTime: "16:30", title: "Tham quan Little India & Kampong Glam", location: "Bugis", completed: false },
        { id: "c4", time: "17:00", endTime: "20:00", title: "Mua sắm tại Orchard Road", location: "Orchard", completed: false },
        { id: "c5", time: "20:30", endTime: "22:00", title: "Ăn tối lẩu Haidilao", location: "Orchard", completed: false }
      ]
    },
    {
      id: "day-4",
      date: getDateStr(3),
      title: "Ngày 4: Tạm biệt Singapore",
      activities: [
        { id: "d1", time: "08:00", endTime: "10:00", title: "Ăn sáng & Check-out", location: "Hotel", completed: false },
        { id: "d2", time: "10:30", endTime: "13:00", title: "Tham quan Jewel Changi", location: "Changi Airport", completed: false },
        { id: "d3", time: "13:30", endTime: "14:30", title: "Ăn trưa tại Jewel", location: "Changi Airport", completed: false },
        { id: "d4", time: "15:00", endTime: "17:00", title: "Bay về nhà", location: "Changi Airport", completed: false }
      ]
    }
  ];
};
