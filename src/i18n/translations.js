/**
 * Translations for Singapore Trip Tracker
 * Supports: English (en) and Vietnamese (vi)
 */

export const translations = {
  en: {
    // ── Nav ──────────────────────────────────────────────────
    nav: {
      today:    "Today",
      timeline: "Timeline",
      budget:   "Budget",
      map:      "Map",
    },

    // ── Common ───────────────────────────────────────────────
    common: {
      free:        "Free",
      done:        "Done",
      next:        "Next",
      loading:     "Loading…",
      estCost:     "Est. Cost",
      getDir:      "Get Directions",
      markDone:    "Mark Done",
      add:         "Add",
      save:        "Save",
      cancel:      "Cancel",
      delete:      "Delete",
      notes:       "Notes",
      amount:      "Amount (SGD)",
      description: "Description",
      category:    "Category",
      progress:    "Progress",
      now:         "Now",
    },

    // ── Today page ───────────────────────────────────────────
    today: {
      title:            "Today",
      tripTitle:        "SG Trip",
      tripCountdown:    "Your trip starts in",
      days:             "days",
      tripDates:        "10 Jul – 13 Jul 2026 · Singapore 🇸🇬",
      tripDone:         "Singapore Adventure Done!",
      tripDoneMsg:      "Hope you had an amazing time in the Lion City.",
      happeningNow:     "Happening Now",
      upNext:           "Up Next",
      justFinished:     "Just Finished",
      freeTime:         "Free time right now — next activity coming up!",
      allDone:          "All done for today! Enjoy your evening 🌙",
      noSchedule:       "No schedule for today",
      noScheduleMsg:    "Check the Timeline tab for the full itinerary.",
      todayProgress:    "Today's Progress",
      activitiesDone:   (done, total) => `${done} of ${total} activities completed`,
      yourFlights:      "Your Flights",
      outbound:         "Outbound",
      return:           "Return",
    },

    // ── Timeline page ────────────────────────────────────────
    timeline: {
      title:       "Timeline",
      subtitle:    "4-Day Singapore Adventure",
      today:       "Today",
      progress:    "Progress",
    },

    // ── Budget page ──────────────────────────────────────────
    budget: {
      title:        "Budget",
      subtitle:     "Singapore Trip Spend",
      totalSpent:   "Total Spent",
      remaining:    "Remaining",
      ofBudget:     (spent, total) => `${spent} of ${total} total budget`,
      recent:       "Recent Expenses",
      noExpenses:   "No expenses yet — tap Add to log your first spend!",
      addExpense:   "Log Expense",
      whatSpentOn:  "What did you spend on?",
    },

    // ── Map page ─────────────────────────────────────────────
    map: {
      title:        "Map",
      subtitle:     "All Singapore destinations",
      allDays:      "All",
      allTypes:     "All",
      day:          "Day",
      type:         "Type",
      destination:  (n) => `${n} destination${n !== 1 ? "s" : ""}`,
      noResults:    "No destinations match the selected filters.",
    },

    // ── Activity categories ───────────────────────────────────
    categories: {
      food:        "Food",
      sightseeing: "Sightseeing",
      transport:   "Transport",
      hotel:       "Hotel",
      beach:       "Beach",
      shopping:    "Shopping",
      flight:      "Flight",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // VIETNAMESE
  // ═══════════════════════════════════════════════════════════
  vi: {
    // ── Nav ──────────────────────────────────────────────────
    nav: {
      today:    "Hôm nay",
      timeline: "Lịch trình",
      budget:   "Ngân sách",
      map:      "Bản đồ",
    },

    // ── Common ───────────────────────────────────────────────
    common: {
      free:        "Miễn phí",
      done:        "Xong",
      next:        "Tiếp",
      loading:     "Đang tải…",
      estCost:     "Chi phí dự kiến",
      getDir:      "Chỉ đường",
      markDone:    "Đánh dấu xong",
      add:         "Thêm",
      save:        "Lưu",
      cancel:      "Hủy",
      delete:      "Xóa",
      notes:       "Ghi chú",
      amount:      "Số tiền (SGD)",
      description: "Mô tả",
      category:    "Danh mục",
      progress:    "Tiến độ",
      now:         "Hiện tại",
    },

    // ── Today page ───────────────────────────────────────────
    today: {
      title:            "Hôm nay",
      tripTitle:        "Chuyến SG",
      tripCountdown:    "Chuyến đi bắt đầu sau",
      days:             "ngày",
      tripDates:        "10 Tháng 7 – 13 Tháng 7 2026 · Singapore 🇸🇬",
      tripDone:         "Chuyến đi Singapore hoàn thành!",
      tripDoneMsg:      "Hy vọng bạn đã có thời gian tuyệt vời tại Đảo Sư Tử.",
      happeningNow:     "Đang diễn ra",
      upNext:           "Tiếp theo",
      justFinished:     "Vừa xong",
      freeTime:         "Thời gian tự do — hoạt động tiếp theo sắp bắt đầu!",
      allDone:          "Hoàn thành hết hôm nay! Tận hưởng buổi tối nhé 🌙",
      noSchedule:       "Không có lịch trình hôm nay",
      noScheduleMsg:    "Xem tab Lịch trình để thấy đầy đủ.",
      todayProgress:    "Tiến độ hôm nay",
      activitiesDone:   (done, total) => `${done} trong ${total} hoạt động đã xong`,
      yourFlights:      "Chuyến bay của bạn",
      outbound:         "Chiều đi",
      return:           "Chiều về",
    },

    // ── Timeline page ────────────────────────────────────────
    timeline: {
      title:       "Lịch trình",
      subtitle:    "4 Ngày Khám Phá Singapore",
      today:       "Hôm nay",
      progress:    "Tiến độ",
    },

    // ── Budget page ──────────────────────────────────────────
    budget: {
      title:        "Ngân sách",
      subtitle:     "Chi tiêu chuyến đi Singapore",
      totalSpent:   "Đã chi",
      remaining:    "Còn lại",
      ofBudget:     (spent, total) => `${spent} trên ${total} ngân sách tổng`,
      recent:       "Chi tiêu gần đây",
      noExpenses:   "Chưa có chi tiêu — nhấn Thêm để ghi lần đầu!",
      addExpense:   "Ghi chi tiêu",
      whatSpentOn:  "Chi tiêu cho việc gì?",
    },

    // ── Map page ─────────────────────────────────────────────
    map: {
      title:        "Bản đồ",
      subtitle:     "Tất cả điểm đến Singapore",
      allDays:      "Tất cả",
      allTypes:     "Tất cả",
      day:          "Ngày",
      type:         "Loại",
      destination:  (n) => `${n} điểm đến`,
      noResults:    "Không có điểm đến nào phù hợp bộ lọc.",
    },

    // ── Activity categories ───────────────────────────────────
    categories: {
      food:        "Ăn uống",
      sightseeing: "Tham quan",
      transport:   "Di chuyển",
      hotel:       "Khách sạn",
      beach:       "Bãi biển",
      shopping:    "Mua sắm",
      flight:      "Chuyến bay",
    },
  },
};

export const defaultLang = "en";
