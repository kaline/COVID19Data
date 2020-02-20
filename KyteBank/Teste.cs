using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KyteBank
{
    class Teste
    {
        static void Main(string[] args)
        {
            Cliente pinguim = new Cliente();
            pinguim.nome = "toin";
            pinguim.cpf = "123";
            pinguim.profissao = "nadador";
     
            ContaCorrente conta = new ContaCorrente();
            ContaCorrente ContaJeff = new ContaCorrente();
            ContaCorrente ContaPinguim = new ContaCorrente();
            ContaCorrente ContaTonia = new ContaCorrente();

            ContaPinguim.titular = pinguim;
            ContaPinguim.limiteConta = 1000;
            ContaPinguim.agencia = "123";
            ContaPinguim.numero = "123";
            ContaPinguim.saldo = 100;

            ContaPinguim.titular.nome = "Pinguim doido";

            Console.WriteLine("\n Nome do cliente: " + pinguim.nome + "\n" + ContaPinguim.titular + "\n" + ContaPinguim.titular.nome);


            Console.WriteLine("Conta Jeff: " + ContaJeff.saldo + "\nConta Pinguim: " + ContaPinguim.saldo + "\nConta Tonia: " + ContaTonia.saldo);

            bool ResultadoTransferência;
            ResultadoTransferência = ContaJeff.Transferir(-100, ContaPinguim);
            Console.WriteLine("\nResultado da transferência 1: " + ResultadoTransferência);
            ResultadoTransferência = ContaTonia.Transferir(50, ContaPinguim);
            Console.WriteLine("\nResultado da transferência 2: " + ResultadoTransferência);


            Console.WriteLine("Conta Jeff: " + ContaJeff.saldo + "\nConta Pinguim: " + ContaPinguim.saldo + "\nConta Tonia: " + ContaTonia.saldo);
            


            
            Console.ReadLine();

        }

    }
}
