using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace KyteBank
{
    class ContaCorrente
    {
       
            
            public Cliente titular;
            public string agencia;
            public string numero;
            public double saldo;
            public int limiteConta;
            public bool Depositar(double valor)
            {
                 if(this.limiteConta < valor)
                 {
                     return false;
                 }
               
                this.saldo += valor;
                    return true;
                
            }

            public bool Sacar(double valor)
            {

            if (this.saldo < valor)
            {
                return false;
            }
                this.saldo -= valor;
                return true;           
            }
   

           public bool Transferir(double valor, ContaCorrente ContaDestino)
           {
                if(this.saldo < valor || valor <= 0)
                {
                    return false;
                }
              
                    this.saldo -= valor;
                    //ContaDestino.saldo += valor;
                    ContaDestino.Depositar(valor);
                    return true;
  
           }

    }
}
