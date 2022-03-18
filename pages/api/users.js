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
  setTimeout(() => {
    if (req.body.email === '1@fail.com') {
      res.status(500).json({})
    } else {
      res.status(200).json({
        id: 'idddd',
        email: 'emaillll'
      })
    }
   
  }, 1000)
  
}

const getHandler = (req, res) => {
  const users = Array(1000).fill(0).map((_, index) => ({
    email: `${index}@gmail.com`
  }))
  res.status(200).json(users)
}

export default handler