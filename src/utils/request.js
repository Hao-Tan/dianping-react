const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
})

const requestHandler = res => {
  if (res.status === 200 || res.status === 304) {
    return res.json()
  } else {
    return Promise.reject('request failed due to server error')
  }
}

const get = url => {
  return fetch(url,{
    method: 'GET',
    headers 
  }).then(res => {
    return requestHandler(res)
  }).catch(err => {
    console.error(err)
  })
}

const post = (url, data) => {
  return fetch(url, {
    method: "GET",
    headers,
    body: data
  }).then(res => {
    return requestHandler(res)
  }).catch(err => {
    console.error(err)
  })
}

export {get, post}