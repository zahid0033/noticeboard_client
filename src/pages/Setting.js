import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function Setting() {
  const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;
  const [loading, setLoading] = useState(false);
  const [updateOrgLogo, setUpdateOrgLogo] = useState(false);
  const [updateOrgName, setUpdateOrgName] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const { user } = useSelector((state) => state.auth);
  const changeName = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${REACT_APP_NOT_AXIOS_BASE_URL}/admin/changeorgname/${user?.organization}`,
        {
          name: name,
        }
      );
      if (data.success) {
        getOrgName();
        setUpdateOrgName(false);
      } else {
        console(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getOrgName = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_NOT_AXIOS_BASE_URL}/admin/getorgname/${user?.organization}`
      );
      setOrgName(data.orgname);
      setOrgLogo(data.logo);
    } catch (error) {
      console.log(error.message);
    }
  }, [REACT_APP_NOT_AXIOS_BASE_URL, name, user.organization]);
  const updateLogo = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Select a file to upload first");
      setLoading(false);
      return;
    }
    try {
      let headers = new Headers();
      headers.append("Accept", "Application/JSON");
      headers.append("Access-Control-Allow-Origin", "*");

      let formdata = new FormData();
      formdata.append("file", file);

      let req = new Request(
        `${REACT_APP_NOT_AXIOS_BASE_URL}/admin/changelogo/${user?.organization}`,
        {
          method: "POST",
          headers,
          mode: "cors",
          body: formdata,
        }
      );

      fetch(req)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // setLoading(false);
            setUpdateOrgLogo(false);
            getOrgName();
          } else {
            alert(data.message);
            // setLoading(false);
          }
        })
        .catch((err) => alert(err.message));
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrgName();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form style={{ margin: "10px 0" }} onSubmit={changeName}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Rename your organization
              </label>
              <input
                className="form-control"
                defaultValue={orgName}
                name="name"
                id="name"
                type="text"
                disabled={!updateOrgName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn"
                onClick={() => setUpdateOrgName((u) => !u)}
              >
                {updateOrgName ? "Cancel" : "Edit"}
              </button>
              <button type="submit" disabled={!updateOrgName} className="btn">
                Change name
              </button>
            </div>
          </form>
        </div>
        <div className="col">
          <form style={{ margin: "10px 0" }} onSubmit={updateLogo}>
            <img src={orgLogo} style={{ height: "200px", width: "200px" }} />
            <Form.Group>
              <Form.Label htmlFor="file" className="form-label">
                Choose your organization logo
              </Form.Label>
              <Form.File
                className="form-control"
                name="file"
                id="file"
                type="file"
                disabled={!updateOrgLogo}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <div className="mb-3">
              <button
                type="button"
                className="btn"
                onClick={() => setUpdateOrgLogo((u) => !u)}
              >
                {updateOrgLogo ? "Cancel" : "Edit"}
              </button>
              <button type="submit" disabled={!updateOrgLogo} className="btn">
                Change logo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
