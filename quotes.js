document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("quotes", function (data) {
    const quotes = data.quotes || [];
    let quotesHTML = "";

    quotes.forEach((quote) => {
      quotesHTML += `
        <tr>
          <td>${quote.text}</td>
          <td>${quote.author}</td>
          <td>${quote.tags.join(", ")}</td>
          <td><a href="${quote.url}" target="_blank">${quote.url}</a></td>
        </tr>
        <hr>
      `;
    });

    document.getElementById("quotesList").innerHTML = quotesHTML;

    //Event listeners for save and delete logic
    document
      .getElementById("downloadCSV")
      .addEventListener("click", function () {
        downloadCSV(quotes);
      });

    document
      .getElementById("downloadXLS")
      .addEventListener("click", function () {
        downloadXLS(quotes);
      });

    document.getElementById("deleteAll").addEventListener("click", function () {
      deleteAllQuotes();
    });

    // Save logic
    function downloadCSV(quotes) {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Quote,Author,Tags,URL\n";

      quotes.forEach((quote) => {
        let row = [
          `"${quote.text}"`,
          `"${quote.author}"`,
          `"${quote.tags.join(", ")}"`,
          `"${quote.url}"`,
        ].join(",");
        csvContent += row + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "quotes.csv");
      document.body.appendChild(link);
      link.click();
    }

    function downloadXLS(quotes) {
      alert("Downloading as XLS requires additional libraries.");
    }

    //Delete logic
    function deleteAllQuotes() {
      chrome.storage.local.remove("quotes", function () {
        alert("All quotes deleted!");
        location.reload();
      });
    }

    // Search logic
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll("#quotesList tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(filter)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});
