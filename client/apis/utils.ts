export function logError(err: Error) {
  console.log(err)
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error('Only the user who added the post may update and delete it')
  } else {
    console.error('Error consuming the API:', err.message)
    throw err
  }
}
