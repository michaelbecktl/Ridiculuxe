function AboutUs() {
  const members = ['David Kim', 'Eric Oh', 'Michael Beck', 'Oranee Kasem']
  const technologies = [
    { name: 'HTML5', image: '/public/image/HTML5.svg' },
    { name: 'CSS', image: '/public/image/CSS3.svg' },
    { name: 'React JS', image: '/public/image/React.svg' },
    { name: 'Node JS', image: '/public/image/Node_JS.svg' },
    { name: 'Knex JS', image: '/public/image/Knex_JS.png' },
    { name: 'Auth0', image: '/public/image/Auth0.svg' },
    { name: 'Tailwind CSS', image: '/public/image/Tailwind_CSS.svg' },
  ]

  return (
    <>
      <div className="justify-items-center">
        <h1 className="text-[96px]">Ridiculuxe</h1>
        <h2 className="text-[32px]">So Luxurious, It's Ridiculous</h2>
        <br />
        <p>
          Thank you for browsing our webpage, this website is our final group
          project for our Web Development course in Dev Academy Aotearoa. This
          project was designed by:
        </p>
        <br />
        <ul>
          {members.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <br />
        <p>This website was built with:</p>
        <br />
        <ul className="flex">
          {technologies.map((technology) => (
            <li key={technology.name} className="m-3">
              <img
                src={technology.image}
                alt={technology.name}
                className="h-20"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default AboutUs
