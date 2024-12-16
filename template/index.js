function renderNavigationHeader() {
  const links = [
    { page: "home", title: "Home" },
    { page: "projects", title: "Projects" },
    { page: "experience", title: "Experience" },
    { page: "about", title: "About" },
  ];

  const linkDiv = ({ page, title }) =>
    `<div class="hover:drop-shadow-lg">
      <a onclick=renderState("${page}")>${title}</a>
    </div>`;

  const navTemplate = `
        <div>
          <img src="./assets/images/logo.png" alt="Logo" height="60" width="60">
        </div>
        <div class="flex flex-row gap-2">
          ${links.map(linkDiv).join("\n")}
        </div>
`;
  const nav = document.createElement("nav");
  nav.innerHTML = navTemplate;
  nav.setAttribute(
    "class",
    "flex flex-row justify-between items-center px-2 py-2 shadow-md shadow-gray-300"
  );
  document.body.prepend(nav);
}

function initialRender() {
  renderNavigationHeader();
}

initialRender();
