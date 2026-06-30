export function fetchNotifications() {
  return fetch("http://4.224.186.213/evaluation-service/notifications").then(
    (response) => response.json()
  );
}
