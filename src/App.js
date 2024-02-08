import { work, play, study, exercise, social, self } from "./assets/svg/export";
import Jeremy from "./assets/img/image-jeremy.png";
import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [activities, setActivities] = useState([]);
  const [timeframe, setTimeframe] = useState("weekly");

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  }, []);

  const svgs = [work, play, study, exercise, social, self];

  return (
    <div className="App">
      <div className="wrapper">
        {/*  */}
        <div className="main-container">
          <div className="profile-container">
            <img src={Jeremy} alt="profile pic" />
            <div className="choice-container">
              <button onClick={() => setTimeframe("daily")}>Daily</button>
              <button onClick={() => setTimeframe("weekly")}>Weekly</button>
              <button onClick={() => setTimeframe("monthly")}>Monthly</button>
            </div>
          </div>
          <div className="activities-container">
            {activities.map((activity, index) => (
              <div className={`container-theme ${activity.title.toLowerCase().split(" ")[0]}`} key={index}>
                {/* <img src={svgs[index]} alt={`${activity.title} icon`} /> */}
                <div className="info-container">
                  <h2>{activity.title}</h2>
                  <p>
                    Current: {activity.timeframes[timeframe].current}hrs
                    <br />
                    Previous: {activity.timeframes[timeframe].previous}hrs
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default App;
