import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SubmitButton} from '../../components';
import { getOne as getOrganization, patch as updateOrganization } from '../../actions/organizationActions';
import {useDispatch, useSelector} from 'react-redux';

export default function OrganizationEditPageFunc() {
  const {organizationId} = useParams();
  const [{isSubmitting, form, organization}, setState] = useState({isSubmitting: false, organization: { name: '', isPublic: null}, form: {name: '', isPublic: null}});
  useEffect(() => {
    getOrganization(organizationId);
  }, [organizationId]);
  const org = useSelector(state => state)
  console.log(`Org from selector: ${JSON.stringify(org)}`);
  useEffect(() => {
    async function fetchData(orgId) {
      const organizationResponse = getOrganization(orgId);
      console.log(`Getting orgId=${orgId}, orgResp=${JSON.stringify(organizationResponse)}`);
      setState({isSubmitting, form, organization: organizationResponse });
    }
    fetchData(organizationId).then();
  }, [organizationId]);
  return (
    <>
      <div>My cool component: {organizationId}</div>
      <div>
        <form onSubmit={() => {}}>
          <label className="form__label">Name</label>
          <input onChange={() => {}} className="form__control" name="name" value={name}
            placeholder={name}/>
          <label className="form__label">Public</label>
          <input type="checkbox" onChange={() => {}} className="form__control" name="isPublic"
            value={organization.isPublic}/>
          <SubmitButton className="btn btn-primary signup-button" disabled={() => {}}
            isSubmitting={isSubmitting} value="Edit Organization"/>
        </form>
      </div>
    </>);
}
