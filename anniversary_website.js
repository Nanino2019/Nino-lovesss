document.addEventListener("DOMContentLoaded", function () {
  // ซ่อนหน้าปฏิทินตอนเริ่ม
  document.getElementById("calendarPage").classList.add("hidden");

  // สร้างวันที่ 1 - 31 และจัดให้วันที่ 5 อยู่ในวันพฤหัส (ปรับ startDay)
  buildCalendar();
});

// ฟังก์ชันสร้างปฏิทิน
function buildCalendar() {
  const daysContainer = document.getElementById("daysContainer");
  daysContainer.innerHTML = ""; // เคลียร์ก่อน

  let startDay = 0; // 0=อาทิตย์, 1=จันทร์, 2=อังคาร, 3=พุธ, 4=พฤหัส, ...
  // ปรับตามต้องการให้วันที่ 5 ตรงกับพฤหัส
  // ถ้า 1 ธ.ค. = อาทิตย์ (0) → 5 ธ.ค. = พฤหัส (4)

  // เพิ่มช่องว่างก่อนวันที่ 1
  for (let i = 0; i < startDay; i++) {
    let emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  let totalDays = 31; // ธันวาคมมี 31 วัน
  for (let i = 1; i <= totalDays; i++) {
    let dayDiv = document.createElement("div");
    dayDiv.textContent = i;

    // ถ้าวันที่ 5 ให้เรืองแสง
    if (i === 5) {
      dayDiv.classList.add("glow");
    }
    daysContainer.appendChild(dayDiv);
  }
}

// เปิดปฏิทิน (date picker) ตอนกดช่องกรอกรหัส
function openCalendar() {
  document.getElementById("calendarPopup").style.display = "block";
}

// ปิดปฏิทิน
function closeCalendar() {
  document.getElementById("calendarPopup").style.display = "none";
}

// ใส่วันที่จาก date picker ไปในช่อง text
function setPassword() {
  let dateInput = document.getElementById("calendarInput").value;
  let formattedDate = formatDate(dateInput);
  document.getElementById("passwordInput").value = formattedDate;
  closeCalendar();
}

// แปลง YYYY-MM-DD → DD/MM/YYYY
function formatDate(dateString) {
  let parts = dateString.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

// ตรวจสอบรหัสผ่าน
function checkPassword() {
  let password = document.getElementById("passwordInput").value;
  let lockIcon = document.querySelector(".lock-icon");
  let errorMessage = document.getElementById("errorMessage");

  if (password === "05/12/2024") {
    lockIcon.textContent = "🔓";
    errorMessage.textContent = "";
    setTimeout(() => {
      document.getElementById("loginPage").classList.add("hidden");
      document.getElementById("calendarPage").classList.remove("hidden");
    }, 1000);
  } else {
    errorMessage.textContent = "รหัสผ่านไม่ถูกต้อง!";
  }
}
