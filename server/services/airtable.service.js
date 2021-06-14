import Airtable from 'airtable';
import config from '../config/environment';
console.log(config);
const base = new Airtable({ apiKey: config.airtable.secret }).base(
  config.airtable.app
);

const airtableFields = {
  KIT_ID: 'Kit ID',
  EMAIL: 'Email',
  NAME: 'Name',
  ADDRESS_LINE_1: 'Address Line 1',
  ADDRESS_LINE_2: 'Address Line 2',
  CITY: 'City',
  STATE: 'State',
  POSTAL_CODE: 'Zipcode',
  ORGANIZATION: 'Organization',
  KIT_CODE: 'Kit Code',
};


export async function pushKitToAirtable(kit) {
  kit.user = await kit.getUser();
  kit.shippingAddress = await kit.getShippingAddress();
  return new Promise((resolve, reject) => {
    base('Kits').create([{
      fields: {
        [airtableFields.KIT_ID]: kit.id,
        [airtableFields.NAME]: kit.user.name,
        [airtableFields.EMAIL]: kit.user.email,
        [airtableFields.ADDRESS_LINE_1]: kit.shippingAddress.addressLine1,
        [airtableFields.ADDRESS_LINE_2]: kit.shippingAddress.addressLine2,
        [airtableFields.CITY]: kit.shippingAddress.city,
        [airtableFields.STATE]: kit.shippingAddress.state,
        [airtableFields.POSTAL_CODE]: kit.shippingAddress.zipcode,
        [airtableFields.ORGANIZATION]: kit.shippingAddress.organizationName,
      }
    }], function(err, record) {
      if (err) return reject(err);
      resolve(record);
    });
  });
}
