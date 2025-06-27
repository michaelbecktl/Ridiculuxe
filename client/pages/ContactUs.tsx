import { useState } from 'react'
import ContactUsForm from '../components/ContactUsForm'

function ContactUs() {
  const [show, setShow] = useState({
    shipping: 'hidden',
    missing: 'hidden',
    overseas: 'hidden',
  })

  const styleSettings = ['max-h-0']

  const [style, setStyle] = useState({
    shipping: styleSettings[0],
    missing: styleSettings[0],
    overseas: styleSettings[0],
  })

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const key = e.currentTarget.id
    setShow((prev) => ({ ...prev, [key]: prev[key] === '' ? 'hidden' : '' }))
    const sectionHeight = e.currentTarget.scrollHeight
    console.log(sectionHeight)
    setStyle((prev) => ({
      ...prev,
      [key]:
        prev[key] === styleSettings[0]
          ? `max-h-${sectionHeight * 2}`
          : styleSettings[0],
    }))
  }
  return (
    <>
      <div className="justify-items-center">
        <h1>Get In Touch</h1>

        <p>We want to hear from you. Chat with us.</p>
        <ContactUsForm />
        <br />
        <br />
        <h2>Frequently Asked Questions</h2>
        <div className="w-[50%] self-start text-left">
          <div className="flex">
            <button id="shipping" onClick={handleClick} className="w-[30px]">
              {show.shipping === '' ? '-' : '+'}
            </button>
            <h2>How long will it take for my order to arrive?</h2>
          </div>
          <div
            className={`${style.shipping} ease m-3 h-auto overflow-hidden px-8 transition-all duration-500`}
          >
            An order usually takes about 3-5 working days to reach your
            doorstep. In the event a customization was requested of a product,
            it may take additional days to ship the product as we want to get
            all your specifications followed thoroughly!
          </div>
          <div className="flex">
            <button id="missing" onClick={handleClick} className="w-[30px]">
              {show.missing === '' ? '-' : '+'}
            </button>
            <h2>I still did not receive my order.</h2>
          </div>
          <div
            className={`${style.missing} ease m-3 h-auto overflow-hidden px-8 transition-all duration-500`}
          >
            <h3>Check delivery details</h3>
            <ul className="list-disc">
              <li>
                Double check if the correct address was written in your order.
                If you have submitted the wrong email address, please contact us
                using the contact form above!
              </li>
              <li>
                Tracking details are attached to the order confirmation email,
                please check if there are any possible delays in shipment. If
                you have any concerns, please do not hesitate to contact us.
              </li>
            </ul>
          </div>
          <div className="flex">
            <button id="overseas" onClick={handleClick} className="w-[30px]">
              {show.overseas === '' ? '-' : '+'}
            </button>
            <h2>Is shipping available for locations outside of New Zealand?</h2>
          </div>
          <div
            className={`${style.overseas} ease m-3 h-auto overflow-hidden px-8 transition-all duration-500`}
          >
            Unfortunately, our product is still only available in New Zealand.
            We have plans to expand our operations and coverage internationally,
            so stay tuned!
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
