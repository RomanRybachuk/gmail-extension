import { useEffect, useState, useMemo } from "react";
import { window_send_message } from "@/store";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import OpenIcon from "@mui/icons-material/MenuOpen";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import "../css/sidebar.css";

function SideBar() {
  const [sidebar_is_opened, set_sidebar_is_opened] = useState(true);
  const [isEditing,setIsEditing]=useState(false);
  const [inputValue,setInputValue]=useState("");
  const [notes,setNotes]=useState<{text:String,timeStamp:String}[]>([]);

  const handleButtonClick=()=>{
    setIsEditing(!isEditing);
  }

  const handleInputValue=(e:any)=>{
    setInputValue(e.target.value);
  }

    const handleCancel=()=>{
      setIsEditing(!isEditing);
      setInputValue("");
    }

  const handleSave=()=>{
    const timeStamp= new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
    const newNote={text:inputValue, timeStamp:timeStamp}
    setNotes([...notes,newNote]);
    // console.log("save",notes);
    setIsEditing(!isEditing);
    setInputValue("");
  }

  const ButtonControl = useMemo(() => {
    return (
      <IconButton
        sx={{ position: "absolute", top: "0px", right: "0px" }}
        onClick={handle_click_control}
        size="small"
        aria-label="close"
      >
        {sidebar_is_opened ? <CloseIcon /> : <OpenIcon />}
      </IconButton>
    );
  }, [sidebar_is_opened]);

  useEffect(() => {
    // console.log("sidebar.tsx");
    window_send_message("parent", "handle_sidebar_iframe_ready");
  }, []);

  function handle_click_control() {
    set_sidebar_is_opened(!sidebar_is_opened);

    if (sidebar_is_opened) {
      // console.log("sidebar.tsx11")
      window_send_message("parent", "handle_sidebar_close");
    } else {
      window_send_message("parent", "handle_sidebar_open");
    }
  }

  return (
    <Box className="sidebar" sx={{ position: "relative" }}>
      {ButtonControl}

      {sidebar_is_opened ? (
        <Box className="sidebar__inner" sx={{ padding: "7px" }}>
          <header className="sidebar__header">
            <Stack
              alignItems={"center"}
              justifyContent={"space-between"}
              direction="row"
            >
              <h2>Notes</h2>
            </Stack>
          </header>

          <section>
          <Box className="sidebar_section1">
            <Box>
              <h4>Assigned to</h4>
              <h2>Random Name</h2>
            </Box>
            <Box>
              <h4>status</h4>
              <select name="" id="">
                <option value="">Open</option>
              </select>
            </Box>
          </Box>
          </section>


        <section>
      {isEditing ? (
        <>
        <textarea className="add_note_input editing" placeholder="Type your note..." value={inputValue} onChange={handleInputValue} />
        <Box className="textarea_buttons_box">
        <button className="cancel_button" onClick={handleCancel}>cancel</button>
        <button className="save_button" onClick={handleSave}>save</button>
        </Box>
        </>
      ) : (
        <button className="add_note_input" onClick={handleButtonClick}>
          Add a note...
        </button>
      )}
        </section>

          <main className="sidebar__main">
        {
          notes?.map((ele,index)=>(
            <Box key={index} className="notes_div">
              <p>{ele.text}</p>
              <p>{ele.timeStamp}</p>
            </Box>
          ))
        }
          </main>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default SideBar;
