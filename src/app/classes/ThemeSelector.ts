var storedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
if (storedTheme)
  document.documentElement.setAttribute("data-theme", storedTheme);

function setDarkMode()
{
    const targetTheme = "dark";
    console.log(targetTheme);
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
}

function setLightMode()
{
    const targetTheme = "light";
    console.log(targetTheme);
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
}

function toggleMode()
{
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";
  
    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    console.log(targetTheme);
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
}

export {
    setDarkMode,
    setLightMode,
    toggleMode
}