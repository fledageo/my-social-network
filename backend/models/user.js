import { Base } from "./base.js";
import db from './init.js'
class User extends Base{
   table = 'users'

   fullText(text){
        return db.prepare(`SELECT * FROM users where name like '${text}%' `).all()
   }

}

export default new User()