(function () {
  const form = document.getElementById("terminal-form");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const commands = {
    help: "Available commands:\nhelp — Show commands\nwhoami — Meet Stephanie\nprojects — List all four projects\nopen fridgevision — Jump to FridgeVision\nskills — Technical skills\ncat resume — Open my résumé\nsudo hire-me — Let's talk!",
    whoami: "I'm Stephanie (Yixin) Zha, a Computer Engineering student at the University of Toronto. I enjoy problem-solving, machine learning, and compiler development, with professional experience in PyTorch and LLVM/MLIR.",
    skills: "Languages: Python, C++, C, JavaScript, HTML/CSS, Verilog, Bash\nDatabase: MySQL\nLibraries: NumPy, Pandas, matplotlib, Selenium, LLVM/MLIR\nFrameworks: PyTorch, Keras, TensorFlow\nTools: Git"
  };

  function print(text) {
    const line = document.createElement("p");
    line.textContent = text;
    output.appendChild(line);
    // Keep long sessions from growing the page's DOM indefinitely.
    while (output.children.length > 100) output.removeChild(output.firstElementChild);
    output.scrollTop = output.scrollHeight;
  }

  function run(rawCommand) {
    const command = rawCommand.trim().toLowerCase().replace(/\s+/g, " ");
    if (!command) return;
    print("visitor@stephanie:~$ " + rawCommand.trim());
    input.value = "";

    if (Object.prototype.hasOwnProperty.call(commands, command)) {
      print(commands[command]);
    } else if (command === "projects") {
      print(projects.map(function (project, index) {
        return (index + 1) + ". " + project.title + "\n   " + project.description;
      }).join("\n"));
    } else if (command === "open fridgevision") {
      print("Opening FridgeVision…");
      window.location.hash = "fridgevision";
    } else if (command === "cat resume") {
      print("Opening my résumé in a new tab.");
      const link = document.createElement("a");
      link.href = "/assets/resume/Yixin_Zha_Resume.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open résumé PDF";
      output.appendChild(link);
      link.click();
      output.scrollTop = output.scrollHeight;
    } else if (command === "sudo hire-me") {
      print("Permission granted. Let’s talk!");
      const link = document.createElement("a");
      link.href = "#contact";
      link.textContent = "Get in touch →";
      output.appendChild(link);
      output.scrollTop = output.scrollHeight;
    } else {
      print('Command not found: ' + command + '. Type "help" for available commands.');
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    run(input.value);
  });

  document.querySelectorAll("[data-command]").forEach(function (button) {
    button.addEventListener("click", function () {
      run(button.dataset.command);
    });
  });
})();
