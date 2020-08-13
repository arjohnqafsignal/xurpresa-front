/**
 *
 * AgentAccountSetup
 *
 */
import React, { useEffect, useState } from 'react';
import { TagPicker, Uploader, Alert, Loader, Icon } from 'rsuite';
import { Row, Col, Form, FormGroup, Button, Label, FormText } from 'reactstrap';
import { philData } from 'addresspinas';
import { updateUserAuth } from './../../helpers/localStorage';
import { putApi } from './../../../utils/api';

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
  const handleSubmit = evt => {
    evt.preventDefault();
    const areaCoverage = {
      regions: selectedRegions,
      provinces: selectedProvinces,
      citiesMunicipalities: selectedCM,
    };
    console.log(areaCoverage);
    // const result = putApi(`agent/update-coverage/${user._id}`, {
    //   areaCoverage,
    // });
    // console.log(result);
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
  }, [
    selectedRegions,
    provinces,
    filterProvinces,
    citiesAndMunicipals,
    selectedProvinces,
    filterCM,
  ]);

  return (
    <div>
      <Row className="mt-4">
        <Col md={12}>
          <h1>Setup Agent Account</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <h4>Update Profile Picture</h4>
                <FormGroup>
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
                      console.log(response);
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

            <FormGroup className="float-right">
              <Button color="success">Save &amp; Next</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
