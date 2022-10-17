// Métodos de controller : index, show, update, store, destroy

/*
index: Listagem de sessões
store: Criar uma sessão
show: Exibição/listar uma UNICA de sessões
update: Atualização/alterar de sessões
destroy: Exclusão de sessões
*/

import User from "../models/User";
import * as Yup from "yup";

class SessionController{
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        })

        const { email } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação" });
        }

        // Verificando se esse usuário já existe
        let user = await User.findOne({ email });

        if(!user){
           user = await User.create({email})
        }
        return res.json(user);
        // return res.status(400).json({ error: "User already exist" });



        return res.json(user);
    }
}


export default new SessionController();
