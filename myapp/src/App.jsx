// import React from "react";
// import "./index.css";
// import styles from "./app.module.css";
// import axios from "axios";
// import { FaMapMarkerAlt, FaBuilding, FaLink, FaGithub } from "react-icons/fa";
// import { useState } from "react";
// function App() {
//   let [githubUserName, setGithubUserName] = useState("");

//   const [userObj, setuserobj] = useState({});

//   const searchUser = async () => {
//     try {
//       if (!githubUserName) {
//         return alert("invalid username");
//       }

//       const res = await axios.get(
//         `https://api.github.com/users/${githubUserName}`
//       );

//       console.log(res.data);
//       setuserobj({ ...res.data });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   console.log("userObj", userObj);
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.h1}>Search for a Github Profile</h1>
//       <div className={styles.search}>
//         <input
//           type="text"
//           placeholder="Search Github User Name..."
//           onChange={(e) => setGithubUserName(e.target.value)}
//         />
//         <button onClick={searchUser}>Search</button>
//       </div>
//       <div className={styles.card}>
//         <div className={styles.firstCon}>
//           <div className={styles.circle}>
//             <img src={userObj.avatar_url} />
//           </div>
//           <div>
//             <h1>{userObj.name}</h1>
//             <p className={styles.userLogin}>@{userObj.login}</p>
//             <p>{userObj.bio}</p>
//           </div>
//           <div className={styles.dateCon}>
//             <p>
//               Joined:{" "}
//               {new Date(userObj.created_at).toLocaleDateString("en-US", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </p>
//           </div>
//         </div>
//         <div className={styles.repoCon}>
//           <div>
//             <p>Repositories</p>
//             <p>{userObj.public_repos}</p>
//           </div>
//           <div>
//             <p>Followers</p>
//             <p>{userObj.followers}</p>
//           </div>
//           <div>
//             <p>Followings</p>
//             <p>{userObj.following}</p>
//           </div>
//         </div>

//         <div className={styles.otherInfo}>
//           <div>
//             <p>
//               {" "}
//               <span
//                 style={{
//                   padding: "5px",
//                 }}
//               >
//                 {" "}
//                 <FaMapMarkerAlt size={20} color="#0079FF" />{" "}
//               </span>
//               {userObj.location || "Not Avaliable"}
//             </p>

//             <p>
//               <span
//                 style={{
//                   padding: "5px",
//                 }}
//               >
//                 {" "}
//                 <FaBuilding size={20} color="#0079FF" />
//               </span>
//               {userObj.company || "Not Avaliable"}
//             </p>
//           </div>
//           <div className={styles.linkCon}>
//             <p>
//               <span
//                 style={{
//                   padding: "5px",
//                 }}
//               >
//                 <FaLink size={20} color="#0079FF" />
//               </span>
//               {userObj.blog ? (
//                 <a
//                   href={
//                     userObj.blog.startsWith("http")
//                       ? userObj.blog
//                       : `https://${userObj.blog}`
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "#0079FF", textDecoration: "none" }}
//                 >
//                   {userObj.blog}
//                 </a>
//               ) : (
//                 "Not Available"
//               )}
//             </p>
//             <p>
//               <span
//                 style={{
//                   padding: "5px",
//                 }}
//               >
//                 {" "}
//                 <FaGithub size={20} color="#0079FF" />
//               </span>
//               <a href={userObj.html_url} target="_blank">
//                 {userObj.html_url}
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./index.css";
import styles from "./app.module.css";
import axios from "axios";
import profilePic from "./images/default.webp";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaLink,
  FaGithub,
  FaTimesCircle,
} from "react-icons/fa";

function App() {
  let [githubUserName, setGithubUserName] = useState("");
  const [userObj, setuserobj] = useState(null);
  const [error, setError] = useState("");

  const searchUser = async () => {
    try {
      if (!githubUserName) {
        return alert("invalid username");
      }

      setError("");
      setuserobj(null);

      const res = await axios.get(
        `https://api.github.com/users/${githubUserName}`
      );

      setuserobj(res.data);
    } catch (error) {
      console.log(error.message);
      setError("User Not Found");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Search for a Github Profile</h1>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search Github User Name..."
          onChange={(e) => setGithubUserName(e.target.value)}
        />
        <button onClick={searchUser}>Search</button>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <h1>
            <FaTimesCircle className={styles.errorIcon} />
            {error}
          </h1>
        </div>
      )}

      {userObj && (
        <div className={styles.card}>
          <div className={styles.firstCon}>
            <div className={styles.circle}>
              <img
                src={userObj.avatar_url || profilePic}
                onError={(e) => (e.target.src = profilePic)}
                alt="profile"
              />
            </div>
            <div>
              <h1>{userObj.name}</h1>
              <p className={styles.userLogin}>@{userObj.login}</p>
              <p>{userObj.bio || "No bio available"}</p>
            </div>
            <div className={styles.dateCon}>
              <p>
                Joined:{" "}
                {new Date(userObj.created_at).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className={styles.repoCon}>
            <div>
              <p>Repositories</p>
              <p>{userObj.public_repos}</p>
            </div>
            <div>
              <p>Followers</p>
              <p>{userObj.followers}</p>
            </div>
            <div>
              <p>Following</p>
              <p>{userObj.following}</p>
            </div>
          </div>

          <div className={styles.otherInfo}>
            <div>
              <p>
                <span style={{ padding: "5px" }}>
                  <FaMapMarkerAlt size={20} color="#0079FF" />
                </span>
                {userObj.location || "Not Available"}
              </p>

              <p>
                <span style={{ padding: "5px" }}>
                  <FaBuilding size={20} color="#0079FF" />
                </span>
                {userObj.company || "Not Available"}
              </p>
            </div>

            <div className={styles.linkCon}>
              <p>
                <span style={{ padding: "5px" }}>
                  <FaLink size={20} color="#0079FF" />
                </span>
                {userObj.blog ? (
                  <a
                    href={
                      userObj.blog.startsWith("http")
                        ? userObj.blog
                        : `https://${userObj.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userObj.blog}
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>

              <p>
                <span style={{ padding: "5px" }}>
                  <FaGithub size={20} color="#0079FF" />
                </span>
                {userObj.html_url ? (
                  <a
                    href={userObj.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userObj.html_url}
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
