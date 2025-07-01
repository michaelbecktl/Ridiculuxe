import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

function ColorPicker({ setBandColor, setFrameColor, bandColor, frameColor }) {
  const [show, setShow] = useState(false)
  const [opacity, setOpacity] = useState('opacity-0')

  useFrame((state) => {
    const timeElapsed = state.clock.getElapsedTime()

    if (timeElapsed > 3.7 && !show) {
      setShow(true)
      setOpacity('opacity-100')
    }
  })

  return (
    <>
      <div className={`my-12 ${opacity} transition-all duration-500`}>
        <h1 className="text-xl">Frame</h1>
        <button
          className={` m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#ffe29a] hover:opacity-90 ${frameColor === 0xfff0ce ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setFrameColor(0xfff0ce)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#bfefff] hover:opacity-90 ${frameColor === 0xd3f4ff ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setFrameColor(0xd3f4ff)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#ffe0ec] hover:opacity-90 ${frameColor === 0xffe0ec ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setFrameColor(0xffe0ec)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#d4d4d4] hover:opacity-90 ${frameColor === 0xffffff ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setFrameColor(0xffffff)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#292929] hover:opacity-90 ${frameColor === 0x666666 ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setFrameColor(0x666666)}
        ></button>
        <h1 className="text-xl">Band</h1>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#b12500] hover:opacity-90 ${bandColor === 0x8a1d00 ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setBandColor(0x8a1d00)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#0069a1] hover:opacity-90 ${bandColor === 0x0069a1 ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setBandColor(0x0069a1)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#5c2513] hover:opacity-90 ${bandColor === 0x5c2513 ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setBandColor(0x5c2513)}
        ></button>

        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#d4d4d4] hover:opacity-90 ${bandColor === 0xffffff ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setBandColor(0xffffff)}
        ></button>
        <button
          className={`m-2 h-10 w-10 rounded-md border-2 border-solid bg-[#292929] hover:opacity-90 ${bandColor === 0x666666 ? 'border-green-300' : 'border-current/75'}`}
          onClick={() => setBandColor(0x666666)}
        ></button>
      </div>
    </>
  )
}
export default ColorPicker
