export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject
  }
  creditCard(paymentData) {
    console.log(`A payment ocurred from ${paymentData.userName}`)
    this.paymentSubject.notify(paymentData)
  }
}