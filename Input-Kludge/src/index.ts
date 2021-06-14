import Express from 'express';
import { cpf } from 'cpf-cnpj-validator';

const app = Express();

app.use(Express.json());

export const CPFsValidosComLib: string[] = [];
export const CPFsValidosSemLib: string[] = [];


app.use('/save/:cpf', (req, res) => {
  const { cpf: inputCpf } = req.params;

  if (inputCpf.length === 11 && !CPFsValidosSemLib.includes(inputCpf)) {
    CPFsValidosSemLib.push(inputCpf);
  }

  if (cpf.isValid(inputCpf) && !CPFsValidosComLib.includes(inputCpf)) {
    CPFsValidosComLib.push(inputCpf);
  }
  
  res.json({ Cadastrado_com_lib: CPFsValidosComLib, Cadastrado_sem_lib: CPFsValidosSemLib });
});

app.listen(3000, () => {
  console.log('Running...');
}); 