const handler = (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      id: "id",
      email: "",
      token: ""
    })
  }, 1000)
}

export default handler