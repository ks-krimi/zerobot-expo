export function createFormData(data) {
  let formData = new FormData()
  for (let value in data) {
    formData.append(value, data[value])
  }
  return formData
}
