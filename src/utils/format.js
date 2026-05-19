export function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString('vi-VN')} VND`;
}
