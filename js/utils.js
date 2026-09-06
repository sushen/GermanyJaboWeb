// Helper utilities
export function createElement(tag, className = '', content = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.innerHTML = content;
  return el;
}

export function sanitizeHtml(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}
