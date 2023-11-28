import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Posts from "./Posts";
import Doubts from "./Doubts";

export default function Feed() {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className=" mt-5 ">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Your Posts" />
        <Tab value="two" label="Doubts" />
      </Tabs>

      {value === "one" && (
        <TabPanel value={value} index="one">
          <Posts />
        </TabPanel>
      )}
      {value === "two" && (
        <TabPanel value={value} index="two">
          <Doubts />
        </TabPanel>
      )}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}