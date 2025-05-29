// البيانات الأساسية
let capital = 100.00;
let transactions = [];
let weeklyProfit = 0;
let weeklyGoalMin = 25;
let weeklyGoalMax = 50;

// تحديث مؤشر التقدم
function updateProgress() {
    const progressElement = document.getElementById('goalProgress');
    const progressText = document.getElementById('progressText');
    const currentProgress = document.getElementById('currentProgress');
    
    let percentage = (weeklyProfit / weeklyGoalMin) * 100;
    
    if (weeklyProfit > weeklyGoalMax) {
        percentage = 100 + ((weeklyProfit - weeklyGoalMax) / weeklyGoalMax) * 100;
    }
    
    if (weeklyProfit >= 0) {
        progressElement.className = 'progress-bar progress-green';
    } else {
        progressElement.className = 'progress-bar progress-red';
    }
    
    const progressWidth = Math.max(0, Math.min(percentage, 200));
    progressElement.style.width = `${progressWidth}%`;
    
    if (weeklyProfit >= weeklyGoalMax) {
        progressText.innerHTML = `🎉 مذهل! تجاوزت الهدف الأقصى (+${weeklyProfit.toFixed(2)}$)`;
        progressText.style.color = 'var(--profit-color)';
        progressText.style.textShadow = '0 0 10px rgba(0, 255, 157, 0.7)';
    } else if (weeklyProfit >= weeklyGoalMin) {
        progressText.innerHTML = `🔥 ممتاز! حققت الهدف (+${weeklyProfit.toFixed(2)}$)`;
        progressText.style.color = 'var(--profit-color)';
        progressText.style.textShadow = '0 0 8px rgba(0, 255, 157, 0.5)';
    } else if (weeklyProfit > 0) {
        progressText.innerHTML = `🚀 متبقى ${(weeklyGoalMin - weeklyProfit).toFixed(2)}$ للهدف`;
        progressText.style.color = '#4e54c8';
        progressText.style.textShadow = '0 0 8px rgba(78, 84, 200, 0.5)';
    } else if (weeklyProfit === 0) {
        progressText.innerHTML = `🔍 ابدأ التداول لتحقيق الأرباح!`;
        progressText.style.color = 'rgba(255, 255, 255, 0.7)';
        progressText.style.textShadow = 'none';
    } else {
        progressText.innerHTML = `⚠ تحتاج إلى ربح ${(-weeklyProfit).toFixed(2)}$ للعودة إلى الصفر`;
        progressText.style.color = 'var(--loss-color)';
        progressText.style.textShadow = '0 0 8px rgba(255, 77, 77, 0.5)';
    }
    
    currentProgress.textContent = `${Math.round(percentage)}% (${weeklyProfit.toFixed(2)}$)`;
}

// ... (بقية الدوال كما هي في الكود السابق) ...

// تعديل الرصيد
function editBalance() {
    const newBalance = prompt("أدخل الرصيد الجديد:", capital.toFixed(2));
    if (newBalance && !isNaN(newBalance)) {
        capital = parseFloat(newBalance);
        updateDashboard();
    }
}

// تعديل الهدف الأسبوعي
function editWeeklyGoal() {
    const newGoal = prompt("أدخل الهدف الأسبوعي (مثال: 100-200):", `${weeklyGoalMin}-${weeklyGoalMax}`);
    if (newGoal) {
        const parts = newGoal.split('-');
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            weeklyGoalMin = parseFloat(parts[0]);
            weeklyGoalMax = parseFloat(parts[1]);
            document.getElementById('weeklyGoalText').textContent = `${weeklyGoalMin}$ - ${weeklyGoalMax}$`;
            updateDashboard();
        } else {
            alert("الرجاء إدخال الهدف بالصيغة الصحيحة (مثال: 100-200)");
        }
    }
}

// التهيئة الأولية
updateDashboard();
