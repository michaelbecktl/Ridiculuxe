
import Textbot from './TextBot'


function Title() {
  return (
    <div className="title-container h-screen w-full flex flex-col justify-center items-start px-16 bg-white">
      <Textbot text="BotBluvia" delay={300} stacked={true} />
      <Textbot
        text="Your Everyday Luxe Assistant 
        just say it, and BotBluvia does it."
        delay={1500}
        className="text-xl mt-10 max-w-md px-1"
      />
    </div>
  )
}

export default Title