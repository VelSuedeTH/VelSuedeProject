import React from 'react'

export default function App() {
  return (
    <div>
      <h1>APP</h1>
    </div>
  )
}




// import React, { useState, useEffect } from 'react';
// import './styles.css';

// import { API } from './backend'

// function App() {
//   const [heros, setHeros] = useState([])

//   useEffect(async () => {
//     try {
//       const res = await fetch(`${API}model`, {method: 'GET'})
//       const heros_data = await res.json()
//       setHeros(heros_data)
//     } catch (error) {
//         console.log(error)
//       }
//  }, [])

//   return (
//     <div className="App">
//       <header className="App-header">
//     {heros.map(item => (
//       <div key={item.id}>
//         <h1>{item.ModelName}</h1>
//       </div>
//     ))}
//   </header>
//     </div>
//   );
// }

// export default App;
