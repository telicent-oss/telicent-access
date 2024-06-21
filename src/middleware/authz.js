export const isUser = (req, res, next) => {
  
    if(req.isUser){
      return next()
    }
    return res.status(401).send("Not Authorised")
  }

export const isAdmin = (req, res, next) => {

  if(req.isAdmin){
    return next()
  }
  return res.status(401).send("Not Authorised")
}
