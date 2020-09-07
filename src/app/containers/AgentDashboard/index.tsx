/**
 *
 * AgentDashboard
 *
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectAgentDashboard } from './selectors';
import { agentDashboardSaga } from './saga';
import { AgentAccountSetup } from 'app/components/AgentAccountSetup';
import classnames from 'classnames';
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardTitle,
} from 'reactstrap';
import { Icon, Panel } from 'rsuite';
import { getApi } from 'utils/api';
interface Props {}

export function AgentDashboard(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: agentDashboardSaga });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const agentDashboard = useSelector(selectAgentDashboard);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeTab, setActiveTab] = useState('1');

  const [services, setServices] = useState([] as any);

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
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
  return (
    <>
      <Helmet>
        <title>Agent Dashboard</title>
        <meta name="description" content="Agent Dashboard" />
      </Helmet>
      <div>
        {user.recent ? (
          <AgentAccountSetup />
        ) : (
          <Row>
            <Col md={12}>
              <h1>Agent Dashboard</h1>
              <Row>
                <Col md={12}>
                  <h4>Service Order</h4>
                  <Card>
                    <CardBody>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === '1',
                            })}
                            onClick={() => {
                              toggleTab('1');
                            }}
                          >
                            <Icon icon="clock-o" /> Pending
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === '2',
                            })}
                            onClick={() => {
                              toggleTab('2');
                            }}
                          >
                            <Icon icon="star" /> Active
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === '3',
                            })}
                            onClick={() => {
                              toggleTab('3');
                            }}
                          >
                            <Icon icon="check" /> Success
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === '4',
                            })}
                            onClick={() => {
                              toggleTab('4');
                            }}
                          >
                            <Icon icon="warning" /> Aborted
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  John James Ricamara
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Patrick Perilla
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Rowin Mandia
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Arjohn Quijano
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Badang Two
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <Row>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Perryson Perilla
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="4">
                          <Row>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Mark Duque
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                            <Col sm="3">
                              <Card body className="mt-3">
                                <CardTitle className="text-center">
                                  Joseph One
                                </CardTitle>
                                <Button>View</Button>
                              </Card>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h4 className="mt-4">Services Offered</h4>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md={2}>
                          <Card
                            className="btn border border-light rounded p-3 text-center"
                            onClick={() => {}}
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
                                  onClick={() => {}}
                                />
                                <Panel
                                  shaded
                                  bordered
                                  bodyFill
                                  style={{
                                    display: 'inline-block',
                                    width: 150,
                                  }}
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
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
