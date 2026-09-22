// Array order determines which projects appear first.
const projects = [
  {
    title: "FridgeVision",
    description: "Detects food in fridge photos and suggests recipes using machine learning.",
    repository: "https://github.com/PlutoPuppy/FridgeVision",
    details: [
      "Uses YOLO to detect food in fridge images.",
      "Suggests recipes from detected ingredients using an NER-enhanced recommendation model.",
      "Uses a team-created, labelled Roboflow dataset for food detection."
    ]
  },
  {
    title: "Sunnybrook Inventory Management System",
    description: "A mobile app to track freezer samples for Sunnybrook Research Institute.",
    repository: "https://github.com/N00dleMaster/sunnybrook-barcode-prototype",
    details: [
      "Managed a team of five to modernize Sunnybrook Research Institute's freezer-sample inventory system.",
      "Built a mobile app to track samples via barcode scanning.",
      "Stores and updates sample data in the database on the Sunnybrook server."
    ]
  },
  {
    title: "Mapping Software",
    description: "Mapping software with a GTK user interface and shortest-path routing.",
    repository: "https://github.com/PlutoPuppy/Mapping-Software",
    details: [
      "Provides a graphical mapping interface built with GTK.",
      "Uses Dijkstra's algorithm to find the shortest path."
    ]
  },
  {
    title: "Stock Data Web Scraper",
    description: "Scraped Intel stock data from NASDAQ and visualized it as candlestick charts.",
    details: [
      "Tools: Python, Selenium, NumPy, matplotlib.",
      "Scraped historical Intel stock values (2022–2023) from the NASDAQ website.",
      "Drew candlestick diagrams to visualize the price data.",
      "Timeline: Jan 2023 – Feb 2023."
    ]
  }
];

const projectList = document.getElementById("project-list");
const loadMoreButton = document.getElementById("load-more");
let displayedProjects = 0;

function renderProjects(count) {
  const nextProjects = projects.slice(displayedProjects, displayedProjects + count);

  nextProjects.forEach(function (project) {
    const column = document.createElement("div");
    column.className = "col s12 m6 l4";
    // These templates contain only the static project data defined above.
    column.innerHTML = `
      <div class="card medium">
        <div class="card-content">
          <span class="card-title activator teal-text hoverline">${project.title}<i
            class="mdi-navigation-more-vert right"></i></span>
          <p>${project.description}</p>
        </div>
        <div class="card-reveal">
          <span class="card-title teal-text"><small>Accomplishments</small><i
            class="mdi-navigation-close right"></i></span>
          <ul>${project.details.map(function (detail) { return `<li>${detail}</li>`; }).join("")}</ul>
        </div>
        ${project.repository ? `<div class="card-action"><a href="${project.repository}"
          target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} on GitHub">View on GitHub</a></div>` : ""}
      </div>`;
    projectList.appendChild(column);
  });

  displayedProjects += nextProjects.length;
  loadMoreButton.hidden = displayedProjects >= projects.length;
  loadMoreButton.disabled = displayedProjects >= projects.length;
}

loadMoreButton.addEventListener("click", function () {
  renderProjects(projects.length - displayedProjects);
});

renderProjects(2);
