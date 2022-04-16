const partners = require("../models/partnerDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const partnerLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const partner = await partners.findOne({
      username: username,
    });

    if (partner && (await bcrypt.compare(password, partner.password))) {
      const token = jwt.sign(
        { partner_id: partner._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      partner.token = token;
      res.status(200).json(partner);
    }
    res.status(404).json({ error: "check username or password " });
  } catch (err) {
    console.log(err);
  }
};

const getPartner =  async (req,res) =>{
try{
  const partner = await partners.findById(req.partner.partner_id).select("-password");
  if(!partner) throw Error("Partner does not exist");
  res.json(partner.username)

}catch(e){
res.status(400).json({msg: e.message})
}

}

module.exports ={
  partnerLogin,
  getPartner
}
