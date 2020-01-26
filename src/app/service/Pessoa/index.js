import Pessoa from '../../models/Pessoa';

class PessoaService {
  async verify(id) {
    const pessoa = await Pessoa.findByPk(id);
    return pessoa;
  }
}

export default new PessoaService();
