import { useState } from 'react'
import ContactUsForm from '../components/ContactUsForm'

function ContactUs() {
  type sectionKey = 'shipping' | 'missing' | 'overseas'

  const [show, setShow] = useState({
    shipping: 'hidden',
    missing: 'hidden',
    overseas: 'hidden',
  })

  const styleSettings = ['0px']

  const [style, setStyle] = useState({
    shipping: styleSettings[0],
    missing: styleSettings[0],
    overseas: styleSettings[0],
  })

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const key = e.currentTarget.id as sectionKey
    setShow((prev) => ({ ...prev, [key]: prev[key] === '' ? 'hidden' : '' }))
    const section = e.currentTarget.parentElement?.nextElementSibling
    const sectionHeight = section?.scrollHeight
    setStyle((prev) => ({
      ...prev,
      [key]:
        prev[key] === styleSettings[0]
          ? `${sectionHeight! * 2}px`
          : styleSettings[0],
    }))
  }

  return (
    <>
      <div className="h-[84vh] justify-items-center overflow-scroll pb-16">
        <h1 className="mt-8 text-6xl">Get In Touch</h1>

        <p className="mt-2 text-2xl">We want to hear from you. Chat with us.</p>
        <ContactUsForm />
        <br />
        <br />
        <h2 className="border-b-1 mb-8 border-b border-current pb-4 text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="w-[50%] self-start text-left">
          <div className="flex">
            <button
              id="shipping"
              onClick={handleClick}
              className="w-[30px] text-xl font-bold"
            >
              {show.shipping === '' ? '-' : '+'}
            </button>
            <h2 className="text-xl">
              How long will it take for my order to arrive?
            </h2>
          </div>
          <div
            className={`m-3 h-auto overflow-hidden px-8 transition-all duration-500 ease-in-out`}
            style={{ maxHeight: style.shipping }}
          >
            An order usually takes about 3-5 working days to reach your
            doorstep. In the event a customization was requested of a product,
            it may take additional days to ship the product as we want to get
            all your specifications followed thoroughly!
          </div>
          <div className="flex">
            <button
              id="missing"
              onClick={handleClick}
              className="w-[30px] text-xl font-bold"
            >
              {show.missing === '' ? '-' : '+'}
            </button>
            <h2 className="text-xl">I still did not receive my order.</h2>
          </div>
          <div
            className={`m-3 h-auto overflow-hidden px-8 transition-all duration-500 ease-in-out`}
            style={{ maxHeight: style.missing }}
          >
            <h3 className="border-b-1 mb-4 w-fit border-b border-current pb-1">
              Check delivery details
            </h3>
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
            <button
              id="overseas"
              onClick={handleClick}
              className="w-[30px] text-xl font-bold"
            >
              {show.overseas === '' ? '-' : '+'}
            </button>
            <h2 className="text-xl">
              Is shipping available for locations outside of New Zealand?
            </h2>
          </div>
          <div
            className={`m-3 h-auto overflow-hidden px-8 transition-all duration-500 ease-in-out`}
            style={{ maxHeight: style.overseas }}
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
