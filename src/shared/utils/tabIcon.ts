export const tabIcon = (icon: string) => {
  document.querySelector("link[rel*='icon']")?.setAttribute("href", icon);
}