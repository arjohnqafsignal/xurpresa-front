/**
 *
 * AgentLoginForm
 *
 */
import React from 'react';

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
interface Props {}

export function AgentLoginForm(props: Props) {
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="">Email Address</Label>
          <Input
            type="text"
            name="full_name"
            id="fullName"
            placeholder="Enter your Email Address"
          />
        </FormGroup>
        <FormGroup>
          <Label for="">Password</Label>
          <Input
            type="password"
            name="password"
            id=""
            placeholder="Enter Password"
          />
        </FormGroup>
        <FormGroup>
          <Button className="mt-4">Login</Button>
          <FormText>
            Want to become our Agent? &nbsp;
            <a href="/become-agent">Register here</a>
          </FormText>
        </FormGroup>
      </Form>
    </div>
  );
}
