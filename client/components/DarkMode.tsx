import { useEffect, useState } from 'react'

function DarkMode() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.body.classList.toggle('darkMode', isDark)
  }, [isDark])

  const handleChange = () => setIsDark(!isDark)

  return (
    <>
      <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        onClick={handleChange}
        style={{
          width: '32px',
          top: '30px',
          position: 'absolute',
        }}
        className={isDark ? 'inactiveTheme' : 'activeTheme'}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="Layer_2" data-name="Layer 2">
            {' '}
            <g id="Icons">
              {' '}
              <g>
                {' '}
                <rect width="48" height="48" fill="none"></rect>{' '}
                <g>
                  {' '}
                  <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"></path>{' '}
                  <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"></path>{' '}
                </g>{' '}
              </g>{' '}
            </g>{' '}
          </g>{' '}
        </g>
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleChange}
        style={{
          width: '32px',
          top: '30px',
          position: 'absolute',
          borderRadius: '50%',
        }}
        className={isDark ? 'activeTheme' : 'inactiveTheme'}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <g clipPath="url(#a)" fill="#ffffff">
            {' '}
            <path d="M12 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1ZM4.929 3.515a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 0 0 1.414-1.414L4.93 3.515ZM1 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H1ZM18 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM17.657 16.243a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 1 0 1.414-1.414l-2.828-2.828ZM7.757 17.657a1 1 0 1 0-1.414-1.414L3.515 19.07a1 1 0 1 0 1.414 1.414l2.828-2.828ZM20.485 4.929a1 1 0 0 0-1.414-1.414l-2.828 2.828a1 1 0 1 0 1.414 1.414l2.828-2.828ZM13 19a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>{' '}
          </g>{' '}
          <defs>
            {' '}
            <clipPath id="a">
              {' '}
              <path fill="#ffffff" d="M0 0h24v24H0z"></path>{' '}
            </clipPath>{' '}
          </defs>{' '}
        </g>
      </svg>
    </>
  )
}

export default DarkMode
