/**
 *
 * AgentAccountSetup
 *
 */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Row,
  Col,
  TagPicker,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
} from 'rsuite';
import { philData } from 'addresspinas';
interface Props {}

export function AgentAccountSetup(props: Props) {
  const { regions } = philData.allRegions;
  const { provinces } = philData.allProvinces;
  const { citiesAndMunicipals } = philData.allCitiesAndMunicipal;
  //console.log(citiesAndMunicipals);
  const [selectedRegions, selectRegions] = useState([] as any);
  const [filteredProvinces, filterProvinces] = useState([]);
  const [filteredCM, filterCM] = useState([] as any);

  useEffect(() => {
    var filteredProvinces = provinces.filter(function (province) {
      if (selectedRegions.includes(province.reg_code)) {
        return province;
      } else {
        return null;
      }
    });
    filterProvinces(filteredProvinces);
  }, [selectedRegions, provinces, filterProvinces]);

  return (
    <div>
      <Grid fluid className="mt-4">
        <Row className="show-grid">
          <Col md={12}>
            <h4>Setup Area Coverage</h4>
            <Form>
              <FormGroup>
                <ControlLabel>Select Regions</ControlLabel>
                <TagPicker
                  placeholder="Regions"
                  labelKey="name"
                  valueKey="reg_code"
                  data={regions}
                  block
                  onSelect={selectRegions}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Select Provinces</ControlLabel>
                <TagPicker
                  placeholder="Provinces"
                  labelKey="name"
                  valueKey="prov_code"
                  data={filteredProvinces}
                  block
                />
                <HelpBlock>
                  Select Province if you want to specify your area.
                </HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Select Cities or Municipals</ControlLabel>
                <TagPicker
                  placeholder="Cities or Municipals"
                  labelKey="name"
                  valueKey="prov_code"
                  data={[]}
                  block
                />
                <HelpBlock>
                  Select Province if you want to specify your area.
                </HelpBlock>
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary">Next</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
