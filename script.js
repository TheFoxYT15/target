document.addEventListener("DOMContentLoaded", function () {
  const capitalEl = document.getElementById("capital");
  const profitEl = document.getElementById("profit");
  const entriesEl = document.getElementById("entries");
  const form = document.getElementById("tradeForm");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");

  let capital = parseFloat(localStorage.getItem("capital")) || 100.00;
  let profit = parseFloat(localStorage.getItem("profit")) || 0.00;
  let entries = JSON.parse(localStorage.getItem("entries")) || [];

  function updateUI() {
    capitalEl.textContent = capital.toFixed(2);
    profitEl.textContent = profit.toFixed(2);
    entriesEl.innerHTML = "";
    entries.forEach((entry, index) => {
      const li = document.createElement("li");
      li.innerHTML = \`\${entry.type === 'win' ? '✅' : '❌'} \${entry.amount.toFixed(2)}$
        <button onclick="removeEntry(\${index})">حذف</button>\`;
      entriesEl.appendChild(li);
    });
  }

  window.removeEntry = function (index) {
    const entry = entries[index];
    if (entry.type === "win") {
      capital -= entry.amount;
      profit -= entry.amount;
    } else {
      capital += entry.amount;
      profit += -entry.amount;
    }
    entries.splice(index, 1);
    saveData();
    updateUI();
  };

  function saveData() {
    localStorage.setItem("capital", capital.toFixed(2));
    localStorage.setItem("profit", profit.toFixed(2));
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (type === "win") {
      capital += amount;
      profit += amount;
    } else {
      capital -= amount;
      profit -= amount;
    }

    entries.unshift({ type, amount });
    saveData();
    updateUI();
    form.reset();
  });

  updateUI();
});