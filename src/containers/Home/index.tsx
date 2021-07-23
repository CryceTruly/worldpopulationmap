import { useCallback, useState } from "react";
import { debounce } from "debounce";
import REGIONS, { RegionsType } from "types/regions";
import HomeComponent from "pages/Home";
import AppChangeEvenTtype from "types/event";

function Home() {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState("");
  const [markerPositions, setMarkerPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartLabels, setChartLabels] = useState({
    label: "Number of Peple",
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1,
  });

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
    name: undefined,
    population: undefined,
  });

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";

  console.log("API_KEY :>> ", API_KEY);

  const [type, setType] = useState("regions");

  const searchCountries = (val = form, suggest = false) => {
    setLoading(true);
    setSuggestions([]);
    setResults([]);

    if (suggest) {
      setType("suggestions");
      setChartLabels({
        label: "Number of Peple",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      });
    } else {
      setType("results");
    }
    fetch(`https://restcountries.eu/rest/v2/name/${val}`).then((res) =>
      res
        .json()
        .then((data) => {
          if (suggest) {
            setSuggestions(data.status ? [] : data);
            setResults([]);
            setLoading(false);
          } else {
            setSuggestions([]);
            setResults(data);
            setMarkerPositions(
              data.map((item: any) => ({
                lat: item.latlng[0],
                lng: item.latlng[1],
                name: item.name,
                population: item.population,
              }))
            );
            const allLabels = data.map((item: any) => {
              return item.name;
            });
            const allPops = data.map((item: any) => item.population);

            setChartLabels((prev: any) => ({
              ...prev,
              labels: allLabels,
              data: allPops,
              backgroundColor: Array(allPops.length).fill(
                "rgba(255, 159, 64, 0.2)"
              ),
              borderColor: Array(allPops.length).fill("rgba(255, 99, 132, 1)"),
            }));

            setLoading(false);
          }
        })
        .catch((err) => setLoading(false))
    );
  };

  const fetchCountrysByRegion = async (continent: RegionsType) => {
    setLoading(true);
    fetch(`https://restcountries.eu/rest/v2/region/${continent}`).then((res) =>
      res
        .json()
        .then((data) => {
          setResults(data);
          setMarkerPositions(
            data.map((item: any) => ({
              lat: item.latlng[0],
              lng: item.latlng[1],
              name: item.name,
              population: item.population,
            }))
          );
          const allLabels = data.map((item: any) => item.name);
          const allPops = data.map((item: any) => item.population);

          setChartLabels((prev: any) => ({
            ...prev,
            labels: allLabels,
            data: allPops,
            backgroundColor: Array(allPops.length).fill(
              "rgba(255, 159, 64, 0.2)"
            ),
            borderColor: Array(allPops.length).fill("rgba(255, 99, 132, 1)"),
          }));
          setLoading(false);
        })
        .catch((err) => setLoading(false))
    );
  };

  const getData = () => {
    if (type === "regions") {
      return REGIONS;
    }
    if (type === "suggestions") {
      return suggestions.map((item: any) => item.name);
    }

    return results.map((item: any) => item.name);
  };

  const getTitle = () => {
    if (type === "regions") {
      return "Available regions";
    }
    if (type === "suggestions") {
      return "Suggesstions";
    }

    return "Search Results";
  };

  const onDebounce = useCallback(
    debounce((val: boolean) => {
      searchCountries(form, val);
    }, 1000),
    [form.length]
  );

  const onChange = (e: AppChangeEvenTtype) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.value) {
      setResults([]);
      setSuggestions([]);
      setType("regions");
    }
    setForm(e.target.value.trim());
  };

  const onKeyUp = (e: any) => {
    if (e.key === "Enter") {
      searchCountries();
    } else if (form.length) {
      onDebounce(true);
    } else {
      setSuggestions([]);
      setType("regions");
    }
  };

  return (
    <HomeComponent
      type={type}
      setPosition={setPosition}
      position={position}
      markerPositions={markerPositions}
      searchCountries={searchCountries}
      loading={loading}
      getData={getData}
      chartLabels={chartLabels}
      getTitle={getTitle}
      onKeyUp={onKeyUp}
      form={form}
      setForm={setForm}
      onChange={onChange}
      fetchCountrysByRegion={fetchCountrysByRegion}
      API_KEY={API_KEY}
    />
  );
}

export default Home;
