import Realm from 'realm';
import { REALM_APP_ID } from '@env';

function getRealmApp() {
  const appId = REALM_APP_ID; // Set Realm app ID here.
  const appConfig = {
    id: appId,
    timeout: 10000,
  };
  return new Realm.App(appConfig);
}
// const app = new Realm.App({ id: REALM_APP_ID });
// Realm.open();
// mongoimport --uri mongodb+srv://medi_admin:liuO5X3Y2Cb2Stkd@cluster0.mnvcs.mongodb.net/mediproduct --collection productsData --type json --file /Users/dani/Downloads/medicalproductsjson.json --jsonArray

// connection
// mongodb://<USERNAME>:<PASSWORD>@realm.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=mediproduct-etnzo:mongodb-atlas:local-userpass

function queryData(client, query) {
  const products = client.db('mediproduct').collection('productsData');
  return products.find(query);
}
function aggregatedDataQuery(client, query) {
  const products = client.db('mediproduct').collection('productsData');
  return products.aggregate(query);
}
// Find documents matching any of these values
// {
//   $or: [
//     { country: { $in: ['foo', 'bar'] } },
//     { active_substance: { $in: ['foo', 'bar'] } },
//   ];
// }
// function something(country) {
//   const client = app.currentUser.mongoClient('mongodb-atlas');

//   const products = client.db('mediproduct').collection('productsData');
//   products.aggregate([
//     { $match: { country: country } },
//     { $sort: { order_number: -1 } },
//     {
//       $facet: {
//         metadata: [{ $count: 'total' }, { $addFields: { page: 3 } }],
//         data: [{ $skip: 20 }, { $limit: 10 }], // add projection here wish you re-shape the docs
//       },
//     },
//   ]);
// }

async function confirmUserSignup(token, tokenId) {
  await getRealmApp().emailPasswordAuth.confirmUser({ token, tokenId });
}

async function signUp(email, password) {
  await getRealmApp().emailPasswordAuth.registerUser({ email, password });
}
async function logIn(email, password) {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await getRealmApp().logIn(credentials);

    console.log('Successfully logged in!', user.id);
    return {
      user: user,
      message: 'Successfully logged in!',
    };
  } catch (err) {
    return err;
  }
}
function anonymousLogin() {
  // const user =
  getRealmApp().logIn(Realm.Credentials.anonymous());
  // const client = getRealmApp().currentUser.mongoClient('mongodb-atlas');

  // return {
  //   client: client,
  //   user: user,
  // };
}

export {
  getRealmApp,
  signUp,
  logIn,
  confirmUserSignup,
  anonymousLogin,
  queryData,
};
