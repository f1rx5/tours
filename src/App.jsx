import { useEffect, useState } from "react";
import Axios from "axios";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchData = () => {
    Axios.get(url)
      .then((resp) => {
        setTours(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button type="button" style={{ marginTop: "2rem" }} className="btn" onClick={()=> fetchData()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* <pre>{JSON.stringify(tours)}</pre> */}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
