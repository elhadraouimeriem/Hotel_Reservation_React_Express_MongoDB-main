const loginServices=require("../services/login.services")

async function signUp(req,res){
       try{
       const user = await loginServices.saveUser(req.body);
       res.status(201).json(user);
       }catch(error){
       console.log(error);
       res.status(500).send("Erreur dans l'ajout de l'utilisateur");
       }
}

async function login(req,res){
       try{
              const token=await loginServices.loginService(req.body);
              res.status(201).json(token);
       }catch(error){
              res.status(500).json(error);
       }
}


async function getAllUsers(req, res) {
       try{
              console.log(req.headers);
              let users=[];
          if(req.query.keyword){
              users = await loginServices.findUserByQuery(req.query.keyword);
          }
          else{
              users = await loginServices.findUsers();
          }
       res.json(users);
       }catch(error){
       res.status(500).send("Erreur dans le serveur");
      }
}


async function deleteUserById(req,res){
       const idU = req.params.id;
       try{
       await loginServices.removeUserById(idU);
       res.send("User a était bien supprimé");
       }catch(error){
       res.status(500).send("Erreur dans la suppression de user");
       }
      
}

async function updatePassword(req, res) {
       const userId = req.params.id;
       const { newPassword } = req.body;
     
       try {
         await loginServices.updatePassword(userId, newPassword);
         res.json({ message: 'Password updated successfully' });
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     }
     


module.exports={signUp,login,getAllUsers, deleteUserById, updatePassword}
