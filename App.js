const Deposit = require("./Deposit")
const Loan = require("./Loan")
const Transfer = require("./Transfer")
const User = require("./User")

class App {
  static #users = []

  static findUser(email) {
    const user = App.#users.find(user => user.email === email)
    return user ?? null
  }

  static createUser(email, fullname) {
    const userExist = App.findUser(email)

    if (!userExist) {
      this.#users.push(new User(email, fullname))
    }
  }


  static deposit(email, value){
    const user = App.findUser(email)

    if(user){
      const newDeposit = new Deposit(value)
      user.account.addDeposit(newDeposit)
    }
  }

  static transfer(fromUserEmail, toUserEmail , value){
    const fromUser = App.findUser(fromUserEmail)
    const toUser = App.findUser(toUserEmail)

    if(fromUser && toUser ){
      const newTransfer = new Transfer(fromUser,toUser, value )
      fromUser.account.addTransfer(newTransfer)
      toUser.account.addTransfer(newTransfer)
    }
  }

  static takeLoan(email, value, numberOfInstallment){
    const user = App.findUser(email)

    if(user){
      const newLoan = new Loan(value, numberOfInstallment)
      user.account.addLoan(newLoan)
    }
  }

  static changeLoanFee(newFeePercentage){
    Loan.setFee = newFeePercentage
  }

}

module.exports = App