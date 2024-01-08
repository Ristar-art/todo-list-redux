import { useNavigate } from "react-router-dom";
import backgroundPick from "./pexels-ekaterina-bolovtsova-6192131.jpg";
import { Navbar } from "./Navbar";
export const Home = () => {
  // this is for navigating to other pages from the homepage
  const navigate = useNavigate();
  return (
    <div
      style={{
        // top: 40,
        left: 0,
        bottom: 0,
        right: 0,
        overflowX: "hidden",
        position: "absolute",
        height: "100vh",
      }}
    >
      
      <img
        src={`${backgroundPick}`}
        alt="Gallery"
        style={{ width: "100vw", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "70%",
          transform: "translate(-50%, -50%)",
          /* background-color: rgba(0, 0, 0, 0.5); Add a background color to make the text more readable */
          padding: "10px",
          color: "rgb(241, 138, 42)",
          fontSize: "24px",
        }}
      >
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',borderRadius:5, flexWrap:'wrap', minWidth:'30vw',minHeight:'30vh',backgroundColor:'gray'}}>
          {" "}
         
          <button
            onClick={() => {
              navigate("/todolist");
            }}
            style={{padding:10}}
          >
            VIEW TO DO
          </button>
        </div>

        {/* <h1>My To Do</h1> */}
      </div>
    </div>
  );
};
