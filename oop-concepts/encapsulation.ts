class BankNoEncapsulation {
  public balance: number;


  constructor(balance: number) {
    this.balance = balance;
  }

  isOverDrawn() {
    return this.balance < 0
  }
}

const testBank = new BankNoEncapsulation(100)

testBank.balance += 120;

console.log(testBank.isOverDrawn());

//use encapsulation to protect the modification of balance
class BankAccount {

    private balance: number = 0;

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("deposit must be positive");
        }
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount <= 0 || amount > this.balance) {
            throw new Error("invalid withdrawal");
        }
        this.balance -= amount;
    }

    isOverdrawn(): boolean {
        return this.balance < 0;
    }
}


const bankAcc = new BankAccount()

bankAcc.deposit(500);

bankAcc.withdraw(600);
bankAcc.isOverdrawn();

/*
Access modifiers we discussed earlier, 
such as private and protected, 
are the tools that help us implement encapsulation.
*/