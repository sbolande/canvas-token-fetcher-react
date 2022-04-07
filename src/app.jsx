import * as React from "react";
import { createRoot } from "react-dom/client";

import { Form } from "./components/Form/Form.jsx";

const root = createRoot(document.getElementById("root"));

root.render(<Form />);
