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
            ContaCorrente conta = new ContaCorrente();
            conta.titular = "nenem";

            Console.WriteLine(conta.titular + " " + conta.saldo);

        }

    }
}
