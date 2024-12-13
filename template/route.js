async function renderState(route = "home") {
  let filename = "home.html";
  switch (route) {
    case "projects": {
      filename = "projects.html";
      break;
    }
    case "experience": {
      filename = "experience.html";
      break;
    }
    case "about": {
      filename = "about.html";
      break;
    }
    default:
  }

  const htmlToRender = await fetch(`./pages/${filename}`).then((res) =>
    res.text()
  );
  document.getElementById("content").innerHTML = htmlToRender;
}
