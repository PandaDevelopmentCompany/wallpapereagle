
// document.getElementById("sendButton").addEventListener("click", function(event) {
//     event.preventDefault();

//     const form = event.target.closest("form");
//     const formData = new FormData(form);

//     // отправляем в Apps Script
//     fetch("https://script.google.com/macros/s/AKfycby8mKAz7znCTynHY6kyWTDwBwfKD_VINDKd8tewYX8K8nNp2UrnxOhQ2LPPT_qSsjeP9w/exec", {
//         method: "POST",
//         body: formData
//     })
//     .then(res => res.text())
//     .then(res => {
//         alert("✅ Your message has been successfully sent!");
//     })
//     .catch(err => {
//         console.error("Ошибка отправки:", err);
//         alert("❌ Ошибка при отправке. Попробуйте снова.");
//     });
// });

