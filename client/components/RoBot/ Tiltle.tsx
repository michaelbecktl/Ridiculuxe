// components/RoBot/Title.tsx
import Textbot from './TextBot'

function Title() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-start px-16 bg-white">
      <Textbot text="Bluvia" delay={500} stacked={true} />
      <Textbot
        text="Your Everyday Luxe Assistant — just say it, and Bluvia does it."
        delay={1500}
        className="text-xl mt-10 max-w-md"
      />
    </div>
  )
}

export default Title