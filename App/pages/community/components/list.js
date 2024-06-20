function makeList(name, list, symbol) {
  return `
  <div class="card">
    <div class="card-body side-section">
      <div class="card-title">
        ${name}
        ${symbol}
      </div>
      <hr />
      ${list.map(
        (item) => `
        <a>${item}</a>
        <hr/>
        `
      ).join('')}
    </div>
  </div>
  `;
}

fetch("components/list.json")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("adminRec").innerHTML = makeList(
      "Admin Recommendations",
      data["Admin Recommendations"],
      data["Fire"]
    );
    document.getElementById("inRemind").innerHTML = makeList(
      "Ingredient Reminders",
      data["Ingredient Reminders"],
      data["Finger"]
    );
  })
  .catch((error) => console.error("Error fetching navbar:", error));
