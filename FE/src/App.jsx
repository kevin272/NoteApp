import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from './pages/CreatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from "./components/Navbar.jsx"
import { useColorModeValue } from "@chakra-ui/react"

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("black","white")}>
      {<Navbar/>}
      <Routes>
        <Route path="/" element = {<HomePage />}/>
        <Route path="/create" element = {<CreatePage />}/>
      </Routes>
    </Box>
  )
}

export default App

// import "./styles.css";

// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import React, { useCallback } from "react";

// export default function App() {
//   const particlesInit = useCallback(async (engine) => {
//     // loads tsparticles package bundle
//     await loadFull(engine);
//   }, []);

//   return (
//     <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           background: {
//             color: {
//               value: "transparent",
//             },
//           },
//           particles: {
//             color: { value: "#000000" },
//             links: {
//               color: "#000000",
//               enable: true,
//               distance: 150,
//               opacity: 0.4,
//               width: 1,
//             },
//             number: { value: 50, density: { enable: true, area: 800 } },
//             size: { value: 3 },
//             move: { enable: true, speed: 1 },
//           },
//           detectRetina: true,
//         }}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 0,
//           pointerEvents: "none",
//         }}
//       />

//       <div className="App" style={{ position: "relative", zIndex: 1, padding: "20px" }}>
//         <h1>Hello CodeSandbox</h1>
//         <h2>Start editing to see some magic happen!</h2>
//       </div>
//     </div>
//   );
// }

