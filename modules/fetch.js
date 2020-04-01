function post(path, payload) {
  return fetch(path, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 5NvkZva_L5MQ6NW8h3siiiR23z5'
      },
      body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => console.log('success', data) || data)
  .catch(e => console.log('error', e))
}

export { post }