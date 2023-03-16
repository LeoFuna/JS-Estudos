import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject()
const marketing = new Marketing()
subject.subscribe(marketing)

const shipment = new Shipment()
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({ userName: 'Leonardo', id: Date.now() })

subject.unsubscribe(marketing)

// só vai para are de shipment
payment.creditCard({ userName: 'Maria', id: Date.now() })