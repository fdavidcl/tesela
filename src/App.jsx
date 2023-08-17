import { createContext, useContext, useReducer, useState } from "react";
import "./App.css";
import { saveData } from "./storage";

const EditModeContext = createContext(false);

const bookmarkReducer = (state, action) => {
  if (action.type == "bookmarks/add") {
    let { listIndex, title, href } = action.payload;
    if (href.indexOf("://") < 0) {
      href = `https://${href}`;
    }
    const newState = {
      ...state,
      lists: [
        ...state.lists.slice(0, listIndex),
        {
          ...state.lists[listIndex],
          links: [...state.lists[listIndex].links, { title, href }],
        },
        ...state.lists.slice(listIndex + 1),
      ],
    };
    saveData(newState);

    return newState;
  }
  if (action.type == "bookmarks/delete") {
    const { listIndex, bookmarkIndex } = action.payload;
    const newState = {
      ...state,
      lists: [
        ...state.lists.slice(0, listIndex),
        {
          ...state.lists[listIndex].slice(0, bookmarkIndex),
          ...state.lists[listIndex].slice(bookmarkIndex + 1),
        },
        ...state.lists.slice(listIndex + 1),
      ],
    };

    saveData(newState);
    return newState;
  }
  if (action.type == "lists/add") {
    let { title } = action.payload;
    if (title.length == 0) {
      title = "New list";
    }
    const newState = {
      ...state,
      lists: [
        ...state.lists,
        {
          title,
          links: [],
        },
      ],
    };

    saveData(newState);
    return newState;
  }
  if (action.type == "lists/delete") {
    let { index } = action.payload;
    const newState = {
      ...state,
      lists: [...state.lists.slice(0, index), ...state.lists.slice(index + 1)],
    };

    saveData(newState);
    return newState;
  }

  raise(Error("Invalid action type"));
  return state;
};

const Bookmark = ({ title, href, icon = null }) => {
  let bgImage = "";
  try {
    bgImage = `url('https://s2.googleusercontent.com/s2/favicons?domain=${
      href.split("://")[1].split("/")[0]
    }')`;
  } catch {}
  return (
    <a href={href} style={{ backgroundImage: bgImage }}>
      <span>{title}</span>
    </a>
  );
};

const NewBookmark = ({ addBookmark }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const editMode = useContext(EditModeContext);

  if (!editMode) return null;

  return (
    <div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => addBookmark(title, url)}>Add</button>
    </div>
  );
};

const List = ({ title, links, addBookmark }) => {
  return (
    <div className="list-box">
      <h2>{title}</h2>
      <ul className="list">
        {links.map((link, index) => (
          <li key={index}>
            <Bookmark {...link} />
          </li>
        ))}
      </ul>
      <NewBookmark addBookmark={addBookmark} />
    </div>
  );
};

const NewList = ({ addList }) => {
  const [title, setTitle] = useState("");
  const editMode = useContext(EditModeContext);

  if (!editMode) return null;

  return (
    <div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => addList(title)}>Add</button>
    </div>
  );
};
const NavBar = ({ toggleEditMode }) => {
  return (
    <nav>
      <button onClick={toggleEditMode}>Toggle editing</button>
    </nav>
  );
};

const App = ({ initialState }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);
  const [editStatus, setEditStatus] = useState(false);

  const toggleEditMode = () => setEditStatus(!editStatus);

  const addToList = (listIndex) => (title, href) =>
    dispatch({
      type: "bookmarks/add",
      payload: { listIndex, title, href },
    });
  const addList = (title) =>
    dispatch({ type: "lists/add", payload: { title } });
  return (
    <EditModeContext.Provider value={editStatus}>
      <NavBar toggleEditMode={toggleEditMode} />
      <div className="container">
        {state.lists.map((l, index) => (
          <List key={index} {...l} addBookmark={addToList(index)} />
        ))}
        <NewList addList={addList} />
      </div>
    </EditModeContext.Provider>
  );
};

// const container = document.getElementById("app");
// const root = ReactDOM.createRoot(container);
// root.render(<App initialState={savedData || initialState} />);
export default App;
