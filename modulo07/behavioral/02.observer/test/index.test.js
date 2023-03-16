import { expect, describe, test, jest, beforeAll } from '@jest/globals';
import Payment from '../src/events/payment';
import Marketing from '../src/observers/marketing';
import Shipment from '../src/observers/shipment';
import PaymentSubject from '../src/subjects/paymentSubject';

describe('Test Suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  })
  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)

    expect(observer.update).toBeCalledWith(expected)
  })
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  })
  test('#PaymentSubject should subject after card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    )
    const data = { userName: 'leonardo', id: Date.now() }
    payment.creditCard(data)

    expect(paymentSubjectNotifySpy).toBeCalledWith(data)
  })
  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    subject.subscribe(shipment)
    const marketing = new Marketing()
    subject.subscribe(marketing)
    const payment = new Payment(subject)

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    const data = { userName: 'leonardo', id: Date.now() }
    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  })
})
