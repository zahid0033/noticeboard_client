import { useEffect, useState, useCallback } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;
const socket = io(REACT_APP_NOT_AXIOS_BASE_URL);

export default function EditNoticeSet({ match }) {
  // const history = useHistory()
  const [noticeSet, setNoticeSet] = useState({});
  const [materialQuery, setMaterialQuery] = useState();
  const [editNoticeSet, setEditNoticeSet] = useState(false);
  //const [loading, setLoading] = useState(false)
  const [materials, setMaterials] = useState([]);
  const [materialloading, setMaterialloading] = useState(false);
  const getMaterials = async () => {
    setMaterialloading(true);
    try {
      const { data } = await axios.get(`/admin/getmaterials`);
      if (data.success) {
        setMaterials(data.materials);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setMaterialloading(false);
  };
  const getNoticeSet = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/admin/getnoticeset/${match.params.id}`
      );
      setNoticeSet(data.noticeset);
      if (data.success) {
        getMaterials();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [match.params.id]);
  const { user } = useSelector((state) => state.auth);
  const { handleSubmit, register, watch } = useForm();
  const updateData = (formData) => {
    socket.emit("updatedata", formData);
  };
  const updateNoticeSet = async (values) => {
    try {
      const { data } = await axios.put(
        `/admin/updatenoticeset/${match.params.id}`,
        values
      );
      if (data.success) {
        setEditNoticeSet(false);
        getNoticeSet();
        let formdata = {
          id: noticeSet._id,
        };
        updateData(formdata);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNoticeSet();
  }, [getNoticeSet]);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("connected", { type: "admin", id: user.id });
    });
  }, [user.id]);
  return (
    <Container>
      <Row lg={1} md={1} sm={1} xl={1} xs={1}>
        <Col style={{ marginTop: "20px" }}>
          <Form onSubmit={handleSubmit(updateNoticeSet)}>
            <h1>Edit notice set</h1>
            <Form.Group>
              <Form.Label>Notice Set Name</Form.Label>
              <Form.Control
                defaultValue={noticeSet?.name}
                disabled={!editNoticeSet}
                name="name"
                ref={register({
                  required: "You must input a notice set name",
                })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select notice display type</Form.Label>
              <Form.Control
                disabled={!editNoticeSet}
                as="select"
                defaultValue={noticeSet?.viewtype}
                name="viewtype"
                ref={register({
                  required: "You must select a notice display type",
                })}
              >
                <option value="slider">Slider</option>
                <option value="singleimage">Single Image</option>
                {/* <option value="grid">Grid</option> */}
                <option value="gridslider">Grid Slider</option>
              </Form.Control>
            </Form.Group>
            {watch("viewtype") !== "singleimage" && (
              <Form.Group>
                <Form.Label>Set slide interval in seconds</Form.Label>
                <Form.Control
                  disabled={!editNoticeSet}
                  defaultValue={noticeSet?.interval}
                  name="interval"
                  type="number"
                  ref={register({
                    required: "You must input notice slider interval",
                  })}
                />
              </Form.Group>
            )}
            <Form.Group>
              {materialloading ? (
                <Spinner animation="border" />
              ) : (
                <>
                  <Form.Label>Select materials for notice</Form.Label>
                  <Form.Control
                    disabled={!editNoticeSet}
                    onChange={(e) => setMaterialQuery(e.target.value)}
                    placeholder="Search materials here"
                  />
                  <div style={{ maxHeight: "200px", overflow: "auto" }}>
                    {materials
                      ?.filter((material) => {
                        return (
                          material.name
                            ?.toLowerCase()
                            .includes(materialQuery?.toLowerCase()) ||
                          !materialQuery
                        );
                      })
                      .map((material, id) => (
                        <Form.Check
                          disabled={!editNoticeSet}
                          key={id}
                          type="checkbox"
                          id="materials"
                          defaultChecked={noticeSet?.materials?.some(
                            (ns) => ns._id === material._id
                          )}
                          name="materials"
                          label={material.name}
                          value={material._id}
                          ref={register}
                        />
                      ))}
                  </div>
                </>
              )}
            </Form.Group>

            {editNoticeSet ? (
              <>
                <Button type="button" onClick={() => setEditNoticeSet(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Notice Set</Button>
              </>
            ) : (
              <>
                <Button type="button" onClick={() => setEditNoticeSet(true)}>
                  Edit
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
