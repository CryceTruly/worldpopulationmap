type Props = {
  onItemClicked: (item: any) => void;
  data: Array<any>;
  listTitle?: string;
};

function List({ listTitle, data, onItemClicked }: Props) {
  return (
    <>
      <h2>{listTitle}</h2>
      <div className="container" style={{ height: "70vh", overflow: "scroll" }}>
        {data?.map((country) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onItemClicked(country)}
          >
            <div className="item">
              <h5>{country}</h5>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default List;
