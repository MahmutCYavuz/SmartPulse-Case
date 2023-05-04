$(() => {
  const filterData = (d) => /^PH/.test(d.conract);

  const table = document.getElementById("table");
  const thead = table.querySelector("thead tr");
  const tbody = table.querySelector("tbody");

  const filteredData =
    data.intraDayTradeHistoryResponse.body.intraDayTradeHistoryList.filter(
      filterData
    );
  const keys = Object.keys(filteredData[0]);
  const conracts = Array.from(new Set(filteredData.map((fd) => fd.conract)));

  const convertDate = (rawDate) => {
    const splitted = rawDate.match(/.{1,2}/g) ?? [];
    const year = "20" + splitted[0];
    const month = splitted[1];
    const day = splitted[2];
    const hour = splitted[3];
    return day + "/" + month + "/" + year + " " + hour + ":00";
  };

  for (const conract of conracts) {
    const relatedConracts = filteredData.filter((fd) => fd.conract === conract);
    const dateRaw = conract.slice(2);

    const t1 = convertDate(dateRaw);
    const t2 = relatedConracts
      .map((d) => (d.price * d.quantity) / 10)
      .reduce((r, a) => r + a, 0)
      .toFixed(2);
    const t3 = relatedConracts
      .map((d) => d.quantity / 10)
      .reduce((r, a) => r + a, 0)
      .toFixed(2);
    const t4 = (t2 / t3).toFixed(2);
    const cells = [t1, t2 + "₺", t3, t4];
    const tr = document.createElement("tr");
    for (const cell of cells) {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
});
