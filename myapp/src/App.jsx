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
      <header className={styles.hero}>
        <h1 className={styles.h1}>GitHub Profile Search</h1>
        <p className={styles.subtitle}>
          Search any GitHub username to view detailed developer profiles and
          public activity.
        </p>
      </header>

      <div className={styles.search}>
        <label htmlFor="github-user-search" className={styles.srOnly}>
          Search GitHub username
        </label>
        <div className={styles.searchInputWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            <FaGithub />
          </span>
          <input
            id="github-user-search"
            type="text"
            value={githubUserName}
            placeholder="Search GitHub username..."
            aria-label="Search GitHub username"
            onChange={(e) => setGithubUserName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchUser();
              }
            }}
          />
          <button type="button" onClick={searchUser}>
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorIconWrap} aria-hidden="true">
              <FaTimesCircle />
            </div>
            <h2>{error}</h2>
            <p>Try another username to look up a valid GitHub profile.</p>
          </div>
        </div>
      )}

      {userObj && (
        <div className={styles.card}>
          <div className={styles.firstCon}>
            <div className={styles.circle}>
              <img
                src={userObj.avatar_url || profilePic}
                onError={(e) => (e.target.src = profilePic)}
                alt={`${userObj.login || "GitHub user"} avatar`}
              />
            </div>

            <div className={styles.userMeta}>
              <h2 className={styles.name}>{userObj.name || userObj.login}</h2>
              <p className={styles.userLogin}>@{userObj.login}</p>
              <p className={styles.bio}>{userObj.bio || "No bio available"}</p>
            </div>

            <div className={styles.dateCon}>
              <span className={styles.dateLabel}>Joined</span>
              <p>
                {new Date(userObj.created_at).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className={styles.repoCon}>
            <div className={styles.repoStat}>
              <p>Repositories</p>
              <span>{userObj.public_repos}</span>
            </div>
            <div className={styles.repoStat}>
              <p>Followers</p>
              <span>{userObj.followers}</span>
            </div>
            <div className={styles.repoStat}>
              <p>Following</p>
              <span>{userObj.following}</span>
            </div>
          </div>

          <div className={styles.otherInfo}>
            <div className={styles.infoGroup}>
              <div className={styles.infoRow}>
                <span className={styles.iconWrap}>
                  <FaMapMarkerAlt />
                </span>
                <span>{userObj.location || "Not Available"}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.iconWrap}>
                  <FaBuilding />
                </span>
                <span>{userObj.company || "Not Available"}</span>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoRow}>
                <span className={styles.iconWrap}>
                  <FaLink />
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
                  <span>Not Available</span>
                )}
              </div>

              <div className={styles.infoRow}>
                <span className={styles.iconWrap}>
                  <FaGithub />
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
                  <span>Not Available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
