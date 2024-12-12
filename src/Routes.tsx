import {Routes, Route } from "react-router-dom";

import App from './App'
import Students from "./Students";

const RoutesDef=()=>{return <Routes>
    <Route index element={<App />} />
    <Route path="Students" element={<Students />} />
    </Routes>
}

export default RoutesDef;