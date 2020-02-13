using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KyteBank
{
    class ContaCorrente
    {
       
            
            public string titular;
            public int agencia;
            public int numero;
            public double saldo;
            public int limiteConta;
            public bool Transferir(double valor)
            {
                 if(this.limiteConta < valor)
                 {
                     return false;
                 }
                else
                {
                this.saldo += valor;
                    return true;
                }
            }

            public bool Sacar(double valor)
            {

            if (this.saldo < valor)
            {
                return false;
            }
            else
            {
                this.saldo -= valor;
                return true;
            }
                
            }
    }
}
