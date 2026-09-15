(() => {
  "use strict";

  const STORAGE_KEY = "recomp16.data.v1";
  const MEALS = ["早餐", "午餐", "晚餐", "加餐"];
  const CYCLE_TYPES = ["chest", "legs_shoulders", "back", "rest"];

  const DEFAULT_FOODS = [
    { id: "food-rice", name: "米饭（熟）", serving: "100 g", protein: 2.6, carbs: 25.9, fat: 0.3 },
    { id: "food-chicken", name: "鸡胸肉（熟）", serving: "100 g", protein: 31, carbs: 0, fat: 3.6 },
    { id: "food-egg", name: "鸡蛋", serving: "1 个（约 50 g）", protein: 6.3, carbs: 0.6, fat: 5.3 },
    { id: "food-yogurt", name: "无糖希腊酸奶", serving: "100 g", protein: 10, carbs: 4, fat: 0 },
    { id: "food-oats", name: "燕麦（干）", serving: "50 g", protein: 6.5, carbs: 30, fat: 3.5 },
    { id: "food-banana", name: "香蕉", serving: "1 根（约 120 g）", protein: 1.3, carbs: 27, fat: 0.3 },
    { id: "food-apple", name: "苹果", serving: "1 个（约 200 g）", protein: 0.5, carbs: 28, fat: 0.3 },
    { id: "food-whey", name: "乳清蛋白粉", serving: "1 勺（约 30 g）", protein: 24, carbs: 3, fat: 2 },
    { id: "food-avocado", name: "牛油果", serving: "50 g", protein: 1, carbs: 4, fat: 7.5 },
    { id: "food-nuts", name: "混合坚果", serving: "15 g", protein: 3, carbs: 3, fat: 8 },
    { id: "food-sweet-potato", name: "红薯（熟）", serving: "100 g", protein: 1.6, carbs: 20, fat: 0.1 },
    { id: "food-beef", name: "瘦牛肉（熟）", serving: "100 g", protein: 26, carbs: 0, fat: 10 },
    { id: "food-shrimp", name: "虾仁（熟）", serving: "100 g", protein: 24, carbs: 1, fat: 1 },
    { id: "food-wholewheat-bread", name: "全麦面包", serving: "1 片（约 35 g）", protein: 4, carbs: 17, fat: 1 },
    { id: "food-potato", name: "土豆（熟）", serving: "100 g", protein: 2, carbs: 17, fat: 0.1 },
  ];

  const DEFAULT_EXERCISES = [
    { id: "ex-incline-press", name: "上斜卧推", muscle: "胸", targetReps: "6-10" },
    { id: "ex-bench-press", name: "平板卧推", muscle: "胸", targetReps: "6-10" },
    { id: "ex-chest-fly", name: "夹胸", muscle: "胸", targetReps: "10-15" },
    { id: "ex-triceps-pushdown", name: "绳索下压", muscle: "肱三头", targetReps: "10-15" },
    { id: "ex-overhead-extension", name: "过顶臂屈伸", muscle: "肱三头", targetReps: "10-15" },
    { id: "ex-crunch", name: "卷腹", muscle: "腹部", targetReps: "12-20" },
    { id: "ex-squat", name: "深蹲", muscle: "腿", targetReps: "6-10" },
    { id: "ex-rdl", name: "罗马尼亚硬拉", muscle: "腿/臀", targetReps: "8-10" },
    { id: "ex-leg-curl", name: "腿弯举", muscle: "腿", targetReps: "10-15" },
    { id: "ex-calf-raise", name: "提踵", muscle: "小腿", targetReps: "12-20" },
    { id: "ex-shoulder-press", name: "坐姿肩推", muscle: "肩", targetReps: "6-10" },
    { id: "ex-lateral-raise", name: "侧平举", muscle: "肩", targetReps: "12-20" },
    { id: "ex-reverse-fly", name: "反向飞鸟", muscle: "后束", targetReps: "12-20" },
    { id: "ex-lat-pulldown", name: "高位下拉", muscle: "背", targetReps: "8-12" },
    { id: "ex-seated-row", name: "坐姿划船", muscle: "背", targetReps: "8-12" },
    { id: "ex-one-arm-row", name: "单臂划船", muscle: "背", targetReps: "8-12" },
    { id: "ex-face-pull", name: "面拉", muscle: "后束", targetReps: "12-20" },
    { id: "ex-curl", name: "弯举", muscle: "肱二头", targetReps: "10-15" },
    { id: "ex-hammer-curl", name: "锤式弯举", muscle: "肱二头", targetReps: "10-15" },
  ];

  const WORKOUT_TEMPLATES = {
    chest: {
      title: "胸 + 三头 + 腹部",
      short: "胸 / 三头 / 腹",
      exerciseIds: [
        "ex-incline-press",
        "ex-bench-press",
        "ex-chest-fly",
        "ex-triceps-pushdown",
        "ex-overhead-extension",
        "ex-crunch",
      ],
    },
    legs_shoulders: {
      title: "腿 + 臀 + 肩 + 腹部",
      short: "腿 / 臀 / 肩",
      exerciseIds: [
        "ex-squat",
        "ex-rdl",
        "ex-leg-curl",
        "ex-calf-raise",
        "ex-shoulder-press",
        "ex-lateral-raise",
        "ex-reverse-fly",
        "ex-crunch",
      ],
    },
    back: {
      title: "背 + 二头 + 后束",
      short: "背 / 二头 / 后束",
      exerciseIds: [
        "ex-lat-pulldown",
        "ex-seated-row",
        "ex-one-arm-row",
        "ex-face-pull",
        "ex-curl",
        "ex-hammer-curl",
      ],
    },
    rest: {
      title: "休息日",
      short: "休息",
      exerciseIds: [],
    },
  };

  const DEFAULT_TARGETS = {
    p1Training: { calories: 2700, protein: 185, carbs: 330, fat: 70 },
    p1Rest: { calories: 2200, protein: 185, carbs: 210, fat: 70 },
    p2Training: { calories: 2500, protein: 185, carbs: 280, fat: 70 },
    p2Rest: { calories: 2000, protein: 185, carbs: 160, fat: 70 },
  };

  const ui = {
    screen: "today",
    date: todayISO(),
    calendarMonth: firstDayOfMonth(todayISO()),
    calendarDate: todayISO(),
    editingFoodId: null,
    editingExerciseId: null,
    toastTimer: null,
  };

  let state = normalizeState(loadState());

  function createDefaultState() {
    return {
      version: 1,
      settings: {
        startDate: todayISO(),
        targets: clone(DEFAULT_TARGETS),
      },
      foods: clone(DEFAULT_FOODS),
      customExercises: [],
      foodLogs: {},
      workouts: {},
      body: {},
    };
  }

  function normalizeState(raw) {
    const defaults = createDefaultState();
    if (!raw || typeof raw !== "object") return defaults;
    return {
      version: 1,
      settings: {
        startDate: raw.settings?.startDate || defaults.settings.startDate,
        targets: {
          p1Training: { ...defaults.settings.targets.p1Training, ...(raw.settings?.targets?.p1Training || {}) },
          p1Rest: { ...defaults.settings.targets.p1Rest, ...(raw.settings?.targets?.p1Rest || {}) },
          p2Training: { ...defaults.settings.targets.p2Training, ...(raw.settings?.targets?.p2Training || {}) },
          p2Rest: { ...defaults.settings.targets.p2Rest, ...(raw.settings?.targets?.p2Rest || {}) },
        },
      },
      foods: Array.isArray(raw.foods) && raw.foods.length ? raw.foods : defaults.foods,
      customExercises: Array.isArray(raw.customExercises) ? raw.customExercises : [],
      foodLogs: raw.foodLogs && typeof raw.foodLogs === "object" ? raw.foodLogs : {},
      workouts: raw.workouts && typeof raw.workouts === "object" ? raw.workouts : {},
      body: raw.body && typeof raw.body === "object" ? raw.body : {},
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("读取本地数据失败", error);
      return null;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      toast("保存失败，请检查浏览器存储空间");
      console.error(error);
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uid(prefix) {
    if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function todayISO() {
    return toISO(new Date());
  }

  function toISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function fromISO(value) {
    const [year, month, day] = String(value).split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function addDays(value, amount) {
    const date = fromISO(value);
    date.setDate(date.getDate() + amount);
    return toISO(date);
  }

  function dateDiff(from, to) {
    const a = fromISO(from);
    const b = fromISO(to);
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((utcB - utcA) / 86400000);
  }

  function firstDayOfMonth(value) {
    const date = fromISO(value);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function formatLongDate(value) {
    const date = fromISO(value);
    const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  }

  function formatMonth(value) {
    return `${value.getFullYear()}年${value.getMonth() + 1}月`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function numberValue(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function formatNumber(value, digits = 0) {
    return numberValue(value).toLocaleString("zh-CN", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function foodCalories(food) {
    return numberValue(food.protein) * 4 + numberValue(food.carbs) * 4 + numberValue(food.fat) * 9;
  }

  function getPlan(date) {
    const diff = dateDiff(state.settings.startDate, date);
    const cycleIndex = ((diff % CYCLE_TYPES.length) + CYCLE_TYPES.length) % CYCLE_TYPES.length;
    const plannedType = CYCLE_TYPES[cycleIndex];
    const week = Math.floor(diff / 7) + 1;
    const phase = week <= 8 ? 1 : 2;
    const savedType = state.workouts[date]?.dayType;
    const effectiveType = savedType || plannedType;
    const isRest = effectiveType === "rest";
    const targetKey = `p${phase}${isRest ? "Rest" : "Training"}`;
    return {
      diff,
      week,
      phase,
      cycleIndex,
      plannedType,
      effectiveType,
      isRest,
      template: WORKOUT_TEMPLATES[effectiveType] || WORKOUT_TEMPLATES.rest,
      target: state.settings.targets[targetKey],
    };
  }

  function getFoodById(foodId) {
    return state.foods.find((food) => food.id === foodId);
  }

  function getFoodLogs(date) {
    return Array.isArray(state.foodLogs[date]) ? state.foodLogs[date] : [];
  }

  function scaledFood(log) {
    const quantity = numberValue(log.quantity);
    return {
      calories: (numberValue(log.protein) * 4 + numberValue(log.carbs) * 4 + numberValue(log.fat) * 9) * quantity,
      protein: numberValue(log.protein) * quantity,
      carbs: numberValue(log.carbs) * quantity,
      fat: numberValue(log.fat) * quantity,
    };
  }

  function sumFoodLogs(date) {
    return getFoodLogs(date).reduce(
      (total, log) => {
        const macros = scaledFood(log);
        total.calories += macros.calories;
        total.protein += macros.protein;
        total.carbs += macros.carbs;
        total.fat += macros.fat;
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }

  function getBody(date) {
    return state.body[date] && typeof state.body[date] === "object" ? state.body[date] : {};
  }

  function bodyHasData(date) {
    const body = getBody(date);
    return ["weight", "waist", "arm"].some((key) => body[key] !== "" && body[key] !== null && body[key] !== undefined);
  }

  function allExercises() {
    return [...DEFAULT_EXERCISES, ...state.customExercises];
  }

  function getExercise(exerciseId) {
    return allExercises().find((exercise) => exercise.id === exerciseId);
  }

  function createWorkout(date, dayType) {
    const template = WORKOUT_TEMPLATES[dayType] || WORKOUT_TEMPLATES.rest;
    const exercises = template.exerciseIds
      .map((exerciseId) => {
        const exercise = getExercise(exerciseId);
        if (!exercise) return null;
        return {
          instanceId: uid("workout-exercise"),
          exerciseId: exercise.id,
          name: exercise.name,
          muscle: exercise.muscle,
          targetReps: exercise.targetReps,
          sets: Array.from({ length: 3 }, () => ({ weight: "", reps: "" })),
        };
      })
      .filter(Boolean);

    state.workouts[date] = {
      dayType,
      completed: false,
      exercises,
      createdAt: new Date().toISOString(),
    };
    saveState();
  }

  function workoutVolume(workout) {
    if (!workout?.exercises) return 0;
    return workout.exercises.reduce(
      (total, exercise) =>
        total +
        exercise.sets.reduce(
          (exerciseTotal, set) => exerciseTotal + numberValue(set.weight) * numberValue(set.reps),
          0,
        ),
      0,
    );
  }

  function workoutSetCount(workout) {
    if (!workout?.exercises) return 0;
    return workout.exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.filter((set) => numberValue(set.weight) > 0 || numberValue(set.reps) > 0).length,
      0,
    );
  }

  function macrosRemaining(target, consumed) {
    return {
      calories: numberValue(target.calories) - consumed.calories,
      protein: numberValue(target.protein) - consumed.protein,
      carbs: numberValue(target.carbs) - consumed.carbs,
      fat: numberValue(target.fat) - consumed.fat,
    };
  }

  function progressWidth(consumed, target) {
    const percent = numberValue(target) > 0 ? (numberValue(consumed) / numberValue(target)) * 100 : 0;
    return Math.min(Math.max(percent, 0), 100);
  }

  function remainingText(value, unit) {
    if (value >= 0) return `剩余 ${formatNumber(value, unit === "kcal" ? 0 : 1)} ${unit}`;
    return `超出 ${formatNumber(Math.abs(value), unit === "kcal" ? 0 : 1)} ${unit}`;
  }

  function macroDashboard(target, consumed) {
    const remaining = macrosRemaining(target, consumed);
    const calorieProgress = Math.min(
      numberValue(target.calories) > 0 ? (consumed.calories / target.calories) * 360 : 0,
      360,
    );
    return `
      <section class="card macro-summary">
        <div class="calorie-row">
          <div class="calorie-ring" style="--progress:${calorieProgress}deg">
            <div class="calorie-value">
              <strong>${formatNumber(remaining.calories)}</strong>
              <span>${remaining.calories >= 0 ? "kcal 可用" : "kcal 超出"}</span>
            </div>
          </div>
          <div class="calorie-copy">
            <h3>${formatLongDate(ui.date)}</h3>
            <p>目标 ${formatNumber(target.calories)} kcal，已摄入 ${formatNumber(consumed.calories)} kcal</p>
          </div>
        </div>
        <div class="macro-bars">
          ${macroBar("蛋白质", consumed.protein, target.protein, remaining.protein, "g", "--green")}
          ${macroBar("碳水", consumed.carbs, target.carbs, remaining.carbs, "g", "--blue")}
          ${macroBar("脂肪", consumed.fat, target.fat, remaining.fat, "g", "--gold")}
        </div>
      </section>
    `;
  }

  function macroBar(label, consumed, target, remaining, unit, color) {
    return `
      <div class="macro-row">
        <div class="macro-label">
          <span>${label} · ${formatNumber(consumed, 0)} / ${formatNumber(target, 0)} ${unit}</span>
          <strong>${remainingText(remaining, unit)}</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="--width:${progressWidth(consumed, target)}%;--bar:var(${color})"></div>
        </div>
      </div>
    `;
  }

  function renderApp() {
    const screen = document.getElementById("screen");
    const title = document.getElementById("screen-title");
    const dateLabel = document.getElementById("date-label");
    const titles = {
      today: "今日",
      diet: "饮食追踪",
      workout: "训练记录",
      calendar: "身体日历",
    };
    title.textContent = titles[ui.screen] || "重组 16";
    dateLabel.textContent = ui.screen === "calendar" ? formatMonth(ui.calendarMonth) : formatLongDate(ui.date);

    if (ui.screen === "today") screen.innerHTML = renderToday();
    if (ui.screen === "diet") screen.innerHTML = renderDiet();
    if (ui.screen === "workout") screen.innerHTML = renderWorkout();
    if (ui.screen === "calendar") screen.innerHTML = renderCalendar();

    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.nav === ui.screen);
    });
    refreshIcons();
  }

  function renderDateNavigator() {
    return `
      <div class="card compact row-between">
        <button class="button button-quiet button-small" type="button" data-action="previous-day">前一天</button>
        <div style="text-align:center">
          <strong>${formatLongDate(ui.date)}</strong><br />
          <span class="muted small">${ui.date === todayISO() ? "今天" : "可记录日期"}</span>
        </div>
        <button class="button button-quiet button-small" type="button" data-action="next-day">后一天</button>
      </div>
    `;
  }

  function renderToday() {
    const target = getPlan(ui.date).target;
    const consumed = sumFoodLogs(ui.date);
    const logs = getFoodLogs(ui.date).slice(-6).reverse();
    const plan = getPlan(ui.date);
    const workout = state.workouts[ui.date];
    const body = getBody(ui.date);

    return `
      ${renderDateNavigator()}
      ${macroDashboard(target, consumed)}
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">快速记录</h2>
          <span class="chip ${plan.isRest ? "" : "green"}">第 ${plan.week} 周 · ${plan.isRest ? "休息日" : "训练日"}</span>
        </div>
        <div class="quick-actions">
          <button class="quick-action" type="button" data-action="add-food">
            <i data-lucide="plus-circle"></i>
            <span>添加食物</span>
          </button>
          <button class="quick-action" type="button" data-nav="workout">
            <i data-lucide="dumbbell"></i>
            <span>记录训练</span>
          </button>
          <button class="quick-action" type="button" data-nav="calendar">
            <i data-lucide="ruler"></i>
            <span>身体数据</span>
          </button>
        </div>
      </section>
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">今日饮食</h2>
          <button class="button button-primary button-small" type="button" data-action="add-food">
            <i data-lucide="plus"></i>
            添加
          </button>
        </div>
        ${
          logs.length
            ? `<div class="list">${logs.map((log) => renderFoodLogRow(log, false)).join("")}</div>`
            : `<div class="empty-state">今天还没有添加食物</div>`
        }
      </section>
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">今日训练</h2>
          <span class="chip ${workout?.completed ? "green" : plan.isRest ? "" : "blue"}">
            ${workout?.completed ? "已完成" : plan.template.short}
          </span>
        </div>
        <div class="metric-grid">
          <div class="metric-box">
            <span class="metric-label">训练动作</span>
            <strong>${workout?.exercises?.length || 0}</strong>
          </div>
          <div class="metric-box">
            <span class="metric-label">已完成组数</span>
            <strong>${workoutSetCount(workout)}</strong>
          </div>
          <div class="metric-box span-2">
            <span class="metric-label">训练容量</span>
            <strong>${formatNumber(workoutVolume(workout))} kg</strong>
          </div>
        </div>
      </section>
      <section class="card compact">
        <div class="row-between">
          <div>
            <span class="metric-label">身体数据</span>
            <strong class="numeric">${body.weight ? `${body.weight} kg` : "未记录"}</strong>
          </div>
          <button class="button button-quiet button-small" type="button" data-nav="calendar">查看日历</button>
        </div>
      </section>
    `;
  }

  function renderDiet() {
    const plan = getPlan(ui.date);
    const consumed = sumFoodLogs(ui.date);
    const target = plan.target;
    const logs = getFoodLogs(ui.date);

    return `
      ${renderDateNavigator()}
      ${macroDashboard(target, consumed)}
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">饮食记录</h2>
          <div class="list-row-actions">
            <button class="button button-quiet button-small" type="button" data-action="open-food-library">
              <i data-lucide="book-open"></i>
              食物库
            </button>
            <button class="button button-primary button-small" type="button" data-action="add-food">
              <i data-lucide="plus"></i>
              添加食物
            </button>
          </div>
        </div>
        ${
          logs.length
            ? MEALS.map((meal) => renderMealGroup(meal, logs.filter((log) => log.meal === meal))).join("")
            : `<div class="empty-state">选择食物和份数后，这里会自动扣除当日宏量余额</div>`
        }
      </section>
    `;
  }

  function renderMealGroup(meal, logs) {
    if (!logs.length) return "";
    const total = logs.reduce(
      (sum, log) => {
        const macros = scaledFood(log);
        sum.calories += macros.calories;
        return sum;
      },
      { calories: 0 },
    );
    return `
      <div class="meal-group">
        <div class="meal-heading">
          <span>${meal}</span>
          <span>${formatNumber(total.calories)} kcal</span>
        </div>
        <div class="list">${logs.map((log) => renderFoodLogRow(log, true)).join("")}</div>
      </div>
    `;
  }

  function renderFoodLogRow(log, showDelete) {
    const macros = scaledFood(log);
    return `
      <div class="list-row">
        <div class="list-row-main">
          <strong>${escapeHtml(log.name)}</strong>
          <span>${escapeHtml(log.serving)} × ${formatNumber(log.quantity, 2)} · 蛋白 ${formatNumber(macros.protein, 1)} / 碳水 ${formatNumber(macros.carbs, 1)} / 脂肪 ${formatNumber(macros.fat, 1)}</span>
        </div>
        <div class="list-row-actions">
          <span class="chip">${formatNumber(macros.calories)} kcal</span>
          ${
            showDelete
              ? `<button class="icon-button danger" type="button" data-action="delete-food-log" data-log-id="${escapeHtml(log.id)}" aria-label="删除食物记录"><i data-lucide="trash-2"></i></button>`
              : ""
          }
        </div>
      </div>
    `;
  }

  function renderWorkout() {
    const plan = getPlan(ui.date);
    const workout = state.workouts[ui.date];
    const type = workout?.dayType || plan.plannedType;
    const template = WORKOUT_TEMPLATES[type] || WORKOUT_TEMPLATES.rest;
    const totalSets = workoutSetCount(workout);

    return `
      ${renderDateNavigator()}
      <section class="card">
        <div class="card-header">
          <div>
            <span class="metric-label">第 ${plan.week} 周 · 第 ${plan.phase} 阶段</span>
            <h2 class="card-title">${template.title}</h2>
          </div>
          <span class="chip ${workout?.completed ? "green" : plan.isRest ? "" : "blue"}" data-workout-chip>
            ${workout?.completed ? "训练完成" : `${totalSets} 组已记录`}
          </span>
        </div>
        <div class="field">
          <label for="workout-day-type">今天的训练类型</label>
          <select id="workout-day-type" class="select" data-action="change-workout-type">
            ${Object.entries(WORKOUT_TEMPLATES)
              .map(
                ([key, value]) =>
                  `<option value="${key}" ${key === type ? "selected" : ""}>${escapeHtml(value.title)}</option>`,
              )
              .join("")}
          </select>
        </div>
      </section>
      ${
        workout
          ? `
            <section class="card">
              <div class="card-header">
                <h2 class="card-title">动作与重量</h2>
                <button class="button button-quiet button-small" type="button" data-action="open-add-exercise">
                  <i data-lucide="plus"></i>
                  添加动作
                </button>
              </div>
              <div class="list">
                ${
                  workout.exercises.length
                    ? workout.exercises.map(renderWorkoutExercise).join("")
                    : `<div class="empty-state">当天没有预设动作，可手动添加</div>`
                }
              </div>
            </section>
            <section class="card">
              <div class="metric-grid">
                <div class="metric-box">
                  <span class="metric-label">总动作</span>
                  <strong>${workout.exercises.length}</strong>
                </div>
                <div class="metric-box">
                  <span class="metric-label">有效组数</span>
                  <strong data-workout-total-sets>${totalSets}</strong>
                </div>
                <div class="metric-box span-2">
                  <span class="metric-label">训练容量</span>
                  <strong data-workout-volume>${formatNumber(workoutVolume(workout))} kg</strong>
                </div>
              </div>
              <div class="divider"></div>
              <button class="button ${workout.completed ? "button-quiet" : "button-green"} button-full" type="button" data-action="toggle-workout">
                <i data-lucide="${workout.completed ? "rotate-ccw" : "check"}"></i>
                ${workout.completed ? "撤销完成状态" : "标记训练完成"}
              </button>
            </section>
          `
          : `
            <section class="card">
              <div class="empty-state">
                ${
                  type === "rest"
                    ? "今天是计划休息日。需要临时训练时，可以在上方切换训练类型。"
                    : "还没有生成今天的训练记录。"
                }
              </div>
              ${
                type === "rest"
                  ? ""
                  : `<button class="button button-primary button-full" type="button" data-action="generate-workout"><i data-lucide="list-plus"></i> 生成今日训练</button>`
              }
            </section>
          `
      }
    `;
  }

  function renderWorkoutExercise(exercise) {
    return `
      <div class="workout-exercise">
        <div class="exercise-topline">
          <div>
            <h3>${escapeHtml(exercise.name)}</h3>
            <span class="muted small">${escapeHtml(exercise.muscle)} · 目标 ${escapeHtml(exercise.targetReps)} 次</span>
          </div>
          <button class="icon-button danger" type="button" data-action="remove-workout-exercise" data-instance-id="${escapeHtml(exercise.instanceId)}" aria-label="删除动作"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="set-table">
          <div class="set-header">
            <span>组</span>
            <span>重量 kg</span>
            <span>次数</span>
            <span></span>
          </div>
          ${exercise.sets
            .map(
              (set, index) => `
                <div class="set-row">
                  <span class="set-number">${index + 1}</span>
                  <input type="number" min="0" step="0.5" inputmode="decimal" value="${escapeHtml(set.weight)}" data-set-input data-instance-id="${escapeHtml(exercise.instanceId)}" data-set-index="${index}" data-field="weight" aria-label="${escapeHtml(exercise.name)}第 ${index + 1} 组重量" />
                  <input type="number" min="0" step="1" inputmode="numeric" value="${escapeHtml(set.reps)}" data-set-input data-instance-id="${escapeHtml(exercise.instanceId)}" data-set-index="${index}" data-field="reps" aria-label="${escapeHtml(exercise.name)}第 ${index + 1} 组次数" />
                  <button class="icon-button" type="button" data-action="remove-set" data-instance-id="${escapeHtml(exercise.instanceId)}" data-set-index="${index}" aria-label="删除第 ${index + 1} 组"><i data-lucide="minus"></i></button>
                </div>
              `,
            )
            .join("")}
        </div>
        <button class="button button-quiet button-small" type="button" data-action="add-set" data-instance-id="${escapeHtml(exercise.instanceId)}">
          <i data-lucide="plus"></i>
          添加一组
        </button>
      </div>
    `;
  }

  function renderCalendar() {
    const selectedPlan = getPlan(ui.calendarDate);
    const consumed = sumFoodLogs(ui.calendarDate);
    const workout = state.workouts[ui.calendarDate];
    const body = getBody(ui.calendarDate);

    return `
      <section class="card">
        <div class="calendar-toolbar">
          <button class="icon-button" type="button" data-action="previous-month" aria-label="上个月"><i data-lucide="chevron-left"></i></button>
          <h3>${formatMonth(ui.calendarMonth)}</h3>
          <button class="icon-button" type="button" data-action="next-month" aria-label="下个月"><i data-lucide="chevron-right"></i></button>
        </div>
        <div class="calendar-weekdays">
          ${["一", "二", "三", "四", "五", "六", "日"].map((day) => `<span>${day}</span>`).join("")}
        </div>
        <div class="calendar-grid">
          ${renderCalendarGrid()}
        </div>
      </section>
      <section class="card">
        <div class="card-header">
          <div>
            <span class="metric-label">${formatLongDate(ui.calendarDate)}</span>
            <h2 class="card-title">身体数据</h2>
          </div>
          <span class="chip ${selectedPlan.isRest ? "" : "green"}">${selectedPlan.isRest ? "休息日" : "训练日"}</span>
        </div>
        <form id="body-form" class="field-grid">
          <div class="field">
            <label for="body-weight">体重 kg</label>
            <input class="input" id="body-weight" name="weight" type="number" min="0" step="0.1" inputmode="decimal" value="${escapeHtml(body.weight ?? "")}" />
          </div>
          <div class="field">
            <label for="body-waist">腰围 cm</label>
            <input class="input" id="body-waist" name="waist" type="number" min="0" step="0.1" inputmode="decimal" value="${escapeHtml(body.waist ?? "")}" />
          </div>
          <div class="field">
            <label for="body-arm">臂围 cm</label>
            <input class="input" id="body-arm" name="arm" type="number" min="0" step="0.1" inputmode="decimal" value="${escapeHtml(body.arm ?? "")}" />
          </div>
          <div class="field" style="align-self:end">
            <button class="button button-primary button-full" type="submit">保存当天数据</button>
          </div>
        </form>
      </section>
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">当天记录</h2>
          <button class="button button-quiet button-small" type="button" data-action="go-calendar-today">回到今天</button>
        </div>
        <div class="metric-grid">
          <div class="metric-box">
            <span class="metric-label">热量</span>
            <strong>${formatNumber(consumed.calories)} / ${formatNumber(selectedPlan.target.calories)}</strong>
          </div>
          <div class="metric-box">
            <span class="metric-label">蛋白质</span>
            <strong>${formatNumber(consumed.protein)} / ${formatNumber(selectedPlan.target.protein)} g</strong>
          </div>
          <div class="metric-box">
            <span class="metric-label">碳水</span>
            <strong>${formatNumber(consumed.carbs)} / ${formatNumber(selectedPlan.target.carbs)} g</strong>
          </div>
          <div class="metric-box">
            <span class="metric-label">脂肪</span>
            <strong>${formatNumber(consumed.fat)} / ${formatNumber(selectedPlan.target.fat)} g</strong>
          </div>
          <div class="metric-box span-2">
            <span class="metric-label">训练</span>
            <strong>${workout ? `${escapeHtml(workout.exercises.length)} 个动作 · ${formatNumber(workoutVolume(workout))} kg` : selectedPlan.isRest ? "计划休息" : "未记录"}</strong>
          </div>
        </div>
      </section>
    `;
  }

  function renderCalendarGrid() {
    const year = ui.calendarMonth.getFullYear();
    const month = ui.calendarMonth.getMonth();
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const mondayOffset = (first.getDay() + 6) % 7;
    const totalCells = Math.ceil((mondayOffset + daysInMonth) / 7) * 7;
    let html = "";

    for (let index = 0; index < totalCells; index += 1) {
      const dayNumber = index - mondayOffset + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        html += `<span class="calendar-day is-outside"></span>`;
        continue;
      }
      const date = toISO(new Date(year, month, dayNumber));
      const isSelected = date === ui.calendarDate;
      const isToday = date === todayISO();
      const hasDiet = getFoodLogs(date).length > 0;
      const hasWorkout = Boolean(state.workouts[date]?.completed || workoutSetCount(state.workouts[date]) > 0);
      const hasBody = bodyHasData(date);
      html += `
        <button class="calendar-day ${isSelected ? "is-selected" : ""} ${isToday ? "is-today" : ""}" type="button" data-action="select-calendar-date" data-date="${date}">
          <span>${dayNumber}</span>
          <span class="day-dots">
            ${hasDiet ? `<span class="dot diet"></span>` : ""}
            ${hasWorkout ? `<span class="dot workout"></span>` : ""}
            ${hasBody ? `<span class="dot body"></span>` : ""}
          </span>
        </button>
      `;
    }
    return html;
  }

  function refreshIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function refreshWorkoutTotals() {
    const workout = state.workouts[ui.date];
    const totalSets = workoutSetCount(workout);
    const totalVolume = workoutVolume(workout);
    const chip = document.querySelector("[data-workout-chip]");
    const setCounter = document.querySelector("[data-workout-total-sets]");
    const volume = document.querySelector("[data-workout-volume]");

    if (chip && !workout?.completed) chip.textContent = `${totalSets} 组已记录`;
    if (setCounter) setCounter.textContent = String(totalSets);
    if (volume) volume.textContent = `${formatNumber(totalVolume)} kg`;
  }

  function openModal(title, content) {
    const root = document.getElementById("modal-root");
    root.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal-backdrop">
        <section class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
          <header class="modal-header">
            <h2>${escapeHtml(title)}</h2>
            <button class="icon-button" type="button" data-action="close-modal" aria-label="关闭"><i data-lucide="x"></i></button>
          </header>
          <div class="modal-body">${content}</div>
        </section>
      </div>
    `;
    refreshIcons();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("modal-root").innerHTML = "";
    document.body.style.overflow = "";
  }

  function openFoodLogModal() {
    if (!state.foods.length) {
      toast("请先在食物库中添加食物");
      openFoodLibrary();
      return;
    }
    const options = state.foods
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
      .map(
        (food) =>
          `<option value="${escapeHtml(food.id)}">${escapeHtml(food.name)} · ${escapeHtml(food.serving)} · ${formatNumber(foodCalories(food))} kcal</option>`,
      )
      .join("");
    openModal(
      "添加食物",
      `
        <form id="food-log-form" class="field-grid">
          <div class="field span-2">
            <label for="food-log-food">食物</label>
            <select class="select" id="food-log-food" name="foodId" required>${options}</select>
          </div>
          <div class="field">
            <label for="food-log-quantity">份数</label>
            <input class="input" id="food-log-quantity" name="quantity" type="number" min="0.1" step="0.1" inputmode="decimal" value="1" required />
          </div>
          <div class="field">
            <label for="food-log-meal">餐次</label>
            <select class="select" id="food-log-meal" name="meal">${MEALS.map((meal) => `<option value="${meal}">${meal}</option>`).join("")}</select>
          </div>
          <div class="field span-2">
            <div id="food-log-preview" class="chip-row"></div>
          </div>
          <div class="form-actions span-2">
            <button class="button button-quiet" type="button" data-action="close-modal">取消</button>
            <button class="button button-primary" type="submit">加入今天</button>
          </div>
        </form>
      `,
    );
    updateFoodLogPreview();
  }

  function updateFoodLogPreview() {
    const foodSelect = document.getElementById("food-log-food");
    const quantityInput = document.getElementById("food-log-quantity");
    const preview = document.getElementById("food-log-preview");
    if (!foodSelect || !quantityInput || !preview) return;
    const food = getFoodById(foodSelect.value);
    if (!food) return;
    const quantity = Math.max(numberValue(quantityInput.value), 0);
    const macros = {
      protein: numberValue(food.protein) * quantity,
      carbs: numberValue(food.carbs) * quantity,
      fat: numberValue(food.fat) * quantity,
      calories: foodCalories(food) * quantity,
    };
    preview.innerHTML = `
      <span class="chip green">蛋白 ${formatNumber(macros.protein, 1)} g</span>
      <span class="chip blue">碳水 ${formatNumber(macros.carbs, 1)} g</span>
      <span class="chip gold">脂肪 ${formatNumber(macros.fat, 1)} g</span>
      <span class="chip">${formatNumber(macros.calories)} kcal</span>
    `;
  }

  function openFoodLibrary() {
    const editing = ui.editingFoodId ? getFoodById(ui.editingFoodId) : null;
    const foods = state.foods.slice().sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    openModal(
      "食物库",
      `
        <form id="food-library-form" class="field-grid">
          <div class="field span-2">
            <label for="food-name">食物名称</label>
            <input class="input" id="food-name" name="name" required value="${escapeHtml(editing?.name || "")}" placeholder="例如：我买的全麦面包" />
          </div>
          <div class="field">
            <label for="food-serving">一份描述</label>
            <input class="input" id="food-serving" name="serving" required value="${escapeHtml(editing?.serving || "")}" placeholder="例如：1 片 35 g" />
          </div>
          <div class="field">
            <label for="food-protein">每份蛋白质 g</label>
            <input class="input" id="food-protein" name="protein" type="number" min="0" step="0.1" inputmode="decimal" required value="${escapeHtml(editing?.protein ?? "")}" data-food-macro />
          </div>
          <div class="field">
            <label for="food-carbs">每份碳水 g</label>
            <input class="input" id="food-carbs" name="carbs" type="number" min="0" step="0.1" inputmode="decimal" required value="${escapeHtml(editing?.carbs ?? "")}" data-food-macro />
          </div>
          <div class="field">
            <label for="food-fat">每份脂肪 g</label>
            <input class="input" id="food-fat" name="fat" type="number" min="0" step="0.1" inputmode="decimal" required value="${escapeHtml(editing?.fat ?? "")}" data-food-macro />
          </div>
          <div class="field span-2">
            <span class="field-label">自动计算热量</span>
            <div id="food-calorie-preview" class="chip-row"></div>
          </div>
          <div class="form-actions span-2">
            ${
              editing
                ? `<button class="button button-quiet" type="button" data-action="cancel-food-edit">取消编辑</button>`
                : `<button class="button button-quiet" type="button" data-action="close-modal">关闭</button>`
            }
            <button class="button button-primary" type="submit">${editing ? "保存修改" : "添加食物"}</button>
          </div>
        </form>
        <div class="divider"></div>
        <div class="section-header">
          <h3 class="section-title">已有食物</h3>
          <span class="muted small">${state.foods.length} 项</span>
        </div>
        <div class="list">
          ${foods
            .map(
              (food) => `
                <div class="list-row">
                  <div class="list-row-main">
                    <strong>${escapeHtml(food.name)}</strong>
                    <span>${escapeHtml(food.serving)} · 蛋白 ${formatNumber(food.protein, 1)} / 碳水 ${formatNumber(food.carbs, 1)} / 脂肪 ${formatNumber(food.fat, 1)} · ${formatNumber(foodCalories(food))} kcal</span>
                  </div>
                  <div class="list-row-actions">
                    <button class="icon-button" type="button" data-action="edit-food" data-food-id="${escapeHtml(food.id)}" aria-label="编辑食物"><i data-lucide="pencil"></i></button>
                    <button class="icon-button danger" type="button" data-action="delete-food" data-food-id="${escapeHtml(food.id)}" aria-label="删除食物"><i data-lucide="trash-2"></i></button>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      `,
    );
    updateFoodCaloriePreview();
  }

  function updateFoodCaloriePreview() {
    const preview = document.getElementById("food-calorie-preview");
    if (!preview) return;
    const protein = numberValue(document.getElementById("food-protein")?.value);
    const carbs = numberValue(document.getElementById("food-carbs")?.value);
    const fat = numberValue(document.getElementById("food-fat")?.value);
    const calories = protein * 4 + carbs * 4 + fat * 9;
    preview.innerHTML = `<span class="chip">${formatNumber(calories)} kcal / 份</span>`;
  }

  function openSettings() {
    const targets = state.settings.targets;
    openModal(
      "设置",
      `
        <form id="settings-form" class="field-grid">
          <div class="field span-2">
            <label for="start-date">计划起始日期</label>
            <input class="input" id="start-date" name="startDate" type="date" required value="${escapeHtml(state.settings.startDate)}" />
          </div>
          ${targetEditor("第 1 阶段训练日", "p1Training", targets.p1Training)}
          ${targetEditor("第 1 阶段休息日", "p1Rest", targets.p1Rest)}
          ${targetEditor("第 2 阶段训练日", "p2Training", targets.p2Training)}
          ${targetEditor("第 2 阶段休息日", "p2Rest", targets.p2Rest)}
          <div class="form-actions span-2">
            <button class="button button-primary" type="submit">保存设置</button>
          </div>
        </form>
        <div class="divider"></div>
        <div class="field-grid">
          <button class="button button-quiet" type="button" data-action="open-food-library"><i data-lucide="book-open"></i>食物库</button>
          <button class="button button-quiet" type="button" data-action="open-exercise-library"><i data-lucide="list"></i>动作库</button>
        </div>
        <div class="divider"></div>
        <div class="section-header">
          <h3 class="section-title">数据备份</h3>
        </div>
        <p class="muted small" style="margin:0">数据保存在当前浏览器。清理站点数据或更换设备前，请先导出备份。</p>
        <div class="field-grid">
          <button class="button button-quiet" type="button" data-action="export-data"><i data-lucide="download"></i>导出 JSON</button>
          <button class="button button-quiet" type="button" data-action="import-data"><i data-lucide="upload"></i>导入 JSON</button>
        </div>
        <input id="import-file" type="file" accept="application/json,.json" hidden data-import-input />
        <button class="button button-danger button-full" type="button" data-action="reset-data"><i data-lucide="triangle-alert"></i>清空全部数据</button>
      `,
    );
  }

  function targetEditor(label, key, values) {
    return `
      <div class="field span-2">
        <span class="field-label">${label}</span>
        <div class="field-grid">
          <div class="field">
            <label for="${key}-calories">热量 kcal</label>
            <input class="input" id="${key}-calories" name="${key}.calories" type="number" min="0" step="10" required value="${escapeHtml(values.calories)}" />
          </div>
          <div class="field">
            <label for="${key}-protein">蛋白质 g</label>
            <input class="input" id="${key}-protein" name="${key}.protein" type="number" min="0" step="1" required value="${escapeHtml(values.protein)}" />
          </div>
          <div class="field">
            <label for="${key}-carbs">碳水 g</label>
            <input class="input" id="${key}-carbs" name="${key}.carbs" type="number" min="0" step="1" required value="${escapeHtml(values.carbs)}" />
          </div>
          <div class="field">
            <label for="${key}-fat">脂肪 g</label>
            <input class="input" id="${key}-fat" name="${key}.fat" type="number" min="0" step="1" required value="${escapeHtml(values.fat)}" />
          </div>
        </div>
      </div>
    `;
  }

  function openAddExercise() {
    const exercises = allExercises().slice().sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    openModal(
      "添加训练动作",
      `
        <form id="add-exercise-form" class="field-grid">
          <div class="field span-2">
            <label for="add-exercise-id">选择动作</label>
            <select class="select" id="add-exercise-id" name="exerciseId" required>
              ${exercises.map((exercise) => `<option value="${escapeHtml(exercise.id)}">${escapeHtml(exercise.name)} · ${escapeHtml(exercise.muscle)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="add-exercise-sets">初始组数</label>
            <input class="input" id="add-exercise-sets" name="sets" type="number" min="1" max="10" step="1" value="3" required />
          </div>
          <div class="field" style="align-self:end">
            <button class="button button-quiet button-full" type="button" data-action="open-custom-exercise"><i data-lucide="plus"></i>新建动作</button>
          </div>
          <div class="form-actions span-2">
            <button class="button button-quiet" type="button" data-action="close-modal">取消</button>
            <button class="button button-primary" type="submit">添加</button>
          </div>
        </form>
      `,
    );
  }

  function openExerciseLibrary() {
    const editing = ui.editingExerciseId ? state.customExercises.find((item) => item.id === ui.editingExerciseId) : null;
    openModal(
      "动作库",
      `
        <form id="exercise-library-form" class="field-grid">
          <div class="field span-2">
            <label for="exercise-name">动作名称</label>
            <input class="input" id="exercise-name" name="name" required value="${escapeHtml(editing?.name || "")}" placeholder="例如：史密斯上斜推胸" />
          </div>
          <div class="field">
            <label for="exercise-muscle">主要肌群</label>
            <input class="input" id="exercise-muscle" name="muscle" required value="${escapeHtml(editing?.muscle || "")}" placeholder="例如：胸" />
          </div>
          <div class="field">
            <label for="exercise-target-reps">目标次数</label>
            <input class="input" id="exercise-target-reps" name="targetReps" required value="${escapeHtml(editing?.targetReps || "8-12")}" />
          </div>
          <div class="form-actions span-2">
            ${
              editing
                ? `<button class="button button-quiet" type="button" data-action="cancel-exercise-edit">取消编辑</button>`
                : `<button class="button button-quiet" type="button" data-action="close-modal">关闭</button>`
            }
            <button class="button button-primary" type="submit">${editing ? "保存修改" : "添加动作"}</button>
          </div>
        </form>
        <div class="divider"></div>
        <div class="section-header">
          <h3 class="section-title">内置动作</h3>
          <span class="muted small">${DEFAULT_EXERCISES.length} 项</span>
        </div>
        <div class="list">
          ${DEFAULT_EXERCISES.map(
            (exercise) => `
              <div class="list-row">
                <div class="list-row-main"><strong>${escapeHtml(exercise.name)}</strong><span>${escapeHtml(exercise.muscle)} · ${escapeHtml(exercise.targetReps)} 次</span></div>
              </div>
            `,
          ).join("")}
        </div>
        <div class="section-header">
          <h3 class="section-title">自定义动作</h3>
          <span class="muted small">${state.customExercises.length} 项</span>
        </div>
        ${
          state.customExercises.length
            ? `<div class="list">${state.customExercises
                .map(
                  (exercise) => `
                    <div class="list-row">
                      <div class="list-row-main"><strong>${escapeHtml(exercise.name)}</strong><span>${escapeHtml(exercise.muscle)} · ${escapeHtml(exercise.targetReps)} 次</span></div>
                      <div class="list-row-actions">
                        <button class="icon-button" type="button" data-action="edit-exercise" data-exercise-id="${escapeHtml(exercise.id)}" aria-label="编辑动作"><i data-lucide="pencil"></i></button>
                        <button class="icon-button danger" type="button" data-action="delete-exercise" data-exercise-id="${escapeHtml(exercise.id)}" aria-label="删除动作"><i data-lucide="trash-2"></i></button>
                      </div>
                    </div>
                  `,
                )
                .join("")}</div>`
            : `<div class="empty-state">还没有自定义动作</div>`
        }
      `,
    );
  }

  function openCustomExercise() {
    ui.editingExerciseId = null;
    openExerciseLibrary();
  }

  function exportData() {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "重组 16",
      data: state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `recomp16-backup-${todayISO()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    toast("备份已导出");
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const imported = parsed.data || parsed;
        state = normalizeState(imported);
        saveState();
        closeModal();
        renderApp();
        toast("数据已导入");
      } catch (error) {
        console.error(error);
        toast("导入失败，请检查 JSON 文件");
      }
    };
    reader.readAsText(file);
  }

  function toast(message) {
    const element = document.getElementById("toast");
    element.textContent = message;
    element.classList.add("is-visible");
    window.clearTimeout(ui.toastTimer);
    ui.toastTimer = window.setTimeout(() => element.classList.remove("is-visible"), 2200);
  }

  function handleAction(action, target) {
    if (action === "open-settings") openSettings();
    if (action === "close-modal") closeModal();
    if (action === "close-modal-backdrop" && target.classList.contains("modal-backdrop")) closeModal();
    if (action === "previous-day") {
      ui.date = addDays(ui.date, -1);
      renderApp();
    }
    if (action === "next-day") {
      ui.date = addDays(ui.date, 1);
      renderApp();
    }
    if (action === "add-food") openFoodLogModal();
    if (action === "open-food-library") openFoodLibrary();
    if (action === "cancel-food-edit") {
      ui.editingFoodId = null;
      openFoodLibrary();
    }
    if (action === "edit-food") {
      ui.editingFoodId = target.dataset.foodId;
      openFoodLibrary();
    }
    if (action === "delete-food") {
      const food = getFoodById(target.dataset.foodId);
      if (food && window.confirm(`删除食物“${food.name}”？已有饮食记录不会受影响。`)) {
        state.foods = state.foods.filter((item) => item.id !== food.id);
        if (ui.editingFoodId === food.id) ui.editingFoodId = null;
        saveState();
        openFoodLibrary();
      }
    }
    if (action === "delete-food-log") {
      const logId = target.dataset.logId;
      state.foodLogs[ui.date] = getFoodLogs(ui.date).filter((log) => log.id !== logId);
      saveState();
      renderApp();
    }
    if (action === "generate-workout") {
      const plan = getPlan(ui.date);
      if (plan.effectiveType === "rest") {
        toast("请先把训练类型切换为训练日");
      } else {
        createWorkout(ui.date, plan.effectiveType);
        renderApp();
      }
    }
    if (action === "open-add-exercise") openAddExercise();
    if (action === "open-custom-exercise") {
      ui.editingExerciseId = null;
      openExerciseLibrary();
    }
    if (action === "open-exercise-library") openExerciseLibrary();
    if (action === "cancel-exercise-edit") {
      ui.editingExerciseId = null;
      openExerciseLibrary();
    }
    if (action === "edit-exercise") {
      ui.editingExerciseId = target.dataset.exerciseId;
      openExerciseLibrary();
    }
    if (action === "delete-exercise") {
      const exercise = state.customExercises.find((item) => item.id === target.dataset.exerciseId);
      if (exercise && window.confirm(`删除自定义动作“${exercise.name}”？`)) {
        state.customExercises = state.customExercises.filter((item) => item.id !== exercise.id);
        if (ui.editingExerciseId === exercise.id) ui.editingExerciseId = null;
        saveState();
        openExerciseLibrary();
      }
    }
    if (action === "remove-workout-exercise") {
      const workout = state.workouts[ui.date];
      if (workout) {
        workout.exercises = workout.exercises.filter((exercise) => exercise.instanceId !== target.dataset.instanceId);
        saveState();
        renderApp();
      }
    }
    if (action === "add-set") {
      const exercise = state.workouts[ui.date]?.exercises.find((item) => item.instanceId === target.dataset.instanceId);
      if (exercise) {
        exercise.sets.push({ weight: "", reps: "" });
        saveState();
        renderApp();
      }
    }
    if (action === "remove-set") {
      const exercise = state.workouts[ui.date]?.exercises.find((item) => item.instanceId === target.dataset.instanceId);
      const index = numberValue(target.dataset.setIndex, -1);
      if (exercise && exercise.sets.length > 1 && index >= 0) {
        exercise.sets.splice(index, 1);
        saveState();
        renderApp();
      }
    }
    if (action === "toggle-workout") {
      const workout = state.workouts[ui.date];
      if (workout) {
        workout.completed = !workout.completed;
        saveState();
        renderApp();
      }
    }
    if (action === "previous-month") {
      ui.calendarMonth = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth() - 1, 1);
      renderApp();
    }
    if (action === "next-month") {
      ui.calendarMonth = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth() + 1, 1);
      renderApp();
    }
    if (action === "select-calendar-date") {
      ui.calendarDate = target.dataset.date;
      renderApp();
    }
    if (action === "go-calendar-today") {
      ui.calendarDate = todayISO();
      ui.calendarMonth = firstDayOfMonth(ui.calendarDate);
      renderApp();
    }
    if (action === "export-data") exportData();
    if (action === "import-data") document.getElementById("import-file")?.click();
    if (action === "reset-data") {
      if (window.confirm("清空全部饮食、训练、身体数据和自定义设置？此操作无法撤销。")) {
        state = createDefaultState();
        saveState();
        closeModal();
        ui.date = todayISO();
        ui.calendarDate = todayISO();
        ui.calendarMonth = firstDayOfMonth(todayISO());
        renderApp();
        toast("数据已清空");
      }
    }
  }

  function handleSubmit(event) {
    const form = event.target;
    if (form.id === "food-log-form") {
      event.preventDefault();
      const data = new FormData(form);
      const food = getFoodById(String(data.get("foodId")));
      const quantity = numberValue(data.get("quantity"));
      const meal = String(data.get("meal"));
      if (!food || quantity <= 0) return;
      if (!Array.isArray(state.foodLogs[ui.date])) state.foodLogs[ui.date] = [];
      state.foodLogs[ui.date].push({
        id: uid("food-log"),
        foodId: food.id,
        name: food.name,
        serving: food.serving,
        quantity,
        meal,
        protein: numberValue(food.protein),
        carbs: numberValue(food.carbs),
        fat: numberValue(food.fat),
      });
      saveState();
      closeModal();
      renderApp();
      toast(`已添加 ${food.name}`);
    }

    if (form.id === "food-library-form") {
      event.preventDefault();
      const data = new FormData(form);
      const payload = {
        name: String(data.get("name")).trim(),
        serving: String(data.get("serving")).trim(),
        protein: numberValue(data.get("protein")),
        carbs: numberValue(data.get("carbs")),
        fat: numberValue(data.get("fat")),
      };
      if (!payload.name || !payload.serving) return;
      if (ui.editingFoodId) {
        const food = getFoodById(ui.editingFoodId);
        if (food) Object.assign(food, payload);
      } else {
        state.foods.push({ id: uid("food"), ...payload });
      }
      ui.editingFoodId = null;
      saveState();
      openFoodLibrary();
      toast("食物已保存");
    }

    if (form.id === "exercise-library-form") {
      event.preventDefault();
      const data = new FormData(form);
      const payload = {
        name: String(data.get("name")).trim(),
        muscle: String(data.get("muscle")).trim(),
        targetReps: String(data.get("targetReps")).trim(),
      };
      if (!payload.name || !payload.muscle || !payload.targetReps) return;
      if (ui.editingExerciseId) {
        const exercise = state.customExercises.find((item) => item.id === ui.editingExerciseId);
        if (exercise) Object.assign(exercise, payload);
      } else {
        state.customExercises.push({ id: uid("exercise"), ...payload });
      }
      ui.editingExerciseId = null;
      saveState();
      openExerciseLibrary();
      toast("动作已保存");
    }

    if (form.id === "add-exercise-form") {
      event.preventDefault();
      const data = new FormData(form);
      const exercise = getExercise(String(data.get("exerciseId")));
      const setCount = Math.min(Math.max(numberValue(data.get("sets"), 3), 1), 10);
      const workout = state.workouts[ui.date];
      if (!exercise || !workout) return;
      workout.exercises.push({
        instanceId: uid("workout-exercise"),
        exerciseId: exercise.id,
        name: exercise.name,
        muscle: exercise.muscle,
        targetReps: exercise.targetReps,
        sets: Array.from({ length: setCount }, () => ({ weight: "", reps: "" })),
      });
      saveState();
      closeModal();
      renderApp();
      toast("动作已添加");
    }

    if (form.id === "settings-form") {
      event.preventDefault();
      const data = new FormData(form);
      state.settings.startDate = String(data.get("startDate"));
      for (const key of ["p1Training", "p1Rest", "p2Training", "p2Rest"]) {
        state.settings.targets[key] = {
          calories: numberValue(data.get(`${key}.calories`)),
          protein: numberValue(data.get(`${key}.protein`)),
          carbs: numberValue(data.get(`${key}.carbs`)),
          fat: numberValue(data.get(`${key}.fat`)),
        };
      }
      saveState();
      closeModal();
      renderApp();
      toast("设置已保存");
    }

    if (form.id === "body-form") {
      event.preventDefault();
      const data = new FormData(form);
      state.body[ui.calendarDate] = {
        weight: data.get("weight") === "" ? "" : numberValue(data.get("weight")),
        waist: data.get("waist") === "" ? "" : numberValue(data.get("waist")),
        arm: data.get("arm") === "" ? "" : numberValue(data.get("arm")),
      };
      saveState();
      renderApp();
      toast("身体数据已保存");
    }
  }

  function handleInput(event) {
    const target = event.target;
    if (target.matches("[data-food-macro]")) updateFoodCaloriePreview();
    if (
      target.id === "food-log-food" ||
      target.id === "food-log-quantity"
    ) {
      updateFoodLogPreview();
    }
    if (target.matches("[data-set-input]")) {
      const workout = state.workouts[ui.date];
      const exercise = workout?.exercises.find((item) => item.instanceId === target.dataset.instanceId);
      const set = exercise?.sets[numberValue(target.dataset.setIndex, -1)];
      if (set) {
        set[target.dataset.field] = target.value;
        saveState();
        refreshWorkoutTotals();
      }
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches('[data-action="change-workout-type"]')) {
      const nextType = target.value;
      const current = state.workouts[ui.date]?.dayType;
      if (current && current !== nextType) {
        const confirmed = window.confirm("切换训练类型会重新生成当天训练，已填写的动作和重量将被清除。继续吗？");
        if (!confirmed) {
          renderApp();
          return;
        }
      }
      if (nextType === "rest") {
        delete state.workouts[ui.date];
      } else {
        createWorkout(ui.date, nextType);
      }
      saveState();
      renderApp();
    }
    if (target.matches("[data-import-input]") && target.files?.[0]) {
      importData(target.files[0]);
    }
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const navTarget = event.target.closest("[data-nav]");
      if (navTarget) {
        event.preventDefault();
        ui.screen = navTarget.dataset.nav;
        renderApp();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = event.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      if (action === "close-modal-backdrop" && event.target !== target) return;
      event.preventDefault();
      handleAction(action, target);
    });

    document.addEventListener("submit", handleSubmit);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleChange);
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(window.location.protocol)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("离线缓存注册失败", error));
    });
  }

  bindEvents();
  renderApp();
  registerServiceWorker();
})();
