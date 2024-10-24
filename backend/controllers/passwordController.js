
const Password = require('../models/password');
const User = require('../models/user');

exports.createPassword = async (req, res) => {
  const { userid } = req.params;
  const { website, password, details } = req.body;
  if (!userid || !website || !password || !details) {
    return res.status(400).json({ message: 'Missing required fields: userid, website, password, and details are all required' });
  }
  try {
    const user = await User.findByPk(userid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newPassword = await Password.create({ userId: userid, website, password, details });
    res.status(201).json({newPassword});
  } catch (error)  {
    console.error('Error creating password:', error);
    res.status(500).json({ message: 'Error creating password', error: error.message });
  }
};


exports.getPasswords = async (req, res) => {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    try {
      const passwords = await Password.findAll({ where: { userId: userid } });
      if (!passwords || passwords.length === 0) {
        return res.status(200).json({ message: 'No passwords found for this user',data:[] });
      }
      res.status(200).json({data: passwords});
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving passwords', error });
    }
  };
  

  exports.UpdatePassword = async (req, res) => {
    const { userid, passwordId } = req.params;
    const { website, password, details } = req.body;
    try {
      const user = await User.findByPk(userid);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const passwordEntry = await Password.findOne({ where: { passwordId, userId: userid } });
      if (!passwordEntry) {
        return res.status(404).json({ message: 'Password not found' });
      }
      await passwordEntry.update({ website, password, details });
      res.status(200).json({
        message: 'Password updated successfully',
        passwordId: passwordEntry.passwordId,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating password', error });
    }
  };


  exports.DeletePassword = async (req, res) => {
    const { userid, passwordId } = req.params; 
    if(!userid||!passwordId){
      return res.status(404).json({ message: 'did not get user' });
    }
    try {
      const user = await User.findByPk(userid);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const passwordEntry = await Password.findOne({ where: { passwordId, userId: userid } });
      if (!passwordEntry) {
        return res.status(404).json({ message: 'Password not found' });
      }
      await passwordEntry.destroy();
      res.status(200).json({ message: 'Password deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting password', error });
    }
  };
  
  exports.getpassworddetbyid =async (req,res)=>{
    const { userid, passwordId } = req.params;
    const checkuser = await User.findByPk(userid)
    try {
      if(checkuser){
        return res.status(404).json({ message: 'User does not exist', error });
      }
      const pass = await Password.findOne({where:{userId:userid,passwordId}})
      if(!pass){
        return res.status(404).json({ message: 'User does not exist', error });
      }
      res.status(200).json(pass);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting password', error });
    }

  };