import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import HorizontalBarChart from "components/HorizontalBar";
import List from "components/List";
import { Pos } from "types/position";
import { RegionsType } from "types/regions";
import { ResultsType } from "types/results";
import AppChangeEvenTtype from "types/event";
import "./style.scss";
import TextInput from "components/TextInput";

type Props = {
  form: string;
  getTitle: () => any;
  API_KEY: string;
  setForm: (val: string) => void;
  loading: boolean;
  getData: () => any;
  onChange: (e: AppChangeEvenTtype) => void;
  onKeyUp: (val: any) => void;
  type: ResultsType | string;
  fetchCountrysByRegion: (continent: RegionsType) => Promise<void>;
  searchCountries: (country?: string, suggest?: boolean) => void;
  chartLabels: any;
  position: Pos;
  markerPositions: Pos[];
  setPosition: any;
};
function HomeComponent({
  form,
  searchCountries,
  getTitle,
  API_KEY,
  setForm,
  onChange,
  type,
  getData,
  onKeyUp,
  fetchCountrysByRegion,
  loading,
  position,
  markerPositions,
  chartLabels,
  setPosition,
}: Props) {
  const mapContainerStyle = {
    height: "33vh",
    width: "100%",
  };

  const center = {
    lat: 0,
    lng: -180,
  };

  return (
    <div className="home_wrapper flex flex-wrap">
      <div className="info-pane">
        <div className="search-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextInput
              type="text"
              placeholder="Enter a country"
              value={form}
              onChange={(val) => {
                onChange(val);
              }}
              onKeyUp={onKeyUp}
              style={{ width: "100%", fontSize: "21px", padding: "20px" }}
            />
          </form>

          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <List
              data={getData?.()}
              onItemClicked={(item) => {
                if (type === "regions") {
                  return fetchCountrysByRegion(item);
                }
                setForm(item);
                return searchCountries(item, false);
              }}
              listTitle={getTitle?.()}
            />
          )}
        </div>
      </div>

      <div className="map-pane" style={{ width: "70%", background: "white" }}>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            zoom={2}
            center={center}
          >
            {position?.name && (
              <InfoWindow position={position}>
                <div className="info-window">
                  <h1>{position.name}</h1>
                  <h1>{position.population} People</h1>
                </div>
              </InfoWindow>
            )}
            {markerPositions?.map((item) => (
              <Marker
                position={item}
                clickable
                onClick={() => {
                  setPosition(item);
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <HorizontalBarChart data={chartLabels} />
      </div>
    </div>
  );
}

export default HomeComponent;
