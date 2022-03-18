const handler = (req, res) => {
  switch (req.method) {
    case "POST":
      postHandler(req, res)
      break
    default:
      getHandler(req, res)
      break
  }
}

const postHandler = (req, res) => {
  res.status(200).json({
    id: 'idddd',
    email: 'emaillll'
  })
}

const getHandler = (req, res) => {
  res.status(200).json([
    {email: '1@gmail.com'}
  ])
}

export default handler