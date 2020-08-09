/**
 *
 * BecomeAgentForm
 *
 */
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './form.css';
interface Props {
  handleSubmit: CallableFunction;
}

export function BecomeAgentForm(props: Props) {
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="">Full Name</Label>
          <Input
            type="text"
            name="full_name"
            id="fullName"
            placeholder="Enter your Full Name"
          />
        </FormGroup>
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
          <Label for="">Mobile Number</Label>
          <Input
            type="text"
            name="full_name"
            id="fullName"
            placeholder="Enter your Mobile Number"
          />
        </FormGroup>
        <FormGroup>
          <Label for="">Company (Optional)</Label>
          <Input
            type="text"
            name="full_name"
            id="fullName"
            placeholder="Enter your Company Name"
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
          <Label for="examplePassword">Confirm Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Password Confirmation"
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> I agree to the terms of service &amp;
            privacy policy.
          </Label>
        </FormGroup>
        <FormGroup>
          <Button className="mt-4">
            Register {/*<Spinner color="warning" /> */}
          </Button>
          <FormText>
            Already an Agent? &nbsp;
            <a href="/agent-login">Login here</a>
          </FormText>
        </FormGroup>
      </Form>
    </div>
  );
}
