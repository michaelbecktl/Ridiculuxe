import { useState } from 'react'

function ContactUsForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [showForm, setShowForm] = useState(true)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const key = e.target.id
    setForm({ ...form, [key]: e.target.value })
  }

  function handleSubmit() {
    setShowForm(false)
  }

  return (
    <>
      {showForm ? (
        <>
          <div className="w-[40%]  self-start text-left">
            <form onSubmit={handleSubmit} className="mx-auto my-5 w-[90%]">
              <label htmlFor="name" className="text-xs">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                className="mb-2 w-[100%] rounded-md p-2 text-[black] shadow-sm shadow-gray-400"
                required
                onChange={handleChange}
              />
              <br />
              <label htmlFor="email" className="text-xs">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={form.email}
                className="mb-2 w-[100%] rounded-md p-2 text-[black] shadow-sm shadow-gray-400"
                required
                onChange={handleChange}
              />
              <br />
              <label htmlFor="subject" className="text-xs">
                Subject
              </label>
              <select
                className="mb-2 w-[100%] rounded-md p-2 text-[black] shadow-sm shadow-gray-400"
                id="subject"
                value={form.subject}
                onChange={handleChange}
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Need help with making a purchase">
                  Need help with making a purchase
                </option>
                <option value="Modify / cancel current order">
                  Modify / cancel current order
                </option>
                <option value="Problem with my order">
                  Problem with my order
                </option>
                <option value="Provide feedback / make a complaint">
                  Provide feedback / make a complaint
                </option>
                <option value="Account issues">Account issues</option>
                <option value="Website / media enquiries">
                  Website / media enquiries
                </option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="message" className="text-xs">
                Message
              </label>
              <textarea
                id="message"
                value={form.message}
                className="mb-2 h-[128px] w-[100%] resize-none rounded-md p-2 text-[black] shadow-sm shadow-gray-400"
                required
                onChange={handleChange}
              />
              <button
                type="submit"
                className="rounded-xl bg-[#424242] px-8 py-2 text-[white] shadow-sm shadow-gray-400 hover:opacity-80 active:opacity-100"
              >
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="relative h-[425px] w-[40%] justify-items-center text-justify">
          <div className="absolute top-[50%] -translate-y-1/2 justify-center">
            <h1 className="border-b-1 mb-4 border-b border-current pb-4 text-center text-2xl">
              Email Sent!
            </h1>
            <p>
              Thanks for contacting us! Our customer service team will be with
              you as soon as possible. If you did not get a response from our
              team within 3-5 working days, please don't hesitate to reach out
              to us again.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactUsForm
