/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {

        textColor: '#0052cc',
        yellow: '#ffab00',
        textColor2: ' #505f79',
        textColor3: '#a5adba',
        textColor4: 'rgb(126 149 187)',
        textColor5: '#ffab00',
        textColor6: '#fc3a3f',
        searchIcon: ' #dfe1e6',
        placeHolder: ' #505f79',
        sideShadow: '0 0 6px #172b4d0a',
        shadowColor: '0 0 10px #172b4d1a',
        dashboard: ' #ffffff',
        downIcon: ' #2684ff',
        heading: '#172b4d',
        sectionColor: ' #7a869a',
        bgColor: '#36b37e',
        bgColor2: 'rgb(214, 212, 212)',
        bgColor3: '#f4f5f7',
        reds: '#fc3a3f',
        browns: '#999',
        blacks: '#333',
        darkBlue: '#172b4d',
        black2: '#000000de',
        blanche: '#a5adba',
        disbaled: '#f2f3f4'

      },
        screens: {

          'xsm' : {'max' :'640px', 'min' : '250px'},

          'sm': {'max' : '768px', 'min' : '640px'},
          // => @media (min-width: 640px) { ... }
    
          'md': {'max' :'1024px','min' : '768px'},
          // => @media (min-width: 768px) { ... }
    
          'lg': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'xl': '1280px',
          // => @media (min-width: 1280px) { ... }
    
          '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        }
      }

  },
  plugins: [],
}