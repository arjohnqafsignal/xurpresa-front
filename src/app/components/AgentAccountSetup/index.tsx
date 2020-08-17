/**
 *
 * AgentAccountSetup
 *
 */
import React, { useEffect, useState, useRef } from 'react';
import {
  TagPicker,
  Uploader,
  Alert,
  Loader,
  Icon,
  Modal,
  Toggle,
  Panel,
} from 'rsuite';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  FormText,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';

import { philData } from 'addresspinas';
import { updateUserAuth } from './../../helpers/localStorage';
import { postApi, putApi } from './../../../utils/api';
import { FileType } from 'rsuite/lib/Uploader';

interface Props {}

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
const styles = {
  width: 150,
  height: 150,
};
export function AgentAccountSetup(props: Props) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '');
  const profilePhoto = user.photo.location ? user.photo.location : null;
  const { regions } = philData.allRegions;
  const { provinces } = philData.allProvinces;
  const { citiesAndMunicipals } = philData.allCitiesAndMunicipal;
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(profilePhoto as any);
  const [selectedRegions, selectRegions] = useState([] as any);
  const [selectedProvinces, selectProvinces] = useState([] as any);
  const [selectedCM, selectCM] = useState([] as any);
  const [filteredProvinces, filterProvinces] = useState([] as any);
  const [filteredCM, filterCM] = useState([] as any);
  const [addModal, setAddModal] = useState(false);
  const [serviceURL, setServiceURL] = useState('' as any);
  const [uploadURL, setUploadURL] = useState('' as any);
  const [serviceName, setServiceName] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);
  const [servicePersonalized, setServicePersonalized] = useState(false);
  const [servicePackage, setServicePackage] = useState(false);
  const [serviceDescription, setServiceDescription] = useState(null);
  const [servicePhotos, setServicePhotos] = useState([] as any);
  const [addServiceButton, setServiceButton] = useState(true);
  let serviceUploader;
  const handleChange = files => {
    files.length > 0 && setServiceButton(false);
    setServicePhotos(files);
  };

  const handleServiceSubmit = () => {
    postApi(`service/add-service/${user._id}`, {
      name: serviceName,
      price: servicePrice,
      description: serviceDescription,
      personalized: servicePersonalized,
      package: servicePackage,
    }).then(value => {
      setUploadURL(
        `http://localhost:9100/api/service/service-photos/${value.data._id}`,
      );
      //setAddModal(false);
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const areaCoverage = {
      regions: selectedRegions,
      provinces: selectedProvinces,
      citiesMunicipalities: selectedCM,
    };
    console.log(areaCoverage);
    const result = putApi(`agent/update-coverage/${user._id}`, {
      areaCoverage,
    });
    console.log(result);
  };

  useEffect(() => {
    var filteredProvinces = provinces.filter(function (province) {
      if (selectedRegions.includes(province.reg_code)) {
        return province;
      } else {
        return null;
      }
    });
    var cms = citiesAndMunicipals.filter(function (cm) {
      if (selectedProvinces.includes(cm.prov_code)) {
        return cm;
      } else {
        return null;
      }
    });
    filterProvinces(filteredProvinces);
    filterCM(cms);
    uploadURL && serviceUploader.start();
  }, [
    selectedRegions,
    provinces,
    filterProvinces,
    citiesAndMunicipals,
    selectedProvinces,
    filterCM,
    uploadURL,
    serviceUploader,
  ]);

  return (
    <div>
      <Row className="mt-4">
        <Col md={12}>
          <h1>Setup Account</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <h4>Update Profile Picture</h4>
                <FormGroup className="text-center">
                  <Uploader
                    fileListVisible={false}
                    listType="picture"
                    name="photo"
                    action={`http://localhost:9100/api/agent/update-photo/${user._id}`}
                    headers={{ Authorization: `Bearer ${token}` }}
                    onUpload={file => {
                      setUploading(true);
                      previewFile(file.blobFile, value => {
                        setFileInfo(value);
                      });
                    }}
                    onSuccess={(response: any, file) => {
                      setUploading(false);
                      Alert.success('Uploaded successfully');
                      updateUserAuth(response.token, response.user);
                    }}
                    onError={(reason: Object) => {
                      setFileInfo(null);
                      setUploading(false);
                      console.log(reason);
                      Alert.error('Upload failed');
                    }}
                  >
                    <button style={styles}>
                      {uploading && <Loader backdrop center />}
                      {fileInfo ? (
                        <img
                          src={fileInfo}
                          width="100%"
                          height="100%"
                          alt="profile"
                        />
                      ) : (
                        <Icon icon="avatar" size="5x" />
                      )}
                    </button>
                  </Uploader>
                  <FormText>Click photo to update.</FormText>
                </FormGroup>
              </Col>
              <Col md={6}>
                <h4>Enter Area Coverage</h4>
                <FormGroup>
                  <Label>Select Regions</Label>
                  <TagPicker
                    placeholder="Regions"
                    labelKey="name"
                    valueKey="reg_code"
                    data={regions}
                    block
                    onChange={selectRegions}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Select Provinces</Label>
                  <TagPicker
                    placeholder="Provinces"
                    labelKey="name"
                    valueKey="prov_code"
                    data={filteredProvinces}
                    block
                    onChange={selectProvinces}
                  />
                  <FormText>
                    Select Province if you want to specify your area.
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <Label>Select Cities or Municipals</Label>
                  <TagPicker
                    placeholder="Cities or Municipals"
                    labelKey="name"
                    valueKey="mun_code"
                    data={filteredCM}
                    block
                    onChange={selectCM}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4>Services Offer</h4>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={2}>
                        <Card
                          className="btn border border-light rounded p-3 text-center"
                          onClick={() => setAddModal(true)}
                          style={{
                            display: 'inline-block',
                            width: 150,
                            height: 150,
                          }}
                        >
                          <p>
                            <Icon
                              icon="plus-square"
                              size="5x"
                              className="mx-auto"
                            />
                          </p>
                        </Card>
                      </Col>
                      <Col md={2}>
                        <Panel
                          shaded
                          bordered
                          bodyFill
                          style={{ display: 'inline-block', width: 150 }}
                        >
                          <img
                            src="https://xupresa-files.s3-ap-southeast-1.amazonaws.com/services/1597656179831-cake-15.jpg"
                            height="150"
                            alt="hehe"
                          />
                        </Panel>
                      </Col>
                      <Col md={2}>
                        <Panel
                          shaded
                          bordered
                          bodyFill
                          style={{ display: 'inline-block', width: 150 }}
                        >
                          <img
                            src="https://via.placeholder.com/150?text=Xurpresa"
                            height="150"
                            alt="hehe"
                          />
                        </Panel>
                      </Col>
                      <Col md={2}>
                        <Panel
                          shaded
                          bordered
                          bodyFill
                          style={{ display: 'inline-block', width: 150 }}
                        >
                          <img
                            src="https://via.placeholder.com/150?text=Xurpresa"
                            height="150"
                            alt="hehe"
                          />
                        </Panel>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <FormGroup className="float-right mt-3">
              <Button color="success">Submit</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Modal
        backdrop="static"
        show={addModal}
        onHide={() => setAddModal(false)}
      >
        <Modal.Header>
          <Modal.Title>New Service Offer</Modal.Title>
        </Modal.Header>

        <AvForm onValidSubmit={handleServiceSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                <AvField
                  name="name"
                  label="Service Name"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please provide service name.',
                    },
                    maxLength: {
                      value: 50,
                    },
                  }}
                  onChange={e => setServiceName(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <AvGroup>
                  <Label for="price">Price</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">₱</InputGroupAddon>
                    <AvInput
                      name="rank"
                      id="price"
                      type="number"
                      required
                      onChange={e => setServicePrice(e.target.value)}
                    />
                    <AvFeedback>
                      Please provide valid price for your service.
                    </AvFeedback>
                  </InputGroup>
                </AvGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <AvField
                  name="description"
                  label="Description"
                  type="textarea"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please provide short description.',
                    },
                    maxLength: {
                      value: 50,
                    },
                  }}
                  onChange={e => setServiceDescription(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Label for="personalized" className="mr-3">
                  Personalized
                </Label>
              </Col>
              <Col>
                <Toggle
                  checkedChildren={<Icon icon="check" />}
                  unCheckedChildren={<Icon icon="close" />}
                  onChange={(checked: boolean) => {
                    setServicePersonalized(checked);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Label for="package" className="mr-5">
                  Package
                </Label>
              </Col>
              <Col>
                <Toggle
                  checkedChildren={<Icon icon="check" />}
                  unCheckedChildren={<Icon icon="close" />}
                  onChange={(checked: boolean) => {
                    setServicePackage(checked);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="images">Upload Images</Label>
                <br />
                <Uploader
                  accept="jpg,png"
                  name="photos"
                  multiple
                  listType="picture"
                  autoUpload={false}
                  action={uploadURL}
                  headers={{ Authorization: `Bearer ${token}` }}
                  onChange={handleChange}
                  onError={(reason: Object) => {
                    console.log(reason);
                    Alert.error('Upload failed');
                  }}
                  ref={ref => {
                    serviceUploader = ref;
                  }}
                >
                  <button>
                    <Icon icon="camera-retro" size="lg" />
                  </button>
                </Uploader>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button disabled={addServiceButton} color="secondary">
              Save
            </Button>{' '}
            |{' '}
            <Button onClick={() => setAddModal(false)} color="danger">
              Cancel
            </Button>
          </Modal.Footer>
        </AvForm>
      </Modal>
    </div>
  );
}
