// Array order determines which projects appear first.
const projects = [
  {
    id: "fridgevision",
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
