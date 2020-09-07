/**
 *
 * AgentAccountSetup
 *
 */
import React, { useEffect, useState } from 'react';
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
import { updateUserAuth, updateUser } from './../../helpers/localStorage';
import { postApi, putApi, getApi, deleteApi } from './../../../utils/api';
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

  const [setupSubmit, setSetupSubmit] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [uploadURL, setUploadURL] = useState('' as any);
  const [uploadEditURL, setUploadEditURL] = useState('' as any);

  const [serviceName, setServiceName] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);
  const [servicePersonalized, setServicePersonalized] = useState(false);
  const [servicePackage, setServicePackage] = useState(false);
  const [serviceDescription, setServiceDescription] = useState(null);
  const [servicePhotos, setServicePhotos] = useState([] as any);
  const [addServiceButton, setServiceButton] = useState(true);
  const [updateServiceButton, setUpdateServiceButton] = useState(true);
  const [services, setServices] = useState([] as any);
  const [isLoading, setLoading] = useState(false);

  //Edit Service Form
  const [editServiceID, setEditServiceID] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editServicePrice, setEditServicePrice] = useState('');
  const [editServiceDescription, setEditServiceDescription] = useState('');
  const [editServicePersonalized, setEditServicePersonalized] = useState(false);
  const [editServicePackage, setEditServicePackage] = useState(false);
  const [editServicePhotos, setEditServicePhotos] = useState([]);
  const [removeServicePhotos, setRemoveServicePhotos] = useState([] as any);

  const [deleteServiceId, setDeleteServiceId] = useState('');

  let serviceUploader, serviceEditUploader;
  const handleChange = files => {
    files.length > 0 && setServiceButton(false);
    console.log(files);
  };

  const handleUpdateChange = files => {
    files.length > 0 && setUpdateServiceButton(false);
    setServicePhotos(files);
  };

  const handleUpdateServiceSubmit = () => {
    setLoading(true);
    putApi(`service/update-service/${editServiceID}`, {
      name: editServiceName,
      price: editServicePrice,
      description: editServiceDescription,
      personalized: editServicePersonalized,
      package: editServicePackage,
      removedPhotos: removeServicePhotos,
    }).then(value => {
      setUploadEditURL(
        `http://localhost:9100/api/service/update-service-photos/${editServiceID}`,
      );
      setTimeout(() => {
        getApi(`service/get-services/${user._id}`)
          .then(response => response)
          .then(response => {
            console.log(response);
            Alert.success('Successfully Updated!');
            setEditModal(false);
            setServices(response.data);
          })
          .catch(error => {
            console.log(error);
          });

        setLoading(false);
      }, 3000);
    });
  };
  const handleServiceSubmit = () => {
    setLoading(true);
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
      const timer = setTimeout(() => {
        getApi(`service/get-services/${user._id}`)
          .then(response => response)
          .then(response => {
            setServices(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        setLoading(false);
        setAddModal(false);
      }, 2000);
    });
  };

  const handleDeleteService = serviceId => {
    setDeleteModal(true);
    setDeleteServiceId(serviceId);
  };

  const submitDeleteService = () => {
    console.log(deleteServiceId);
    deleteApi(`service/delete-service/${deleteServiceId}`)
      .then(response => response)
      .then(response => {
        const newServiceList = services.filter(
          service => service._id !== deleteServiceId,
        );
        setDeleteModal(false);
        setServices(newServiceList);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFinalSubmit = evt => {
    evt.preventDefault();
    const areaCoverage = {
      regions: selectedRegions,
      provinces: selectedProvinces,
      citiesMunicipalities: selectedCM,
    };
    putApi(`agent/update-coverage/${user._id}`, {
      areaCoverage,
    }).then(response => {
      if (response.status === 'success') {
        updateUser(response.data.data);
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    getApi(`service/get-services/${user._id}`)
      .then(response => response)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user._id]);

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
  }, [
    selectedRegions,
    provinces,
    filterProvinces,
    citiesAndMunicipals,
    selectedProvinces,
    filterCM,
  ]);
  useEffect(() => {
    uploadURL && serviceUploader.start();
  }, [uploadURL, serviceUploader]);

  useEffect(() => {
    uploadEditURL && serviceEditUploader.start();
  }, [uploadEditURL, serviceEditUploader]);

  useEffect(() => {
    if (services.length > 0) {
      setSetupSubmit(false);
    } else {
      setSetupSubmit(true);
    }
  }, [services]);
  return (
    <div>
      <Row className="mt-4">
        <Col md={12}>
          <h1>Setup Account</h1>
          <Form onSubmit={handleFinalSubmit}>
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
                      {services &&
                        services.map(service => {
                          let [primaryPhoto] = service.photos;
                          return (
                            <Col key={service._id} md={2} className="btn">
                              <Icon
                                icon="minus-square"
                                size="2x"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 5,
                                }}
                                className="text-danger"
                                onClick={() => handleDeleteService(service._id)}
                              />
                              <Panel
                                shaded
                                bordered
                                bodyFill
                                style={{ display: 'inline-block', width: 150 }}
                                onClick={() => {
                                  const uploadedPhotos = service.photos;
                                  const photos = uploadedPhotos.map(e => {
                                    return {
                                      name: e.key,
                                      fileKey: e.key,
                                      url: e.location,
                                    };
                                  });
                                  console.log(photos);
                                  setEditServiceID(service._id);
                                  setEditServicePhotos(photos);
                                  setEditServiceName(service.name);
                                  setEditServicePrice(service.price);
                                  setEditServiceDescription(
                                    service.description,
                                  );
                                  setEditServicePackage(service.package);
                                  setEditServicePersonalized(
                                    service.personalized,
                                  );
                                  setEditModal(true);
                                }}
                              >
                                <img
                                  src={primaryPhoto.location}
                                  height="150"
                                  alt={service.name}
                                />
                              </Panel>
                            </Col>
                          );
                        })}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <FormGroup className="float-right mt-3">
              <Button color="success" disabled={setupSubmit}>
                Submit
              </Button>
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

        <AvForm>
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
                      name="price"
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
            {isLoading && <Loader backdrop content="loading..." vertical />}
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button
              onClick={handleServiceSubmit}
              disabled={addServiceButton}
              color="secondary"
            >
              Save
            </Button>{' '}
            |{' '}
            <Button onClick={() => setAddModal(false)} color="danger">
              Cancel
            </Button>
          </Modal.Footer>
        </AvForm>
      </Modal>

      <Modal
        backdrop="static"
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        size={'md'}
      >
        <Modal.Header>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>

        <AvForm>
          <Modal.Body>
            <Row>
              <Col>
                <AvField
                  name="name"
                  label="Service Name"
                  value={editServiceName}
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
                  onChange={e => setEditServiceName(e.target.value)}
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
                      name="price"
                      value={editServicePrice}
                      id="price"
                      type="number"
                      required
                      onChange={e => setEditServicePrice(e.target.value)}
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
                  value={editServiceDescription}
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
                  onChange={e => setEditServiceDescription(e.target.value)}
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
                  checked={editServicePersonalized}
                  checkedChildren={<Icon icon="check" />}
                  unCheckedChildren={<Icon icon="close" />}
                  onChange={(checked: boolean) => {
                    setEditServicePersonalized(checked);
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
                  checked={editServicePackage}
                  checkedChildren={<Icon icon="check" />}
                  unCheckedChildren={<Icon icon="close" />}
                  onChange={(checked: boolean) => {
                    setEditServicePackage(checked);
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
                  defaultFileList={editServicePhotos}
                  autoUpload={false}
                  action={uploadEditURL}
                  headers={{ Authorization: `Bearer ${token}` }}
                  onChange={handleUpdateChange}
                  onError={(reason: Object) => {
                    Alert.error('Upload failed');
                  }}
                  onSuccess={response => {
                    Alert.success('Upload successful.');
                  }}
                  onRemove={file => {
                    let fileKey = file.fileKey;
                    let removed = removeServicePhotos.concat(fileKey);
                    setRemoveServicePhotos(removed);
                  }}
                  ref={ref => {
                    serviceEditUploader = ref;
                  }}
                >
                  <button>
                    <Icon icon="camera-retro" size="lg" />
                  </button>
                </Uploader>
              </Col>
            </Row>
            {isLoading && <Loader backdrop content="loading..." vertical />}
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button onClick={handleUpdateServiceSubmit} color="secondary">
              Save
            </Button>{' '}
            |{' '}
            <Button onClick={() => setEditModal(false)} color="danger">
              Cancel
            </Button>
          </Modal.Footer>
        </AvForm>
      </Modal>
      <Modal
        backdrop="static"
        show={deleteModal}
        onHide={() => {
          setEditModal(false);
          setDeleteServiceId('');
        }}
        size="xs"
      >
        <Modal.Body>Are you sure to delete the service?</Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={submitDeleteService}>
            Ok
          </Button>{' '}
          |{' '}
          <Button onClick={() => setDeleteModal(false)} color="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
